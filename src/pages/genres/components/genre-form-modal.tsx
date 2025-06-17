// src/pages/genres/components/genre-form-modal.tsx
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useNotifications } from '../../../components/ui/notification';
import { useMutationAction } from '../../../hooks/queries-actions';
import Genre from '../../../types/genre';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import FileUploader from '../../../components/ui/file-uploader';
import Modal from '../../../components/ui/modal';

const API_URL = 'genres'; // Replace with your actual API endpoint for genres

// Zod schema for validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

const imageValidationSchema = z.instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
  ).optional();

const genreFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.union([
    z.instanceof(File, { message: 'Image is required' }),
    z.string().url('Enter a valid URL for existing image').optional(),
  ]).refine(value => value !== undefined && value !== null && value !== '', { message: 'Image is required' }),
});

interface GenreFormData {
  name: string;
  image: File | string | null; // Can be File for new/updated image, string for existing URL, or null
}

interface GenreFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  genre?: Genre | null;
  onSuccess: () => void;
}

const GenreFormModal: React.FC<GenreFormModalProps> = ({ isOpen, onClose, genre, onSuccess }) => {
  const [formData, setFormData] = useState<GenreFormData>({
    name: '',
    image: null,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (isOpen) {
      if (genre) {
        setFormData({
          name: genre.name,
          image: genre.image, // This will be a URL string for existing image
        });
      } else {
        setFormData({
          name: '',
          image: null, // Initialize as null for new genre
        });
      }
      setErrors({}); // Clear errors when modal opens or genre changes
    }
  }, [genre, isOpen]);

  const mutation = useMutationAction<Genre, FormData>({
    method: genre && !(formData.image instanceof File) ? 'put' : 'post',
    contentType: 'multipart/form-data',
    url: genre ? `${API_URL}/${genre.id}${formData.image instanceof File ? '' : ''}` : API_URL, // Backend might need a specific endpoint or logic for image updates vs data updates
    key: ['genres'],
    onSuccessCallback: (data) => {
      addNotification({
        title: genre ? 'Genre Updated' : 'Genre Added',
        message: `Genre "${data.name}" has been successfully ${genre ? 'updated' : 'added'}.`,
        type: 'success',
      });
      onSuccess();
      onClose();
    },
    onErrorCallback: (error) => {
      console.error('Error saving genre:', error);
      addNotification({
        title: 'Error',
        message: error.message || 'An unexpected error occurred while saving the genre.',
        type: 'error',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    let imageValidationError: string | undefined;
    if (formData.image instanceof File) {
      const imageCheck = imageValidationSchema.safeParse(formData.image);
      if (!imageCheck.success) {
        imageValidationError = imageCheck.error.errors[0]?.message;
      }
    }

    const dataToValidate = {
        ...formData,
        image: formData.image instanceof File ? formData.image : (genre && formData.image === genre.image ? undefined : formData.image || '')
    };

    const validationResult = genreFormSchema.safeParse(dataToValidate);

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

    if (validationResult.data.image instanceof File) {
      payload.append('image', validationResult.data.image);
    } else if (genre && typeof validationResult.data.image === 'string' && validationResult.data.image !== genre.image) {
      // If image is a string and different from original, it implies removal or new URL.
      // The backend should handle how to update if only a URL is sent or if the image field is absent.
      // For this example, if it's a string and not the original, we don't append it, assuming backend handles no image change or URL update separately.
    } else if (!genre && typeof validationResult.data.image === 'string') {
        console.warn("Image is a string for a new genre, this might be an issue if a file is expected.");
    }

    mutation.mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={genre ? 'Edit Genre' : 'Add New Genre'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Genre Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="image">Genre Image</Label>
          <FileUploader
            // onFileSelect={handleFileChange}
            // initialFileUrl={typeof formData.image === 'string' ? formData.image : null}
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
          {errors.image && <p id="image-error" className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (genre ? 'Updating...' : 'Adding...') : (genre ? 'Update Genre' : 'Add Genre')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GenreFormModal;