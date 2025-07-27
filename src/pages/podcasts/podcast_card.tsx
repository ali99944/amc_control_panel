"use client"

import * as React from "react"
import { format } from "date-fns"
import { Edit, Trash2, PlayCircle, Badge } from "lucide-react"

import Button from "../../components/ui/button"
import { Podcast } from "../../types/podcast"
import { DeletePodcastDialog } from "./delete_podcast_dialog"
import { UpdatePodcastDialog } from "./update_podcast_dialog"
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"

interface PodcastCardProps {
  podcast: Podcast
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex-row items-center gap-4 pb-2">
          <img
            src={podcast.imageUrl || "/placeholder.svg?height=64&width=64"}
            alt={podcast.title}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <CardTitle className="text-lg">{podcast.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {podcast.category} • {podcast.language}
            </CardDescription>
          </div>
          <Badge variant={podcast.status === "published" ? "default" : "secondary"}>
            {podcast.status.charAt(0).toUpperCase() + podcast.status.slice(1)}
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 text-sm text-gray-700">
          <p className="line-clamp-3">{podcast.description}</p>
          <div className="mt-2 text-xs text-gray-500">
            Last updated: {format(new Date(podcast.updatedAt), "MMM dd, yyyy")}
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-600">
            <PlayCircle className="mr-1 h-4 w-4" /> {podcast.shows.length} Shows
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={() => setIsUpdateDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </CardFooter>
      </Card>

      <UpdatePodcastDialog podcast={podcast} isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} />
      <DeletePodcastDialog podcast={podcast} isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} />
    </>
  )
}
