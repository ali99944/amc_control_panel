"use client"

import React, { useState, useRef, useEffect } from "react"
import { Upload, X, Music, Play, Pause, Clock, Save, Plus, Trash2, Edit, FileText } from "lucide-react"
import Button from "./button"
import { Input } from "./input"
import Textarea from "./textarea"

interface LyricLine {
  id: string
  text: string
  time: number // in seconds
  timeFormatted: string // in MM:SS.ms format
}

interface LyricsEditorProps {
  initialLyrics?: string
  audioFile?: File | null
  audioUrl?: string
  onChange?: (lyrics: string) => void
  onLrcChange?: (lrcContent: string) => void
  className?: string
  disabled?: boolean
  placeholder?: string
  label?: string
  error?: string
}

export default function LyricsEditor({
  initialLyrics = "",
  audioFile = null,
  audioUrl = "",
  onChange,
  onLrcChange,
  className = "",
  disabled = false,
  placeholder = "أدخل كلمات الأغنية هنا...",
  label = "كلمات الأغنية",
  error,
}: LyricsEditorProps) {
  // State for the editor mode (text or timeline)
  const [editorMode, setEditorMode] = useState<"text" | "timeline">("text")
  
  // State for the raw text lyrics
  const [rawLyrics, setRawLyrics] = useState(initialLyrics)
  
  // State for the timeline lyrics
  const [lyricLines, setLyricLines] = useState<LyricLine[]>([])
  
  // State for the current line being edited
  const [currentEditLine, setCurrentEditLine] = useState<string | null>(null)
  
  // State for the new line text input
  const [newLineText, setNewLineText] = useState("")
  
  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1)
  
  // State for LRC file
  const [lrcFile, setLrcFile] = useState<File | null>(null)
  
  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    
    const audio = audioRef.current
    
    // Set up audio source
    if (audioUrl) {
      audio.src = audioUrl
    } else if (audioFile) {
      audio.src = URL.createObjectURL(audioFile)
    }
    
    // Set up event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleMetadataLoaded)
    audio.addEventListener("ended", handleAudioEnded)
    
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleMetadataLoaded)
      audio.removeEventListener("ended", handleAudioEnded)
      
      if (audioFile) {
        URL.revokeObjectURL(audio.src)
      }
      
      audio.pause()
      audio.src = ""
    }
  }, [audioFile, audioUrl])
  
  // Handle audio metadata loaded
  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }
  
  // Handle audio time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      
      // Find the active lyric line
      const activeIndex = findActiveLyricIndex(audioRef.current.currentTime)
      if (activeIndex !== activeLyricIndex) {
        setActiveLyricIndex(activeIndex)
      }
    }
  }
  
  // Find the active lyric line based on current time
  const findActiveLyricIndex = (time: number): number => {
    if (lyricLines.length === 0) return -1
    
    // Find the last lyric line with a time less than or equal to the current time
    for (let i = lyricLines.length - 1; i >= 0; i--) {
      if (lyricLines[i].time <= time) {
        return i
      }
    }
    
    return -1
  }
  
  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false)
    setActiveLyricIndex(-1)
  }
  
  // Toggle audio playback
  const togglePlayback = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    
    setIsPlaying(!isPlaying)
  }
  
  // Format time in seconds to MM:SS.ms format
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const milliseconds = Math.floor((timeInSeconds % 1) * 100)
    
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }
  
  // Parse time in MM:SS.ms format to seconds
  const parseTime = (timeFormatted: string): number => {
    const [minutesSeconds, milliseconds] = timeFormatted.split(".")
    const [minutes, seconds] = minutesSeconds.split(":")
    
    return (
      parseInt(minutes) * 60 + 
      parseInt(seconds) + 
      (milliseconds ? parseInt(milliseconds) / 100 : 0)
    )
  }
  
  // Add a new lyric line
  const addLyricLine = () => {
    if (!newLineText.trim()) return
    
    const newLine: LyricLine = {
      id: Date.now().toString(),
      text: newLineText.trim(),
      time: currentTime,
      timeFormatted: formatTime(currentTime),
    }
    
    // Add the new line and sort by time
    const updatedLines = [...lyricLines, newLine].sort((a, b) => a.time - b.time)
    setLyricLines(updatedLines)
    setNewLineText("")
    
    // Generate LRC content and update
    const lrcContent = generateLrcContent(updatedLines)
    onLrcChange?.(lrcContent)
  }
  
  // Update a lyric line
  const updateLyricLine = (id: string, text: string, timeFormatted: string) => {
    const time = parseTime(timeFormatted)
    
    const updatedLines = lyricLines.map((line) => {
      if (line.id === id) {
        return { ...line, text, time, timeFormatted }
      }
      return line
    }).sort((a, b) => a.time - b.time)
    
    setLyricLines(updatedLines)
    setCurrentEditLine(null)
    
    // Generate LRC content and update
    const lrcContent = generateLrcContent(updatedLines)
    onLrcChange?.(lrcContent)
  }
  
  // Delete a lyric line
  const deleteLyricLine = (id: string) => {
    const updatedLines = lyricLines.filter((line) => line.id !== id)
    setLyricLines(updatedLines)
    
    // Generate LRC content and update
    const lrcContent = generateLrcContent(updatedLines)
    onLrcChange?.(lrcContent)
  }
  
  // Set the current time to a specific lyric line's time
  const seekToLyricTime = (time: number) => {
    if (!audioRef.current) return
    
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }
  
  // Handle raw lyrics change
  const handleRawLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setRawLyrics(value)
    onChange?.(value)
  }
  
  // Parse LRC file content
  const parseLrcContent = (content: string) => {
    const lines = content.split("\n")
    const parsedLines: LyricLine[] = []
    
    // Regular expression to match LRC time tags [mm:ss.xx]
    const timeTagRegex = /\[(\d{2}):(\d{2})\.(\d{2})\]/g
    
    lines.forEach((line) => {
      // Skip empty lines and metadata lines
      if (!line.trim() || line.startsWith("[") && !timeTagRegex.test(line)) {
        return
      }
      
      let match
      let lastIndex = 0
      timeTagRegex.lastIndex = 0 // Reset regex state
      
      while ((match = timeTagRegex.exec(line)) !== null) {
        const minutes = parseInt(match[1])
        const seconds = parseInt(match[2])
        const hundredths = parseInt(match[3])
        const time = minutes * 60 + seconds + hundredths / 100
        lastIndex = match.index + match[0].length
        
        // Extract the text after the time tag
        const text = line.substring(lastIndex).trim()
        
        if (text) {
          parsedLines.push({
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            text,
            time,
            timeFormatted: formatTime(time),
          })
        }
      }
    })
    
    // Sort by time
    return parsedLines.sort((a, b) => a.time - b.time)
  }
  
  // Generate LRC content from lyric lines
  const generateLrcContent = (lines: LyricLine[]): string => {
    // Add metadata
    let lrcContent = "[ti:Untitled]\n[ar:Unknown Artist]\n[al:Unknown Album]\n[by:Generated by AMC Sudan]\n\n"
    
    // Add lyric lines
    lines.forEach((line) => {
      const minutes = Math.floor(line.time / 60).toString().padStart(2, "0")
      const seconds = Math.floor(line.time % 60).toString().padStart(2, "0")
      const hundredths = Math.floor((line.time % 1) * 100).toString().padStart(2, "0")
      
      lrcContent += `[${minutes}:${seconds}.${hundredths}]${line.text}\n`
    })
    
    return lrcContent
  }
  
  // Handle LRC file upload
  const handleLrcFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const file = files[0]
    if (file.type !== "text/plain" && !file.name.endsWith(".lrc")) {
      alert("الرجاء تحميل ملف LRC صالح")
      return
    }
    
    setLrcFile(file)
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const parsedLines = parseLrcContent(content)
      
      setLyricLines(parsedLines)
      setEditorMode("timeline")
      
      // Generate raw lyrics from parsed lines
      const rawText = parsedLines.map((line) => line.text).join("\n")
      setRawLyrics(rawText)
      onChange?.(rawText)
      onLrcChange?.(content)
    }
    
    reader.readAsText(file)
  }
  
  // Convert raw lyrics to timeline format
  const convertToTimeline = () => {
    if (!rawLyrics.trim()) {
      alert("الرجاء إدخال كلمات الأغنية أولاً")
      return
    }
    
    const lines = rawLyrics.split("\n")
    const initialLyricLines: LyricLine[] = lines
      .filter((line) => line.trim())
      .map((line, index) => ({
        id: Date.now().toString() + index,
        text: line.trim(),
        time: 0, // Default time will be set when syncing
        timeFormatted: "00:00.00",
      }))
    
    setLyricLines(initialLyricLines)
    setEditorMode("timeline")
  }
  
  // Convert timeline to raw lyrics
  const convertToText = () => {
    const text = lyricLines.map((line) => line.text).join("\n")
    setRawLyrics(text)
    onChange?.(text)
    setEditorMode("text")
  }
  
  // Export as LRC file
  const exportLrc = () => {
    const lrcContent = generateLrcContent(lyricLines)
    const blob = new Blob([lrcContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement("a")
    a.href = url
    a.download = "lyrics.lrc"
    a.click()
    
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with label and mode toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">{label}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={editorMode === "text" ? "primary" : "secondary"}
            onClick={() => setEditorMode("text")}
            disabled={disabled}
          >
            نص عادي
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editorMode === "timeline" ? "primary" : "secondary"}
            onClick={() => editorMode === "text" ? convertToTimeline() : convertToText()}
            disabled={disabled}
          >
            {editorMode === "text" ? "تحويل إلى جدول زمني" : "تحويل إلى نص"}
          </Button>
        </div>
      </div>
      
      {/* LRC File Upload */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          تحميل ملف LRC
        </Button>
        
        {lyricLines.length > 0 && editorMode === "timeline" && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={exportLrc}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            تصدير كملف LRC
          </Button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".lrc,text/plain"
          onChange={handleLrcFileUpload}
          className="hidden"
          disabled={disabled}
        />
        
        {lrcFile && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Music className="w-4 h-4" />
            {lrcFile.name}
            <button
              type="button"
              onClick={() => setLrcFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* Text Editor Mode */}
      {editorMode === "text" && (
        <Textarea
          value={rawLyrics}
          onChange={handleRawLyricsChange}
          placeholder={placeholder}
          rows={10}
          disabled={disabled}
          error={error}
          className="font-mono text-right"
          dir="rtl"
        />
      )}
      
      {/* Timeline Editor Mode */}
      {editorMode === "timeline" && (
        <div className="space-y-4 border border-gray-300 rounded-lg p-4">
          {/* Audio Player Controls */}
          {(audioUrl || audioFile) && (
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <button
                type="button"
                onClick={togglePlayback}
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              
              <div className="flex-1">
                <div className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                  onClick={(e) => {
                    if (!audioRef.current) return
                    
                    const rect = e.currentTarget.getBoundingClientRect()
                    const offsetX = e.clientX - rect.left
                    const percentage = offsetX / rect.width
                    const newTime = percentage * duration
                    
                    audioRef.current.currentTime = newTime
                    setCurrentTime(newTime)
                  }}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-600 font-mono min-w-[80px] text-center">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          )}
          
          {/* Add New Lyric Line */}
          <div className="flex items-center gap-2">
            <Input
              value={newLineText}
              onChange={(e) => setNewLineText(e.target.value)}
              placeholder="أدخل سطر كلمات جديد..."
              disabled={disabled}
              className="flex-1"
            />
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={addLyricLine}
              disabled={disabled || !newLineText.trim()}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              إضافة في {formatTime(currentTime)}
            </Button>
          </div>
          
          {/* Lyric Lines List */}
          {lyricLines.length > 0 ? (
            <div className="space-y-2 max-h-[400px] overflow-y-auto p-2">
              {lyricLines.map((line, index) => (
                <div
                  key={line.id}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${index === activeLyricIndex ? "bg-primary/10 border border-primary/30" : "bg-gray-50 hover:bg-gray-100"}`}
                >
                  {currentEditLine === line.id ? (
                    // Edit mode
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={line.timeFormatted}
                        onChange={(e) => {
                          const updatedLines = [...lyricLines]
                          updatedLines[index].timeFormatted = e.target.value
                          setLyricLines(updatedLines)
                        }}
                        className="w-24 font-mono text-center"
                      />
                      <Input
                        value={line.text}
                        onChange={(e) => {
                          const updatedLines = [...lyricLines]
                          updatedLines[index].text = e.target.value
                          setLyricLines(updatedLines)
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => updateLyricLine(line.id, line.text, line.timeFormatted)}
                      >
                        حفظ
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentEditLine(null)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <button
                        type="button"
                        onClick={() => seekToLyricTime(line.time)}
                        className="w-20 text-sm font-mono text-gray-600 hover:text-primary"
                      >
                        {line.timeFormatted}
                      </button>
                      <div className="flex-1 text-gray-900">{line.text}</div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setCurrentEditLine(line.id)}
                          className="p-1 text-gray-500 hover:text-primary rounded-full hover:bg-gray-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLyricLine(line.id)}
                          className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>لا توجد كلمات مضافة بعد</p>
              <p className="text-sm">أضف كلمات جديدة أو قم بتحميل ملف LRC</p>
            </div>
          )}
        </div>
      )}
      
      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        {editorMode === "text" 
          ? "أدخل كلمات الأغنية، كل سطر في سطر منفصل. يمكنك تحويلها إلى جدول زمني لاحقاً."
          : "أضف كلمات الأغنية مع التوقيت المناسب. يمكنك النقر على زمن أي سطر للانتقال إليه."}
      </p>
    </div>
  )
}