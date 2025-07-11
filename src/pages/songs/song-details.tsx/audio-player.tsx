"use client"
import { useRef, useEffect } from "react"
import { Play, Pause } from 'lucide-react'
import Button from "../../../components/ui/button"

interface AudioPlayerProps {
  src: string
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlay: () => void
  onSeek: (time: number) => void
}

export default function AudioPlayer({ src, isPlaying, currentTime, duration, onPlay, onSeek }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    onSeek(time)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onSeek(audioRef.current.currentTime)
    }
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onPlay()}
        preload="metadata"
      />
      <div className="flex items-center gap-4">
        <Button size="sm" variant="secondary" onClick={onPlay}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #2d6a4f 0%, #2d6a4f ${
                duration ? (currentTime / duration) * 100 : 0
              }%, #e5e7eb ${duration ? (currentTime / duration) * 100 : 0}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
