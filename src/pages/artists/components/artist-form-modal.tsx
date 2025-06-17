// src/pages/artists/components/artist-form-modal.tsx
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useNotifications } from '../../../components/ui/notification'; // Added useNotifications import
import { useMutationAction } from '../../../hooks/queries-actions';
import Artist from '../../../types/artist';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
// import { FileUploader } from '../../../components/ui/file-uploader';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import FileUploader from '../../../components/ui/file-uploader';
import Modal from '../../../components/ui/modal';

const API_URL = 'artists'; // Replace with your actual API endpoint

// Zod schema for validation
const artistFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  image: z.union([
    z.instanceof(File, { message: 'Image is required' }),
    z.string().url('Enter a valid URL for existing image').optional(), // Optional for existing images
  ]).refine(value => value !== undefined && value !== null && value !== '', { message: 'Image is required' }),
  is_featured: z.boolean(),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

const imageValidationSchema = z.instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
  ).optional();

interface ArtistFormData {
  name: string;
  bio: string;
  image: File | string | null; // Can be File for new/updated image, string for existing URL, or null
  is_featured: boolean;
}

interface ArtistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist?: Artist | null;
  onSuccess: () => void;
}

const ArtistFormModal: React.FC<ArtistFormModalProps> = ({ isOpen, onClose, artist, onSuccess }) => {
  const [formData, setFormData] = useState<ArtistFormData>({
    name: '',
    bio: '',
    image: null, // Initialize image as null
    is_featured: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (isOpen) {
      if (artist) {
        setFormData({
          name: artist.name,
          bio: artist.bio,
          image: artist.image, // This will be a URL string for existing image
          is_featured: artist.is_featured,
        });
      } else {
        setFormData({
          name: '',
          bio: '',
          image: null, // Initialize as null for new artist
          is_featured: false,
        });
      }
      setErrors({}); // Clear errors when modal opens or artist changes
    }
  }, [artist, isOpen]);

  const mutation = useMutationAction<Artist, FormData>({ // Expect FormData as payload
    method: artist && !(formData.image instanceof File) ? 'put' : 'post', // Use POST for new image uploads even on edit
    contentType: 'multipart/form-data', // Set content type for file uploads
    url: artist ? `${API_URL}/${artist.id}${formData.image instanceof File ? '/image' : ''}` : API_URL, // Potentially different endpoint for image update
    key: ['artists'],
    onSuccessCallback: (data) => {
      addNotification({
        title: artist ? 'Artist Updated' : 'Artist Added',
        message: `Artist "${data.name}" has been successfully ${artist ? 'updated' : 'added'}.`,
        type: 'success',
      });
      onSuccess();
      onClose();
    },
    onErrorCallback: (error) => {
      console.error('Error saving artist:', error);
      addNotification({
        title: 'Error',
        message: error.message || 'An unexpected error occurred while saving the artist.',
        type: 'error',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // const handleFileChange = (file: File | null) => {
  //   setFormData((prev) => ({ ...prev, image: file }));
  //   if (errors.image) {
  //     setErrors((prev) => ({ ...prev, image: undefined }));
  //   }
  // };

  // const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
  //   setFormData((prev) => ({ ...prev, is_featured: !!checked }));
  //    if (errors.is_featured) {
  //     setErrors((prev) => ({ ...prev, is_featured: undefined }));
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Separate validation for image if it's a file
    let imageValidationError: string | undefined;
    if (formData.image instanceof File) {
      const imageCheck = imageValidationSchema.safeParse(formData.image);
      if (!imageCheck.success) {
        imageValidationError = imageCheck.error.errors[0]?.message;
      }
    }

    const dataToValidate = {
        ...formData,
        image: formData.image instanceof File ? formData.image : (artist && formData.image === artist.image ? undefined : formData.image || '')
    };

    const validationResult = artistFormSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string | undefined> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      if (imageValidationError && !fieldErrors.image) {
        fieldErrors.image = imageValidationError;
      }
      setErrors(fieldErrors);
      addNotification({
        title: 'Validation Error',
        message: 'Please correct the errors in the form.',
        type: 'warning',
      });
      return;
    } else if (imageValidationError) {
        setErrors({ image: imageValidationError });
        addNotification({
            title: 'Validation Error',
            message: 'Please correct the errors in the form.',
            type: 'warning',
        });
        return;
    }

    const payload = new FormData();
    payload.append('name', validationResult.data.name);
    payload.append('bio', validationResult.data.bio);
    payload.append('is_featured', JSON.stringify(validationResult.data.is_featured));
    payload.append('genres', JSON.stringify([]));

    if (validationResult.data.image instanceof File) {
      payload.append('image', validationResult.data.image);
    } else if (artist && typeof validationResult.data.image === 'string' && validationResult.data.image !== artist.image) {
      // If image is a string and different from original, it implies removal or new URL (though API might not support URL update this way)
      // For this example, we assume if it's a string and not the original, it's meant to be kept as is or handled by backend logic if URL changes are allowed without file upload.
      // If the intention is to clear the image, the backend should handle an empty 'image' field or a specific flag.
      // payload.append('image_url', validationResult.data.image); // Or handle as per backend requirements
    } else if (!artist && typeof validationResult.data.image === 'string') {
        // This case should ideally not happen if image is required and is a string for a new artist
        // Zod schema should catch this. But as a fallback:
        console.warn("Image is a string for a new artist, this might be an issue.");
    }

    mutation.mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={artist ? 'Edit Artist' : 'Add New Artist'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Artist Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Artist Biography"
            rows={4}
            aria-invalid={!!errors.bio}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
          />
          {errors.bio && <p id="bio-error" className="text-red-500 text-sm mt-1">{errors.bio}</p>}
        </div>

        <div>
          <Label htmlFor="image">Artist Image</Label>
          <FileUploader
            // onFileSelect={handleFileChange}
            // initialFileUrl={typeof formData.image === 'string' ? formData.image : null}
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
          {errors.image && <p id="image-error" className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_featured"
            checked={formData.is_featured}
            // onCheckedChange={handleCheckboxChange}
            aria-invalid={!!errors.is_featured}
            aria-describedby={errors.is_featured ? 'is_featured-error' : undefined}
          />
          <Label htmlFor="is_featured" className="font-normal">
            Featured Artist
          </Label>
        </div>
         {errors.is_featured && <p id="is_featured-error" className="text-red-500 text-sm mt-1">{errors.is_featured}</p>}

        {/* Server-side errors can still be shown if needed, though notifications are primary */}
        {/* {serverError && <p className="text-red-500 text-sm">{serverError}</p>} */}

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (artist ? 'Saving...' : 'Adding...') : (artist ? 'Save Changes' : 'Add Artist')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ArtistFormModal;