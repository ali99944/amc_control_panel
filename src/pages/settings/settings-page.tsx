// "use client"

// import { useState } from "react"
// import { Settings, Bell, Shield, Key, Palette, Save, Volume2, Radio, User, Mail, Globe, Database, Smartphone, Eye, EyeOff } from 'lucide-react'

// interface SettingsData {
//   // Profile settings
//   profile: {
//     name: string
//     email: string
//     phone: string
//     avatar: string
//     bio: string
//     timezone: string
//     language: string
//   }
//   // General settings
//   general: {
//     siteName: string
//     siteDescription: string
//     siteUrl: string
//     adminEmail: string
//     supportEmail: string
//     maintenanceMode: boolean
//     registrationEnabled: boolean
//   }
//   // Audio settings
//   audio: {
//     defaultQuality: string
//     maxUploadSize: string
//     allowedFormats: string[]
//     enableCrossfade: boolean
//     crossfadeDuration: string
//     enableNormalization: boolean
//     bufferSize: string
//   }
//   // Streaming settings
//   streaming: {
//     enableStreaming: boolean
//     maxConcurrentStreams: string
//     enableOfflineMode: boolean
//     streamingQuality: string
//   }
//   // Notification settings
//   notifications: {
//     emailNotifications: boolean
//     pushNotifications: boolean
//     newUserNotifications: boolean
//     newMusicNotifications: boolean
//     systemAlerts: boolean
//     weeklyReports: boolean
//   }
//   // Security settings
//   security: {
//     currentPassword: string
//     newPassword: string
//     confirmPassword: string
//     twoFactorAuth: boolean
//     sessionTimeout: string
//     maxLoginAttempts: string
//     ipWhitelist: string[]
//   }
//   // API settings
//   api: {
//     enableAPI: boolean
//     rateLimitPerHour: string
//     requireAPIKey: boolean
//     apiVersion: string
//   }
//   // Appearance settings
//   appearance: {
//     theme: string
//     primaryColor: string
//     sidebarCollapsed: boolean
//     showAnimations: boolean
//   }
// }

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("profile")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
  
//   const [formData, setFormData] = useState<SettingsData>({
//     profile: {
//       name: "علي طارق",
//       email: "ali@amc.com",
//       phone: "+966501234567",
//       avatar: "",
//       bio: "مؤسس ومدير مركز علي الإعلامي",
//       timezone: "Asia/Riyadh",
//       language: "ar"
//     },
//     general: {
//       siteName: "مركز علي الإعلامي",
//       siteDescription: "منصة الموسيقى العربية الرائدة",
//       siteUrl: "https://amc.alitarek.com",
//       adminEmail: "admin@amc.alitarek.com",
//       supportEmail: "support@amc.alitarek.com",
//       maintenanceMode: false,
//       registrationEnabled: true
//     },
//     audio: {
//       defaultQuality: "320kbps",
//       maxUploadSize: "50",
//       allowedFormats: ["mp3", "flac", "wav"],
//       enableCrossfade: true,
//       crossfadeDuration: "3",
//       enableNormalization: true,
//       bufferSize: "5"
//     },
//     streaming: {
//       enableStreaming: true,
//       maxConcurrentStreams: "3",
//       enableOfflineMode: true,
//       streamingQuality: "high"
//     },
//     notifications: {
//       emailNotifications: true,
//       pushNotifications: false,
//       newUserNotifications: true,
//       newMusicNotifications: true,
//       systemAlerts: true,
//       weeklyReports: true
//     },
//     security: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//       twoFactorAuth: false,
//       sessionTimeout: "24",
//       maxLoginAttempts: "5",
//       ipWhitelist: []
//     },
//     api: {
//       enableAPI: true,
//       rateLimitPerHour: "1000",
//       requireAPIKey: true,
//       apiVersion: "v1"
//     },
//     appearance: {
//       theme: "light",
//       primaryColor: "#1DB954",
//       sidebarCollapsed: false,
//       showAnimations: true
//     }
//   })

//   const handleInputChange = (section: keyof SettingsData, field: string, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }))
//   }

