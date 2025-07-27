"use client"
import { Shield, FileText, Calendar, User, Lock, Eye, Globe, Database, Settings } from 'lucide-react'
import Card from '../../components/ui/card'
import { formatDate } from '../../lib/date'
import { PrivacyPolicy } from '../../types/privacy_policy'


interface PrivacyPolicyPreviewProps {
  privacyPolicy: PrivacyPolicy
}

export default function PrivacyPolicyPreview({ privacyPolicy }: PrivacyPolicyPreviewProps) {
  // Icon mapping for different section types
  const getSectionIcon = (title: string) => {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes("معلومات") || titleLower.includes("بيانات")) {
      return Database
    }
    if (titleLower.includes("استخدام") || titleLower.includes("كيف")) {
      return Settings
    }
    if (titleLower.includes("مشاركة") || titleLower.includes("إفشاء")) {
      return Globe
    }
    if (titleLower.includes("أمان") || titleLower.includes("حماية")) {
      return Lock
    }
    if (titleLower.includes("حقوق") || titleLower.includes("اختيارات")) {
      return User
    }
    if (titleLower.includes("ملفات") || titleLower.includes("كوكيز")) {
      return Eye
    }
    
    return FileText
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-xl mb-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">{privacyPolicy.title}</h1>
        <p className="text-lg opacity-90 mb-4">
          نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية
        </p>
        <div className="flex items-center justify-center gap-4 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>آخر تحديث: {formatDate(privacyPolicy.updated_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{privacyPolicy.sections.length} أقسام</span>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            جدول المحتويات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {privacyPolicy.sections.map((section, index) => {
              const IconComponent = getSectionIcon(section.title)
              return (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {index + 1}. {section.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {section.points.length} نقطة
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Sections */}
      <div className="space-y-8">
        {privacyPolicy.sections.map((section, index) => {
          const IconComponent = getSectionIcon(section.title)
          
          return (
            <Card key={section.id} className="scroll-mt-4">
              <div className="p-6">
                {/* Section Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        القسم {index + 1}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Section Points */}
                {section.points.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      التفاصيل
                    </h3>
                    <div className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">
                              {pointIndex + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Footer */}
      <Card className="mt-8">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            هل لديك أسئلة حول سياسة الخصوصية؟
          </h3>
          <p className="text-gray-600 mb-4">
            إذا كان لديك أي استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معنا
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:privacy@company.com"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              تواصل معنا
            </a>
            <a
              href="#top"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              العودة للأعلى
            </a>
          </div>
        </div>
      </Card>

      {/* Last Updated Notice */}
      <div className="text-center py-6 text-sm text-gray-500">
        <p>
          تم تحديث هذه السياسة آخر مرة في {formatDate(privacyPolicy.updated_at)}
        </p>
        <p className="mt-1">
          نحتفظ بالحق في تحديث هذه السياسة في أي وقت، وسنقوم بإشعارك بأي تغييرات مهمة
        </p>
      </div>
    </div>
  )
}
