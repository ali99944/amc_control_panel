"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, File, Music, ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'

interface FileItem {
  id: string
  file: File
  name: string
  size: string
  type: "audio" | "image" | "other"
  status: "pending" | "uploading" | "success" | "error"
  progress: number
  preview?: string
  metadata?: {
    duration?: string
    artist?: string
    title?: string
    album?: string
  }
}

interface FileUploaderProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  onFilesChange?: (files: FileItem[]) => void
  className?: string
  type?: "audio" | "image" | "any"
}

export default function FileUploader({
  accept,
  multiple = false,
  maxSize = 50,
  onFilesChange,
  className = "",
  type = "any",
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileType = (file: File): "audio" | "image" | "other" => {
    if (file.type.startsWith("audio/")) return "audio"
    if (file.type.startsWith("image/")) return "image"
    return "other"
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const extractAudioMetadata = async (file: File): Promise<FileItem["metadata"]> => {
    // In a real implementation, you would use a library like music-metadata
    // For now, we'll simulate metadata extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          duration: "3:45",
          artist: "Unknown Artist",
          title: file.name.replace(/\.[^/.]+$/, ""),
          album: "Unknown Album",
        })
      }, 1000)
    })
  }

  const processFiles = useCallback(
    async (fileList: FileList) => {
      const newFiles: FileItem[] = []

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          continue
        }

        const fileItem: FileItem = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: formatFileSize(file.size),
          type: getFileType(file),
          status: "pending",
          progress: 0,
        }

        // Create preview for images
        if (fileItem.type === "image") {
          fileItem.preview = URL.createObjectURL(file)
        }

        // Extract metadata for audio files
        if (fileItem.type === "audio") {
          fileItem.status = "uploading"
          fileItem.metadata = await extractAudioMetadata(file)
          fileItem.status = "success"
          fileItem.progress = 100
        }

        newFiles.push(fileItem)
      }

      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    },
    [files, maxSize, multiple, onFilesChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const droppedFiles = e.dataTransfer.files
      processFiles(droppedFiles)
    },
    [processFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files
      if (selectedFiles) {
        processFiles(selectedFiles)
      }
    },
    [processFiles],
  )

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Music size={20} className="text-primary" />
      case "image":
        return <ImageIcon size={20} className="text-blue-500" />
      default:
        return <File size={20} className="text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle size={16} className="text-green-500" />
      case "error":
        return <AlertCircle size={16} className="text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragOver ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"}
        `}
      >
        <Upload size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {type === "audio" ? "رفع ملفات صوتية" : type === "image" ? "رفع صور" : "رفع ملفات"}
        </h3>
        <p className="text-gray-500 mb-4">اسحب الملفات هنا أو انقر للاختيار</p>
        <p className="text-sm text-gray-400">
          الحد الأقصى: {maxSize} ميجابايت {multiple ? "• ملفات متعددة مسموحة" : "• ملف واحد فقط"}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">الملفات المرفوعة ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {file.preview ? (
                  <img src={file.preview || "/placeholder.svg"} alt={file.name} className="w-10 h-10 rounded object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    {getStatusIcon(file.status)}
                  </div>
                  <p className="text-xs text-gray-500">{file.size}</p>
                  
                  {file.metadata && (
                    <div className="text-xs text-gray-600 mt-1">
                      <span>{file.metadata.artist} • {file.metadata.duration}</span>
                    </div>
                  )}

                  {file.status === "uploading" && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
