import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBolt, FaTimes } from 'react-icons/fa'
import { PlusCircle, ShoppingBag, Package, Users, Tag, BarChart2, Settings, LogOut } from 'lucide-react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

interface QuickAction {
  id: string
  icon: React.ElementType
  label: string
  onClick: () => void
  bgColor?: string
  textColor?: string
}

function getQuickActionItems (navigate: NavigateFunction) {
  return [
    { id: 'add-product', icon: PlusCircle, label: 'إضافة منتج', onClick: () => navigate('products/create'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'manage-products', icon: ShoppingBag, label: 'إدارة المنتجات', onClick: () => navigate('products'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'orders', icon: Package, label: 'الطلبات', onClick: () => console.log('فتح الطلبات'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'customers', icon: Users, label: 'العملاء', onClick: () => console.log('فتح قائمة العملاء'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'discounts', icon: Tag, label: 'كوبونات الخصم', onClick: () => console.log('فتح كوبونات الخصم'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'analytics', icon: BarChart2, label: 'الإحصائيات', onClick: () => navigate('analytics'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'settings', icon: Settings, label: 'الإعدادات', onClick: () => console.log('فتح الإعدادات'), bgColor: 'bg-primary/10', textColor: 'text-primary' },
    { id: 'logout', icon: LogOut, label: 'تسجيل الخروج', onClick: () => console.log('تسجيل الخروج'), bgColor: 'bg-destructive/10', textColor: 'text-destructive' },
  ] as QuickAction[]
}

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleQuickActions = () => setIsOpen(!isOpen)
  const navigate = useNavigate()
  const quickActions = getQuickActionItems(navigate)

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
                    className={`flex flex-col items-center justify-center p-2 ${action.bgColor || 'bg-primary/10'} hover:${action.id === 'logout' ? 'bg-red-200' : 'bg-primary/20'} rounded cursor-pointer transition-colors`}
                  >
                    <action.icon className={`w-6 h-6 ${action.textColor || 'text-primary'} mb-1`} />
                    <span className={`text-sm ${action.id === 'logout' ? 'font-medium' : ''} ${action.id === 'logout' ? 'text-red-600' : 'text-gray-800'}`}>{action.label}</span>
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
