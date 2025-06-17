import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
// import { FileUploader } from '../../../components/ui/file-uploader';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useNotifications } from '../../../components/ui/notification';
// import { Dropdown } from '../../../components/ui/dropdown'; // Changed Select to Dropdown
import { Textarea } from '../../../components/ui/textarea';
import { useGetQuery, useMutationAction } from '../../../hooks/queries-actions';
import Artist from '../../../types/artist';
import Genre from '../../../types/genre';
import Song from '../../../types/song';
import FileUploader from '../../../components/ui/file-uploader';
import Dropdown from '../../../components/ui/dropdown';
import Modal from '../../../components/ui/modal';


// const API_URL = import.meta.env.VITE_API_URL;

const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist_id: z.preprocess((val) => Number(val), z.number().min(1, 'Artist is required')),
  genre_id: z.preprocess((val) => Number(val), z.number().min(1, 'Genre is required')),
  release_date: z.string().min(1, 'Release date is required'), // Assuming YYYY-MM-DD format
  lyrics: z.string().optional(),
  cover_image: z.union([
    z.instanceof(File, { message: 'Invalid image file' })
      .refine((file) => file.size <= 5 * 1024 * 1024, `Max image size is 5MB.`)
      .refine(
        (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
    z.string().url({ message: 'Invalid image URL' }),
  ]).optional(),
  audio_file: z.union([
    z.instanceof(File, { message: 'Invalid audio file' })
      .refine((file) => file.size <= 20 * 1024 * 1024, `Max audio file size is 20MB.`)
      .refine(
        (file) => ['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(file.type),
        'Only .mp3, .wav, and .ogg formats are supported.'
      ),
    z.string().url({ message: 'Invalid audio URL' }), // For existing audio
  ]),
});

type SongFormData = z.infer<typeof songSchema>;

interface SongFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  song?: Song | null;
  onSuccess: () => void;
}