//   const handleSave = async (section: keyof SettingsData) => {
//     setIsLoading(true)
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000))
//       console.log(`Saving ${section} settings:`, formData[section])
//       // Here you would make the actual API call
//     } catch (error) {
//       console.error("Error saving settings:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const tabs = [
//     { id: "profile", name: "الملف الشخصي", icon: User },
//     { id: "general", name: "عام", icon: Settings },
//     { id: "audio", name: "الصوت", icon: Volume2 },
//     { id: "streaming", name: "البث", icon: Radio },
//     { id: "notifications", name: "الإشعارات", icon: Bell },
//     { id: "security", name: "الأمان", icon: Shield },
//     { id: "api", name: "API", icon: Key },
//     { id: "appearance", name: "المظهر", icon: Palette },
//   ]

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-gray-900">الملف الشخصي</h2>
//               <button
//                 onClick={() => handleSave("profile")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
//                 <input
//                   type="text"
//                   value={formData.profile.name}
//                   onChange={(e) => handleInputChange("profile", "name", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
//                 <input
//                   type="email"
//                   value={formData.profile.email}
//                   onChange={(e) => handleInputChange("profile", "email", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
//                 <input
//                   type="tel"
//                   value={formData.profile.phone}
//                   onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
//                 <select
//                   value={formData.profile.timezone}
//                   onChange={(e) => handleInputChange("profile", "timezone", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
//                 >
//                   <option value="Asia/Riyadh">الرياض (GMT+3)</option>
//                   <option value="Asia/Dubai">دبي (GMT+4)</option>
//                   <option value="Africa/Cairo">القاهرة (GMT+2)</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">نبذة شخصية</label>
//               <textarea
//                 value={formData.profile.bio}
//                 onChange={(e) => handleInputChange("profile", "bio", e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//               />
//             </div>
//           </div>
//         )

//       case "general":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-gray-900">الإعدادات العامة</h2>
//               <button
//                 onClick={() => handleSave("general")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
//                 <input
//                   type="text"
//                   value={formData.general.siteName}
//                   onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">رابط الموقع</label>
//                 <input
//                   type="url"
//                   value={formData.general.siteUrl}
//                   onChange={(e) => handleInputChange("general", "siteUrl", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">بريد المدير</label>
//                 <input
//                   type="email"
//                   value={formData.general.adminEmail}
//                   onChange={(e) => handleInputChange("general", "adminEmail", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">بريد الدعم</label>
//                 <input
//                   type="email"
//                   value={formData.general.supportEmail}
//                   onChange={(e) => handleInputChange("general", "supportEmail", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
//               <textarea
//                 value={formData.general.siteDescription}
//                 onChange={(e) => handleInputChange("general", "siteDescription", e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//               />
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-gray-900">وضع الصيانة</h3>
//                   <p className="text-sm text-gray-600">تعطيل الموقع مؤقتاً للصيانة</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.general.maintenanceMode}
//                     onChange={(e) => handleInputChange("general", "maintenanceMode", e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-gray-900">السماح بالتسجيل</h3>
//                   <p className="text-sm text-gray-600">السماح للمستخدمين الجدد بإنشاء حسابات</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.general.registrationEnabled}
//                     onChange={(e) => handleInputChange("general", "registrationEnabled", e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                 </label>
//               </div>
//             </div>
//           </div>
//         )

//       case "audio":
//         return (
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">إعدادات الصوت</h2>
//               <button
//                 onClick={() => handleSave("audio")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">جودة التشغيل الافتراضية</label>
//                   <select
//                     value={formData.audio.defaultQuality}
//                     onChange={(e) => handleInputChange("audio", "defaultQuality", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-white"
//                   >
//                     <option value="128kbps">128 kbps</option>
//                     <option value="320kbps">320 kbps</option>
//                     <option value="lossless">Lossless</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     الحد الأقصى لحجم الرفع (MB)
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.audio.maxUploadSize}
//                     onChange={(e) => handleInputChange("audio", "maxUploadSize", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     مدة الانتقال التدريجي (ثانية)
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.audio.crossfadeDuration}
//                     onChange={(e) => handleInputChange("audio", "crossfadeDuration", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                   <div>
//                     <h3 className="font-medium text-white">تفعيل الانتقال التدريجي</h3>
//                     <p className="text-sm text-gray-400">انتقال سلس بين الأغاني</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.audio.enableCrossfade}
//                       onChange={(e) => handleInputChange("audio", "enableCrossfade", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                   <div>
//                     <h3 className="font-medium text-white">تطبيع مستوى الصوت</h3>
//                     <p className="text-sm text-gray-400">توحيد مستوى الصوت لجميع الأغاني</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.audio.enableNormalization}
//                       onChange={(e) => handleInputChange("audio", "enableNormalization", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//         )

