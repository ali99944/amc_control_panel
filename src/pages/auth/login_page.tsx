"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, User, Lock, Music, Copy, HelpCircle } from "lucide-react"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useMutationAction } from "../../hooks/queries-actions"
import Card from "../../components/ui/card"
import { useNotifications } from "../../hooks/use-notification"
import { useAppDispatch } from "../../redux/hook"
import { loginSuccess } from "../../redux/reducers/auth_reducer"
import { Manager } from "../../types/manager"
import { useNavigate } from "react-router-dom"
import { getApiError } from "../../lib/error_handler"

interface LoginFormData {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  manager: Manager
}

export default function SpotifyLoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { notify } = useNotifications()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutationAction({
    method: "post",
    url: "managers/login",
    onSuccessCallback: (data: LoginResponse) => {
      
      dispatch(
        loginSuccess({
          token: data.token, // Adjust based on your API response
          manager: data.manager,
        })
      )
      
      notify.success("تسجيل الدخول ناجح! مرحباً بك في لوحة تحكم Spotify!")

      navigate('/')
    },
    onErrorCallback: (error) => {
      const errorObject = getApiError(error)
      notify.error(errorObject.message)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      username: formData.username,
      password: formData.password,
    })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    notify.info(`تم نسخ ${type} بنجاح!`)
  }

  const fillDummyCredentials = () => {
    setFormData({
      username: "amc",
      password: "amc"
    })
    notify.info("تم ملء البيانات التجريبية")
  }

  return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-primary">لوحة تحكم Spotify</h2>
              <p className="mt-2 text-sm text-gray-600">تسجيل الدخول لإدارة موسيقاك</p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Card className="bg-white space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المستخدم
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="أدخل اسم المستخدم"
                    icon={User}
                    required
                    disabled={isPending}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="أدخل كلمة المرور"
                      icon={Lock}
                      required
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isPending}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full"
                  loading={isPending}
                  disabled={isPending}
                >
                  تسجيل الدخول
                </Button>
              </Card>
            </form>

            {/* Dummy Credentials Card */}
            {
              import.meta.env.VITE_ENVIRONMENT == 'dev' && (
                <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-x-2 gap-x-reverse">
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-700">بيانات تجريبية للاختبار</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                    <span className="text-gray-600">اسم المستخدم:</span>
                    <div className="flex items-center gap-x-2 gap-x-reverse">
                      <span className="font-mono text-gray-800">amc</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard("amc", "اسم المستخدم")}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                    <span className="text-gray-600">كلمة المرور:</span>
                    <div className="flex items-center gap-x-2 gap-x-reverse">
                      <span className="font-mono text-gray-800">amc</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard("amc", "كلمة المرور")}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  onClick={fillDummyCredentials}
                  className="w-full"
                  disabled={isPending}
                >
                  ملء البيانات التجريبية
                </Button>
              </div>
            </Card>
              )
            }

          </div>
        </div>
      </div>
  )
}