export function SongFormModal({ isOpen, onClose, song, onSuccess }: SongFormModalProps) {
  const [formData, setFormData] = useState<Partial<SongFormData>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { addNotification } = useNotifications();

  const { data: artists, isLoading: isLoadingArtists } = useGetQuery<Artist[]>({ key: ['artists'], url: `artists` });
  const { data: genres, isLoading: isLoadingGenres } = useGetQuery<Genre[]>({ key: ['genres'], url: `genres` });

  const mutation = useMutationAction<Song, FormData>({
    method: song ? 'put' : 'post',
    url: song ? `songs/${song.id}` : `songs`,
    key: ['songs'],
    contentType: 'multipart/form-data',
    onSuccessCallback: () => {
      addNotification({
        type: 'success',
        title: `Song ${song ? 'updated' : 'created'} successfully`,
        message: song? 'Song updated successfully' : 'Song created successfully',
      });
      onSuccess();
      onClose();
    },
    onErrorCallback: (error) => {
      addNotification({
        type: 'error',
        title: `Error ${song ? 'updating' : 'creating'} song: ${error.message}`,
        message: song? 'Error updating song' : 'Error creating song',
      });
      // if (error.response?.data?.errors) {
      //   setErrors(error.response.data.errors);
      // }
    },
  });

  useEffect(() => {
    if (song) {
      setFormData({
        // title: song.title,
        // artist_id: song.artist.id,
        // genre_id: song.genre.id,
        // release_date: song.release_date ? new Date(song.release_date).toISOString().split('T')[0] : '',
        // lyrics: song.lyrics || '',
        // cover_image: song.cover_image || undefined,
        // audio_file: song.audio_src || undefined, // Assuming audio_src is the URL for existing audio
      });
    } else {
      setFormData({});
    }
    setErrors({});
  }, [song, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleDropdownChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  // const handleFileChange = useCallback((name: string, file: File | null) => {
  //   setFormData((prev) => ({ ...prev, [name]: file || undefined }));
  //   if (errors[name]) {
  //     setErrors((prev) => ({ ...prev, [name]: [] }));
  //   }
  // }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationResult = songSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      validationResult.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = [err.message];
      });
      setErrors(fieldErrors);
      return;
    }

    const submissionData = new FormData();
    Object.entries(validationResult.data).forEach(([key, value]) => {
      if (value instanceof File) {
        submissionData.append(key, value);
      } else if (value !== undefined && value !== null) {
        submissionData.append(key, String(value));
      }
    });

    // If it's an update and the image/audio hasn't changed (still a URL string), don't append it as a file.
    // The backend should handle not updating the image/audio if the field is not present in FormData.
    if (song && typeof formData.cover_image === 'string') {
        // submissionData.delete('cover_image'); // Or handle on backend
    }
    if (song && typeof formData.audio_file === 'string') {
        // submissionData.delete('audio_file'); // Or handle on backend
    }

    mutation.mutate(submissionData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={song ? 'Edit Song' : 'Add New Song'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 p-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="artist_id">Artist</Label>
                <Dropdown
                    trigger={
                        <Button type="button" variant="primary" className="w-full justify-between" disabled={isLoadingArtists}>
                            {formData.artist_id ? artists?.find(a => a.id === formData.artist_id)?.name : (isLoadingArtists ? 'Loading...' : 'Select Artist')}
                            <span className="ml-2">▼</span>
                        </Button>
                    }
                    items={artists?.map(artist => ({ label: artist.name, value: artist.id.toString(), onClick: () => handleDropdownChange('artist_id', artist.id) })) || []}
                    align="left"
                />
                {errors.artist_id && <p className="text-red-500 text-sm mt-1">{errors.artist_id[0]}</p>}
            </div>
            <div>
                <Label htmlFor="genre_id">Genre</Label>
                <Dropdown
                    
                    trigger={
                        <Button type="button" variant="primary" className="w-full justify-between" disabled={isLoadingGenres}>
                            {formData.genre_id ? genres?.find(g => g.id === formData.genre_id)?.name : (isLoadingGenres ? 'Loading...' : 'Select Genre')}
                            <span className="ml-2">▼</span>
                        </Button>
                    }
                    items={genres?.map(genre => ({ label: genre.name, value: genre.id.toString(), onClick: () => handleDropdownChange('genre_id', genre.id) })) || []}
                    align="left"
                />
                {errors.genre_id && <p className="text-red-500 text-sm mt-1">{errors.genre_id[0]}</p>}
            </div>
        </div>

        <div>
          <Label htmlFor="release_date">Release Date</Label>
          <Input id="release_date" name="release_date" type="date" value={formData.release_date || ''} onChange={handleChange} />
          {errors.release_date && <p className="text-red-500 text-sm mt-1">{errors.release_date[0]}</p>}
        </div>

        <div>
          <Label htmlFor="lyrics">Lyrics</Label>
          <Textarea id="lyrics" name="lyrics" value={formData.lyrics || ''} onChange={handleChange} rows={4} />
          {errors.lyrics && <p className="text-red-500 text-sm mt-1">{errors.lyrics[0]}</p>}
        </div>

        <div>
          <Label htmlFor="cover_image">Cover Image (Max 5MB, JPG/PNG/WEBP)</Label>
          <FileUploader 
            // id="cover_image" 
            // onFileSelect={(file: File) => handleFileChange('cover_image', file)} 
            accept="image/jpeg,image/png,image/webp" 
            // currentFilePreview={typeof formData.cover_image === 'string' ? formData.cover_image : undefined}
          />
          {errors.cover_image && <p className="text-red-500 text-sm mt-1">{errors.cover_image[0]}</p>}
        </div>

        <div>
          <Label htmlFor="audio_file">Audio File (Max 20MB, MP3/WAV/OGG)</Label>
          <FileUploader 
            // id="audio_file" 
            // onFileSelect={(file: File) => handleFileChange('audio_file', file)} 
            accept="audio/mpeg,audio/wav,audio/ogg" 
            // fileType="audio"
            // currentFilePreview={typeof formData.audio_file === 'string' ? formData.audio_file : undefined}
          />
          {errors.audio_file && <p className="text-red-500 text-sm mt-1">{errors.audio_file[0]}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending || isLoadingArtists || isLoadingGenres}>
            {mutation.isPending ? 'Saving...' : (song ? 'Save Changes' : 'Add Song')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}