//       case "streaming":
//         return (
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">إعدادات البث</h2>
//               <button
//                 onClick={() => handleSave("streaming")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">الحد الأقصى للبث المتزامن</label>
//                   <input
//                     type="number"
//                     value={formData.streaming.maxConcurrentStreams}
//                     onChange={(e) => handleInputChange("streaming", "maxConcurrentStreams", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">حجم المخزن المؤقت (ثانية)</label>
//                   <input
//                     type="number"
//                     value={formData.audio.bufferSize}
//                     onChange={(e) => handleInputChange("audio", "bufferSize", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                   <div>
//                     <h3 className="font-medium text-white">تفعيل البث</h3>
//                     <p className="text-sm text-gray-400">السماح للمستخدمين ببث الموسيقى</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.streaming.enableStreaming}
//                       onChange={(e) => handleInputChange("streaming", "enableStreaming", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                   <div>
//                     <h3 className="font-medium text-white">الوضع غير المتصل</h3>
//                     <p className="text-sm text-gray-400">السماح بتحميل الأغاني للاستماع بدون إنترنت</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.streaming.enableOfflineMode}
//                       onChange={(e) => handleInputChange("streaming", "enableOfflineMode", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//         )

//       case "notifications":
//         return (
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">إعدادات الإشعارات</h2>
//               <button
//                 onClick={() => handleSave("notifications")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>
//             {/* Notification settings content */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-white">إشعارات البريد الإلكتروني</h3>
//                   <p className="text-sm text-gray-400">تلقي الإشعارات عبر البريد الإلكتروني</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.notifications.emailNotifications}
//                     onChange={(e) => handleInputChange("notifications", "emailNotifications", e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                 </label>
//               </div>
//               <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-white">إشعارات الجيل الجديد</h3>
//                   <p className="text-sm text-gray-400">تلقي تقارير أسبوعية عن الأنشطة الجديدة</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.notifications.weeklyReports}
//                     onChange={(e) => handleInputChange("notifications", "weeklyReports", e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                 </label>
//               </div>
//             </div>
//           </div>
//         )

//       case "security":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-gray-900">إعدادات الأمان</h2>
//               <button
//                 onClick={() => handleSave("security")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <h3 className="font-medium text-yellow-800 mb-2">تغيير كلمة المرور</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية</label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={formData.security.currentPassword}
//                       onChange={(e) => handleInputChange("security", "currentPassword", e.target.value)}
//                       className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     >
//                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         value={formData.security.newPassword}
//                         onChange={(e) => handleInputChange("security", "newPassword", e.target.value)}
//                         className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       >
//                         {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={formData.security.confirmPassword}
//                         onChange={(e) => handleInputChange("security", "confirmPassword", e.target.value)}
//                         className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       >
//                         {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">مهلة انتهاء الجلسة (ساعة)</label>
//                 <input
//                   type="number"
//                   value={formData.security.sessionTimeout}
//                   onChange={(e) => handleInputChange("security", "sessionTimeout", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لمحاولات تسجيل الدخول</label>
//                 <input
//                   type="number"
//                   value={formData.security.maxLoginAttempts}
//                   onChange={(e) => handleInputChange("security", "maxLoginAttempts", e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <h3 className="font-medium text-gray-900">المصادقة الثنائية</h3>
//                 <p className="text-sm text-gray-600">تفعيل المصادقة الثنائية لحماية إضافية</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.security.twoFactorAuth}
//                   onChange={(e) => handleInputChange("security", "twoFactorAuth", e.target.checked)}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//               </label>
//             </div>
//           </div>
//         )

