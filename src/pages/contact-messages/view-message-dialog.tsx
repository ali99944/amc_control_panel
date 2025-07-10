"use client"
import { Mail, User, Calendar, MessageSquare } from "lucide-react"
import Dialog from "../../components/ui/dialog"
import { formatDateTime } from "../../lib/date"
import { ContactMessage } from "../../types/contact-message"

interface ViewMessageDialogProps {
  isOpen: boolean
  onClose: () => void
  message: ContactMessage | null
}

export default function ViewMessageDialog({ isOpen, onClose, message }: ViewMessageDialogProps) {
  if (!message) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تفاصيل الرسالة" size="lg">
      <div className="space-y-6">
        {/* Message Header */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">اسم المرسل</p>
                <p className="font-medium text-gray-900">{message.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                <p className="font-medium text-gray-900">{message.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h4 className="font-medium text-gray-900">الموضوع</h4>
          </div>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{message.subject}</p>
        </div>

        {/* Message Content */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">محتوى الرسالة</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">تاريخ الإرسال:</span>
              <span className="font-medium">{formatDateTime(message.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">آخر تحديث:</span>
              <span className="font-medium">{formatDateTime(message.updated_at)}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject}`}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-center hover:bg-primary/90 transition-colors"
          >
            الرد عبر البريد الإلكتروني
          </a>
        </div>
      </div>
    </Dialog>
  )
}
