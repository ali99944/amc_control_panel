import { Plus, RefreshCcw } from "lucide-react"
import Button from "../../../components/ui/button"
import Card from "../../../components/ui/card"
import { useAddSongTag, useSongTags, useTags } from "../../../hooks/use-tags"
import { useState } from "react"
import Dialog from "../../../components/ui/dialog"
import { Spinner } from "../../../components/ui/spinner"
import { Text, Title } from "../../../components/ui/typography"
import { Tag } from "../../../types/tag"


interface SongTagsProps {
    song_id: number
}

function SongTags({ song_id }: SongTagsProps) {
    const { data: song_tags } = useSongTags(song_id)
    
    const { data: tags, isFetching: is_tags_loading, refetch: refetch_tags } = useTags()
    const { mutateAsync: addTagAction } = useAddSongTag(song_id)
    const [isAddTagModalOpen,setIsAddTagModalOpen] = useState(false)

    const handleAddTagClick = () => setIsAddTagModalOpen(true)
    const closeDialog = () => setIsAddTagModalOpen(false)

    const addSongTag = async (tag: Tag) => {
        await addTagAction({
            tag_id: tag.id
        })
    }

  return (
    <>
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">كلمات وصفية للاغنية</h3>
                <Button size="sm" variant="secondary" onClick={handleAddTagClick}>
                    <Plus className="w-4 h-4" />
                    اضافة وصف
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {
                    song_tags?.map(tag => {
                        return (
                            <div className="px-2 py-1 rounded text-white bg-primary">
                                {tag.name}
                            </div>
                        )
                    })
                }

                {
                    song_tags?.length == 0 && (
                        <div className="flex justify-center items-center w-full">
                            <p>No tags associated with this song yet</p>
                        </div>
                    )
                }
                
            </div>
        </Card>

        <Dialog
            isOpen={isAddTagModalOpen}
            onClose={closeDialog}
        >
            <div className="flex justify-between items-center">
                <Title className="mb-4">اضافة وصف جديد</Title>
                <RefreshCcw className="w-4 h-4 cursor-pointer" onClick={() => refetch_tags()} />
            </div>
            {
                is_tags_loading && (
                    <div className="flex items-center justify-center">
                        <Spinner />
                    </div>
                )
            }

            {
                tags?.length == 0 && (
                    <Text>لا يوجد معرفات متاحة حاليا</Text>
                )
            }
            
            <div className="grid grid-cols-2 gap-2">
                {
                    tags?.map(tag => {
                        return (
                            <div
                                onClick={() => addSongTag(tag)} 
                                className="p-2 flex justify-center items-center rounded bg-gray-200 text-black cursor-pointer hover:bg-gray-300 transition-all duration-200"
                            >
                                {tag.name}
                            </div>
                        )
                    })
                }
            </div>
        </Dialog>
    </>
  )
}

export default SongTags