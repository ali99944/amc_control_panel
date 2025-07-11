"use client"
import { useState, useEffect } from "react"
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, FileText } from "lucide-react"
import Button from "../../components/ui/button"
import { Report } from "../../types/reports"
import { getStorageFile } from "../../lib/storage"
import { formatDate } from "../../lib/date"


interface PDFViewerModalProps {
  isOpen: boolean
  onClose: () => void
  report: Report | null
}

export default function PDFViewerModal({ isOpen, onClose, report }: PDFViewerModalProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setIsLoading(true)
      setError(null)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
  
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }
  
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen || !report?.generated_report_url) return null

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = report.generated_report_url!
    link.download = `${report.report_name}.pdf`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError("فشل في تحميل التقرير")
  }

  const getReportTypeLabel = (type: Report["report_type"]) => {
    switch (type) {
      case "user_report":
        return "تقرير المستخدمين"
      case "content_report":
        return "تقرير المحتوى"
      case "engagement_report":
        return "تقرير التفاعل"
      default:
        return type
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-xl shadow-xl flex flex-col ${
          isFullscreen ? "w-full h-full m-0 rounded-none" : "w-[95vw] h-[90vh] max-w-6xl m-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{report.report_name}</h3>
              <p className="text-sm text-gray-500">{getReportTypeLabel(report.report_type)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={handleZoomOut} disabled={zoom <= 50}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center px-2">{zoom}%</span>
            <Button size="sm" variant="secondary" onClick={handleZoomIn} disabled={zoom >= 200}>
              <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <Button size="sm" variant="secondary" onClick={handleRotate}>
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" onClick={handleFullscreen}>
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <Button size="sm" variant="primary" onClick={handleDownload} className="!py-1.5">
              <Download className="w-4 h-4" />
              تحميل
            </Button>
            <Button size="sm" variant="secondary" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-gray-100 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">جاري تحميل التقرير...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <FileText className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => window.open(report.generated_report_url, "_blank")}
                  >
                    فتح في نافذة جديدة
                  </Button>
                  <Button size="sm" variant="secondary" onClick={onClose}>
                    إغلاق
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div
            className="w-full h-full flex items-center justify-center p-4"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.3s ease",
            }}
          >
            <iframe
              src={`${getStorageFile(report.generated_report_url)}#zoom=${zoom}&toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full border-0 rounded-lg shadow-lg bg-white"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center center",
                minHeight: "100%",
              }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={`PDF Viewer - ${report.report_name}`}
            //   sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>تاريخ الإنشاء: {formatDate(report.created_at)}</span>
            {report.generated_report_size && <span>حجم الملف: {(report.generated_report_size / 1024 / 1024).toFixed(2)} MB</span>}
          </div>
          <div className="flex items-center gap-4">
            <span>التكبير: {zoom}%</span>
            {rotation > 0 && <span>الدوران: {rotation}°</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
