"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Mail, Phone, Calendar, Globe, Save, ArrowLeft, Trash2, Eye, UserIcon } from 'lucide-react'
import FileUploader from "../../components/ui/file-uploader"
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions"
import type { User } from "../../types/user-management"
import Select from "../../components/ui/select"


export default function EditUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Partial<User>>({})
//   const [, setAvatarFile] = useState<File | null>(null)
//   const [showPassword, setShowPassword] = useState(false)

  // API Hooks
  const { data: user, isLoading } = useGetQuery<User>({
    key: ["user", id],
    url: `/api/users/${id}`,
  })

  const updateUserMutation = useMutationAction<User, Partial<User>>({
    method: "put",
    url: `/api/users/${id}`,
    key: ["users", "user", id],
    onSuccessCallback: () => {
      navigate("/control-panel/users")
    },
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: unknown) => {
    console.log(parent, field, value);
    
    // setFormData((prev) => ({
    //   ...prev,
    //   [parent]: {
    //     ...prev[parent as keyof User],
    //     [field]: value,
    //   },
    // }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserMutation.mutate(formData)
  }

//   const handleAvatarUpload = (files: File[]) => {
//     if (files.length > 0) {
//       setAvatarFile(files[0])
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(files[0])
//       handleInputChange("avatar", previewUrl)
//     }
//   }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المستخدم...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <UserIcon size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">المستخدم غير موجود</h3>
        <p className="text-gray-500 mb-4">لم يتم العثور على المستخدم المطلوب</p>
        <Link
          to="/control-panel/users"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1ed760] transition-colors"
        >
          <ArrowLeft size={16} className="ml-2" />
          العودة للمستخدمين
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/control-panel/users"
              className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors ml-3"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">تعديل المستخدم</h1>
              <p className="text-gray-600">تعديل معلومات المستخدم {user.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/control-panel/users/${id}`}
              className="flex items-center px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye size={16} className="ml-2" />
              عرض الملف الشخصي
            </Link>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <div className="relative">
                    <Phone size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                  <div className="relative">
                    <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={formData.dateOfBirth || ""}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البلد</label>
                  <div className="relative">
                    <Globe size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.country || ""}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الجنس</label>
                  <Select
                    value={formData.gender || ""}
                    onChange={(value) => handleInputChange("gender", value)}
                    options={[
                      { value: "", label: "اختر الجنس" },
                      { value: "male", label: "ذكر" },
                      { value: "female", label: "أنثى" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات الحساب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الدور</label>
                  <Select
                    value={formData.role || ""}
                    onChange={(value) => handleInputChange("role", value)}
                    options={[
                      { value: "user", label: "مستخدم" },
                      { value: "premium", label: "مستخدم مميز" },
                      { value: "admin", label: "مدير" },
                      { value: "super_admin", label: "مدير عام" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حالة الحساب</label>
                  <Select
                    value={formData.status || ""}
                    onChange={(value) => handleInputChange("status", value)}
                    options={[
                      { value: "active", label: "نشط" },
                      { value: "inactive", label: "غير نشط" },
                      { value: "suspended", label: "معلق" },
                      { value: "banned", label: "محظور" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاشتراك</label>
                  <Select
                    value={formData.subscriptionType || ""}
                    onChange={(value) => handleInputChange("subscriptionType", value)}
                    options={[
                      { value: "free", label: "مجاني" },
                      { value: "premium", label: "مميز" },
                      { value: "family", label: "عائلي" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة المفضلة</label>
                  <Select
                    value={formData.preferences?.language || ""}
                    onChange={(value) => handleNestedInputChange("preferences", "language", value)}
                    options={[
                      { value: "ar", label: "العربية" },
                      { value: "en", label: "English" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">التفضيلات</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">الإشعارات</label>
                    <p className="text-xs text-gray-500">تلقي إشعارات حول النشاطات والتحديثات</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferences?.notifications || false}
                      onChange={(e) => handleNestedInputChange("preferences", "notifications", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">الملف الشخصي العام</label>
                    <p className="text-xs text-gray-500">السماح للآخرين برؤية ملفك الشخصي</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferences?.publicProfile || false}
                      onChange={(e) => handleNestedInputChange("preferences", "publicProfile", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Avatar */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الصورة الشخصية</h3>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {formData.avatar ? (
                    <img src={formData.avatar || "/placeholder.svg"} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <UserIcon size={32} className="text-white" />
                  )}
                </div>
                <FileUploader
                  accept="image/*"
                  maxSize={5}
                //   onFilesChange={handleAvatarUpload}
                  className="mb-4"
                />
                {formData.avatar && (
                  <button
                    type="button"
                    onClick={() => handleInputChange("avatar", "")}
                    className="flex items-center justify-center w-full px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} className="ml-2" />
                    حذف الصورة
                  </button>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإحصائيات</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الأغاني المُشغلة</span>
                  <span className="text-sm font-medium text-gray-900">{user.songsPlayed?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">قوائم التشغيل</span>
                  <span className="text-sm font-medium text-gray-900">{user.playlistsCreated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">وقت الاستماع</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.floor((user.statistics?.totalListeningTime || 0) / 3600)} ساعة
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">عدد الأجهزة</span>
                  <span className="text-sm font-medium text-gray-900">{user.statistics?.deviceCount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات</h3>
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50"
                >
                  <Save size={16} className="ml-2" />
                  {updateUserMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
                <Link
                  to="/control-panel/users"
                  className="w-full flex items-center justify-center px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
