"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, Music, Shield } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح"
    }
    
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة"
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful login
      localStorage.setItem("amc_token", "mock_token_123")
      localStorage.setItem("amc_user", JSON.stringify({
        id: "1",
        name: "علي طارق",
        email: formData.email,
        role: "super_admin"
      }))
      
      navigate("/control-panel")
    } catch (error) {
        console.log((error as Error).message);
        
      setErrors({ general: "حدث خطأ أثناء تسجيل الدخول" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Music size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مركز علي الإعلامي</h1>
          <p className="text-gray-600">تسجيل الدخول إلى لوحة التحكم</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-colors ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="admin@amc.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pr-10 pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-colors ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#1DB954] border-gray-300 rounded focus:ring-[#1DB954]"
                />
                <span className="mr-2 text-sm text-gray-700">تذكرني</span>
              </label>
              <button type="button" className="text-sm text-[#1DB954] hover:text-[#1ed760]">
                نسيت كلمة المرور؟
              </button>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white py-3 px-4 rounded-lg font-medium hover:from-[#1ed760] hover:to-[#1DB954] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  جاري تسجيل الدخول...
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield size={16} className="text-gray-600 ml-2" />
              <p className="text-xs text-gray-600">
                تسجيل الدخول آمن ومحمي بتشفير SSL
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2024 مركز علي الإعلامي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  )
}
