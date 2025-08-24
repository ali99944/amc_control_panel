import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBolt, FaTimes } from 'react-icons/fa'
import { AlertTriangle, Calendar, Car, Clock, File, Search, UserPlus, Users } from 'lucide-react'

interface QuickAction {
  id: string
  icon: React.ElementType
  label: string
  onClick: () => void
}

const quickActions: QuickAction[] = [
  { id: 'add-vehicle', icon: Car, label: 'إضافة سيارة', onClick: () => console.log('تم النقر على إضافة سيارة') },
  { id: 'book-parking', icon: Calendar, label: 'حجز موقف', onClick: () => console.log('تم النقر على حجز موقف') },
  { id: 'generate-report', icon: File, label: 'توليد تقرير', onClick: () => console.log('تم النقر على توليد تقرير') },
  { id: 'report-violation', icon: AlertTriangle, label: 'الإبلاغ عن مخالفة', onClick: () => console.log('تم النقر على الإبلاغ عن مخالفة') },
  { id: 'extend-parking', icon: Clock, label: 'تمديد الوقوف', onClick: () => console.log('تم النقر على تمديد الوقوف') },
  { id: 'add-user', icon: UserPlus, label: 'إضافة مستخدم', onClick: () => console.log('تم النقر على إضافة مستخدم') },
  { id: 'add-manager', icon: Users, label: 'إضافة مدير', onClick: () => console.log('تم النقر على إضافة مدير') },
  { id: 'find-parking', icon: Search, label: 'ابحث عن موقف', onClick: () => console.log('تم النقر على ابحث عن موقف') },
]

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleQuickActions = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded shadow-md overflow-hidden"
          >
            <div className="bg-primary text-white p-2 flex justify-between items-center">
              <h3 className="text-sm">الإجراءات السريعة</h3>
              <button onClick={toggleQuickActions} className="text-white hover:text-gray-200 transition-colors">
                <FaTimes className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
            <div className="p-2 grid grid-cols-4 gap-2">
              <AnimatePresence>
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={action.onClick}
                    className="flex flex-col items-center justify-center p-2 bg-primary/10 hover:bg-primary/20 rounded cursor-pointer transition-colors"
                  >
                    <action.icon className="w-6 h-6 text-primary mb-1" />
                    <span className="text-sm fon text-gray-800">{action.label}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleQuickActions}
          className="bg-primary text-white p-3 rounded-full shadow hover:bg-primary/90 cursor-pointer transition-all duration-300 ease-in-out"
        >
          <FaBolt className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  )
}