//       case "api":
//         return (
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">إعدادات API</h2>
//               <button
//                 onClick={() => handleSave("api")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">تفعيل API</label>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.api.enableAPI}
//                       onChange={(e) => handleInputChange("api", "enableAPI", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">حد معدل الطلبات في الساعة</label>
//                   <input
//                     type="number"
//                     value={formData.api.rateLimitPerHour}
//                     onChange={(e) => handleInputChange("api", "rateLimitPerHour", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">تطلب مفتاح API</label>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.api.requireAPIKey}
//                       onChange={(e) => handleInputChange("api", "requireAPIKey", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">نسخة API</label>
//                   <input
//                     type="text"
//                     value={formData.api.apiVersion}
//                     onChange={(e) => handleInputChange("api", "apiVersion", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case "appearance":
//         return (
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">إعدادات المظهر</h2>
//               <button
//                 onClick={() => handleSave("appearance")}
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
//               >
//                 <Save size={16} className="ml-2" />
//                 {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-4">نظام الألوان</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="p-4 border-2 border-[#1DB954] rounded-lg bg-[#2A2A2A]">
//                     <div className="w-full h-20 bg-gradient-to-l from-[#1DB954] to-[#1ed760] rounded mb-3"></div>
//                     <h4 className="font-medium text-white">النظام الحالي</h4>
//                     <p className="text-sm text-gray-400">أخضر سبوتيفاي</p>
//                   </div>
//                   <div className="p-4 border-2 border-gray-600 rounded-lg bg-[#2A2A2A] hover:border-gray-400 cursor-pointer">
//                     <div className="w-full h-20 bg-gradient-to-l from-gray-800 to-gray-600 rounded mb-3"></div>
//                     <h4 className="font-medium text-white">النظام الداكن</h4>
//                     <p className="text-sm text-gray-400">قريباً</p>
//                   </div>
//                   <div className="p-4 border-2 border-gray-600 rounded-lg bg-[#2A2A2A] hover:border-gray-400 cursor-pointer">
//                     <div className="w-full h-20 bg-gradient-to-l from-blue-600 to-blue-400 rounded mb-3"></div>
//                     <h4 className="font-medium text-white">النظام الأزرق</h4>
//                     <p className="text-sm text-gray-400">قريباً</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">السمة الأساسية</label>
//                   <input
//                     type="text"
//                     value={formData.appearance.primaryColor}
//                     onChange={(e) => handleInputChange("appearance", "primaryColor", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">النظام</label>
//                   <select
//                     value={formData.appearance.theme}
//                     onChange={(e) => handleInputChange("appearance", "theme", e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-white"
//                   >
//                     <option value="light">النظام claro</option>
//                     <option value="dark">النظام الداكن</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                   <div>
//                     <h3 className="font-medium text-white">طي الشريط الجانبي</h3>
//                     <p className="text-sm text-gray-400">طي الشريط الجانبي للحصول على مساحة أكبر</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.appearance.sidebarCollapsed}
//                       onChange={(e) => handleInputChange("appearance", "sidebarCollapsed", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
//                   <div>
//                     <h3 className="font-medium text-white">إظهار الرسوم المتحركة</h3>
//                     <p className="text-sm text-gray-400">إظهار الرسوم المتحركة في واجهة المستخدم</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.appearance.showAnimations}
//                       onChange={(e) => handleInputChange("appearance", "showAnimations", e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )



//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-gradient-to-l from-[#1DB954] to-[#1ed760] rounded-xl p-4 text-black">
//         <h1 className="text-3xl font-bold mb-2">إعدادات النظام</h1>
//         <p className="text-black/80">إدارة إعدادات مركز علي الإعلامي</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Sidebar Navigation */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl border border-gray-200 p-4">
//             <nav className="space-y-2">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
//                     activeTab === tab.id
//                       ? "bg-[#1DB954] text-white"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-[#1DB954]"
//                   }`}
//                 >
//                   <tab.icon size={20} className="ml-3" />
//                   {tab.name}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             {renderTabContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
//   }
