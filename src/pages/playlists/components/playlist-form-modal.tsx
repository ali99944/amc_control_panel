import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
// import { FileUploader } from '../../../components/ui/file-uploader';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { useGetQuery } from '../../../hooks/queries-actions';
import { Playlist, PlaylistFormData } from '../../../types/playlist';
import Song from '../../../types/song';
import FileUploader from '../../../components/ui/file-uploader';
import Modal from '../../../components/ui/modal';
// import { DndProvider, useDrag, useDrop } from 'react-dnd'; // Placeholder for dnd
// import { HTML5Backend } from 'react-dnd-html5-backend'; // Placeholder for dnd

// const playlistFormSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().optional(),
//   cover_image: z.any().optional(), // Handle File or string URL
//   is_public: z.boolean().default(false),
//   songs_to_add: z.array(z.object({ id: z.number(), position: z.number() })).optional(),
//   songs_to_remove: z.array(z.number()).optional(),
// });

interface PlaylistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist?: Playlist | null;
  onSuccess?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaylistFormModal: React.FC<PlaylistFormModalProps> = ({ isOpen, onClose, playlist, onSuccess }) => {
  console.log(onSuccess);
  
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [availableSongs, setAvailableSongs] = useState<Song[]>([]);

  const { data: songsData, isLoading: isLoadingSongs } = useGetQuery<Song[]>({
    url: 'songs', 
    key: ['/songs']
  });

  useEffect(() => {
    if (songsData) {
      setAvailableSongs(songsData);
    }
  }, [songsData]);

  const form = useForm<PlaylistFormData>({
    // resolver: zodResolver(playlistFormSchema),
    defaultValues: {
      title: '',
      description: '',
      cover_image: null,
      is_public: false,
      songs_to_add: [],
      songs_to_remove: [],
    },
  });

  useEffect(() => {
    if (playlist) {
      form.reset({
        title: playlist.title,
        description: playlist.description || '',
        cover_image: playlist.cover_image,
        is_public: playlist.is_public,
        // Populate selectedSongs based on playlist.songs for editing
      });
      // Assuming playlist.songs contains the songs in the playlist
      // This needs to be adjusted based on how playlist songs are structured and fetched
      setSelectedSongs(playlist.songs?.map(ps => ps.song) || []);
    } else {
      form.reset({
        title: '',
        description: '',
        cover_image: null,
        is_public: false,
        songs_to_add: [],
        songs_to_remove: [],
      });
      setSelectedSongs([]);
    }
  }, [playlist, form, songsData]);

  // const { mutate, isPending } = useMutationAction<Playlist, PlaylistFormData>(
  //   {
  //       url: playlist ? `/playlists/${playlist.id}` : '/playlists',
  //       method: playlist ? 'put' : 'post',
  //       onSuccessCallback: () => {
  //           onSuccess?.();
  //           onClose();
  //       },
  //   }
  // );

  // const onSubmit = (data: PlaylistFormData) => {
  //   const formData = new FormData();
  //   formData.append('title', data.title);
  //   if (data.description) formData.append('description', data.description);
  //   formData.append('is_public', String(data.is_public));

  //   if (data.cover_image && data.cover_image instanceof File) {
  //     formData.append('cover_image', data.cover_image);
  //   }

  //   // Logic to determine songs_to_add and songs_to_remove based on selectedSongs vs initial playlist songs
  //   // This is a simplified version and needs refinement for actual drag-and-drop and song management
  //   const initialSongIds = playlist?.songs?.map(s => s.song_id) || [];
  //   const currentSelectedSongIds = selectedSongs.map(s => s.id);

  //   const songsToAdd = selectedSongs
  //     .filter(s => !initialSongIds.includes(s.id))
  //     .map((s, index) => ({ id: s.id, position: index })); // Position needs to be accurate from dnd

  //   const songsToRemove = playlist?.songs
  //     .filter(ps => !currentSelectedSongIds.includes(ps.song_id))
  //     .map(ps => ps.id) || []; // Assuming ps.id is the playlist_song_id
      
  //   if (songsToAdd.length > 0) {
  //       formData.append('songs_to_add', JSON.stringify(songsToAdd));
  //   }
  //   if (songsToRemove.length > 0) {
  //       formData.append('songs_to_remove', JSON.stringify(songsToRemove));
  //   }

  //   mutate(formData as any); // FormData is not directly PlaylistFormData, cast for now
  // };

  // Placeholder for drag and drop song item
  // const DraggableSongItem = ({ song, index, moveSong }) => { ... };

  // Placeholder for song selection logic
  const handleToggleSong = (song: Song) => {
    setSelectedSongs(prev => 
      prev.find(s => s.id === song.id) 
        ? prev.filter(s => s.id !== song.id) 
        : [...prev, song]
    );
  };

  if (!isOpen) return null;

  return (
    <Modal title={playlist ? 'Edit Playlist' : 'Create Playlist'} isOpen={isOpen} onClose={onClose}>
      <form
        className="space-y-4"
        // onSubmit={form.handleSubmit(onSubmit)}
      >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register('title')} />
            {form.formState.errors.title && <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register('description')} />
          </div>
          <div>
            <Label htmlFor="cover_image">Cover Image</Label>
            <FileUploader
              // id="cover_image"
              // onFileUpload={(file: File) => form.setValue('cover_image', file, { shouldValidate: true })}
              accept="image/*"
              // currentFilePreview={typeof form.watch('cover_image') === 'string' ? form.watch('cover_image') as string : undefined}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="is_public" 
              {...form.register('is_public')} checked={form.watch('is_public')} 
              // onCheckedChange={(checked) => form.setValue('is_public', !!checked)} 
            />
            <Label htmlFor="is_public">Public Playlist</Label>
          </div>

          {/* Song Management Section - Placeholder for Drag and Drop */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Manage Songs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-md font-semibold">Available Songs</h4>
                {isLoadingSongs && <p>Loading songs...</p>}
                <div className="max-h-60 overflow-y-auto border p-2 rounded-md">
                  {availableSongs.filter(as => !selectedSongs.find(ss => ss.id === as.id)).map(song => (
                    <div key={song.id} className="p-2 border-b cursor-pointer hover:bg-gray-100" onClick={() => handleToggleSong(song)}>
                      {song.title} - {song.artist?.name || 'Unknown Artist'}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-md font-semibold">Selected Songs (Drag to reorder)</h4>
                {/* <DndProvider backend={HTML5Backend}> */}
                <div className="max-h-60 overflow-y-auto border p-2 rounded-md">
                  {selectedSongs.map((song) => (
                    // <DraggableSongItem key={song.id} song={song} index={index} moveSong={/* move song function */} />
                    <div key={song.id} className="p-2 border-b flex justify-between items-center">
                        <span>{song.title} - {song.artist?.name || 'Unknown Artist'}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleToggleSong(song)}>Remove</Button>
                    </div>
                  ))}
                  {selectedSongs.length === 0 && <p className="text-sm text-gray-500">No songs selected.</p>}
                </div>
                {/* </DndProvider> */}
              </div>
            </div>
          </div>

          <div className='flex items-center justify-end gap-2'>
              <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={isLoadingSongs}>
              {isLoadingSongs ? 'Saving...' : 'Save Playlist'}
            </Button>
          </div>
        </form>
    </Modal>
  );
};

export default PlaylistFormModal;