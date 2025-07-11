/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useContext, useEffect } from "react"
import { Save, Settings, Users, Shield } from 'lucide-react'
import { useGetQuery, useMutationAction } from "../../hooks/queries-actions"
import SkeletonLoader from "../../components/skeleton_page_loader"
import { NotificationContext } from "../../providers/notification-provider"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"
import Switch from "../../components/ui/switch"
import { AppSettings } from "../../types"
import Toolbar from "../../components/ui/toolbar"
import { getApiError } from "../../lib/error_handler"
import Textarea from "../../components/ui/textarea"




export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("app")
  const { addNotification } = useContext(NotificationContext)

  // Fetch settings
  const {
    data: settings,
    isLoading: isFetching,
    refetch,
  } = useGetQuery<AppSettings>({
    key: ["settings"],
    url: "settings",
    options: {
      initialData: {
        app: {
          name: "مركز علي الإعلامي",
          description: "منصة الموسيقى العربية الرائدة",
          logo: "/logo.png",
          maintenance_mode: false,
          support_email: "support@amc.alitarek.com",
          copyright: '',
          version: ''
        },
        users: {
          max_playlist_size: 1000,
          max_playlists_per_user: 100,
        },
        security: {
          require_email_verification: true,
          session_timeout_hours: 24,
          max_login_attempts: 5,
          enable_explicit_content: false,
        },
      },
    },
  })

  const [formData, setFormData] = useState<AppSettings>(settings!)

  // Update form data when settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  // Save settings mutation
  const saveSettingsMutation = useMutationAction<void, AppSettings>({
    method: "post",
    url: "settings",
    key: ["settings"],
    onSuccessCallback: () => {
      addNotification("تم حفظ الإعدادات بنجاح", "success")
      refetch()
    },
    onErrorCallback: (error) => {
      const errorMessage = getApiError(error)
      console.log(errorMessage);
      
      addNotification(errorMessage.message, "error")
    },
  })

  const handleInputChange = (section: keyof AppSettings, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSaveAll = () => {
    saveSettingsMutation.mutate(formData)
  }

  const tabs = [
    { id: "app", name: "التطبيق", icon: Settings },
    { id: "social", name: "المستخدمين", icon: Users },
    { id: "security", name: "الأمان", icon: Shield },
  ]

  if (isFetching) {
    return <SkeletonLoader cardCount={4} />
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Toolbar title="اعدادات النظام">
        <Button
            onClick={handleSaveAll}
            disabled={saveSettingsMutation.isPending}
            variant='primary-inverted'
          >
            <Save size={20} className="ml-2" />
            {saveSettingsMutation.isPending ? "جاري الحفظ..." : "حفظ جميع الإعدادات"}
          </Button>
      </Toolbar>



      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex gap-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon size={20} className="ml-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          {/* App Settings */}
          {activeTab === "app" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">إعدادات التطبيق</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم التطبيق</label>
                  <Input
                    type="text"
                    value={formData.app.name}
                    onChange={(e) => handleInputChange("app", "name", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">بريد الدعم</label>
                  <Input
                    type="email"
                    value={formData.app.support_email}
                    onChange={(e) => handleInputChange("app", "support_email", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شعار التطبيق</label>
                  <Input
                    type="text"
                    value={formData.app.logo}
                    onChange={(e) => handleInputChange("app", "logo", e.target.value)}
                    placeholder="/logo.png"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حقوق الملكية</label>
                <Input
                  value={formData.app.copyright}
                  onChange={(e) => handleInputChange("app", "copyrights", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف التطبيق</label>
                <Textarea
                  value={formData.app.description}
                  onChange={(e) => handleInputChange("app", "description", e.target.value)}
                  rows={6}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">وضع الصيانة</h3>
                    <p className="text-sm text-gray-600">تعطيل التطبيق مؤقتاً للصيانة</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Switch
                      checked={formData.app.maintenance_mode}
                      onChange={(e) => handleInputChange("app", "maintenance_mode", e)}
                      // className="sr-only peer"
                    />
                    {/* <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div> */}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Social Settings */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">إعدادات المستخدمين والتفاعل</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لحجم قائمة التشغيل</label>
                  <Input
                    type="number"
                    value={formData.users.max_playlist_size}
                    onChange={(e) => handleInputChange("users", "max_playlist_size", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحد الأقصى لقوائم التشغيل لكل مستخدم
                  </label>
                  <Input
                    type="number"
                    value={formData.users.max_playlists_per_user}
                    onChange={(e) => handleInputChange("users", "max_playlists_per_user", Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">




              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">إعدادات الأمان والخصوصية</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مهلة انتهاء الجلسة (ساعات)</label>
                  <Input
                    type="number"
                    value={formData.security.session_timeout_hours}
                    onChange={(e) => handleInputChange("security", "session_timeout_hours", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لمحاولات تسجيل الدخول</label>
                  <Input
                    type="number"
                    value={formData.security.max_login_attempts}
                    onChange={(e) => handleInputChange("security", "max_login_attempts", Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">تأكيد البريد الإلكتروني مطلوب</h3>
                    <p className="text-sm text-gray-600">يجب على المستخدمين تأكيد بريدهم الإلكتروني</p>
                  </div>
                  <Switch
                      checked={formData.security.require_email_verification}
                      onChange={(e) => handleInputChange("security", "require_email_verification", e)}
                    />
                </div>




                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">السماح بالمحتوى الصريح</h3>
                    <p className="text-sm text-gray-600">السماح بعرض المحتوى المصنف للبالغين</p>
                  </div>
                  <Switch
                      checked={formData.security.enable_explicit_content}
                      onChange={(e) => handleInputChange("security", "enable_explicit_content", e)}
                    />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
