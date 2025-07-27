"use client"
import { Scale, FileText, Calendar, User, Gavel, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import Card from "../../components/ui/card"
import { formatDate } from "../../lib/date"
import { TermsConditions } from "../../types/terms_conditions"

interface TermsConditionsPreviewProps {
  termsConditions: TermsConditions
}

export default function TermsConditionsPreview({ termsConditions }: TermsConditionsPreviewProps) {
  // Icon mapping for different section types
  const getSectionIcon = (title: string) => {
    const titleLower = title.toLowerCase()

    if (titleLower.includes("قبول") || titleLower.includes("موافقة")) {
      return CheckCircle
    }
    if (titleLower.includes("استخدام") || titleLower.includes("خدمة")) {
      return User
    }
    if (titleLower.includes("حظر") || titleLower.includes("منع") || titleLower.includes("ممنوع")) {
      return XCircle
    }
    if (titleLower.includes("مسؤولية") || titleLower.includes("ضمان")) {
      return AlertTriangle
    }
    if (titleLower.includes("قانون") || titleLower.includes("قضائي") || titleLower.includes("محكمة")) {
      return Gavel
    }
    if (titleLower.includes("تعديل") || titleLower.includes("تغيير")) {
      return Info
    }
    if (titleLower.includes("حساب") || titleLower.includes("تسجيل")) {
      return User
    }

    return FileText
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-xl mb-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scale className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">{termsConditions.title}</h1>
        <p className="text-lg opacity-90 mb-4">يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا</p>
        <div className="flex items-center justify-center gap-4 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>آخر تحديث: {formatDate(termsConditions.updated_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{termsConditions.sections.length} أقسام</span>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="mb-8 border-l-4 border-l-amber-500">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">إشعار مهم</h3>
              <p className="text-gray-700 leading-relaxed">
                باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط،
                يرجى عدم استخدام خدماتنا. نحتفظ بالحق في تعديل هذه الشروط في أي وقت.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Table of Contents */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            جدول المحتويات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {termsConditions.sections.map((section, index) => {
              const IconComponent = getSectionIcon(section.title)
              return (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {index + 1}. {section.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">{section.points.length} نقطة</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Sections */}
      <div className="space-y-8">
        {termsConditions.sections.map((section, index) => {
          const IconComponent = getSectionIcon(section.title)

          return (
            <Card key={section.id} className="scroll-mt-4">
              <div className="p-6">
                {/* Section Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        البند {index + 1}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.description}</p>
                  </div>
                </div>

                {/* Section Points */}
                {section.points.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      الأحكام التفصيلية
                    </h3>
                    <div className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-600"
                        >
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">{pointIndex + 1}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{point}</p>
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

      {/* Legal Notice */}
      <Card className="mt-8 border-l-4 border-l-red-500">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Gavel className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">إشعار قانوني</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                هذه الشروط والأحكام تشكل اتفاقية قانونية ملزمة بينك وبين الشركة. أي انتهاك لهذه الشروط قد يؤدي إلى اتخاذ
                إجراءات قانونية ضدك وإنهاء حسابك فوراً.
              </p>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-700 font-medium">
                  ⚠️ تنبيه: عدم الامتثال لهذه الشروط قد يؤدي إلى عواقب قانونية
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact and Support */}
      <Card className="mt-8">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">هل لديك أسئلة حول الشروط والأحكام؟</h3>
          <p className="text-gray-600 mb-4">
            إذا كان لديك أي استفسارات حول هذه الشروط والأحكام، يرجى التواصل مع فريقنا القانوني
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:legal@company.com"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              تواصل مع الفريق القانوني
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

      {/* Acceptance Notice */}
      <Card className="mt-8 bg-green-50 border-green-200">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-2">إقرار بالموافقة</h3>
              <p className="text-green-800 leading-relaxed">
                باستمرارك في استخدام خدماتنا، فإنك تؤكد أنك قد قرأت وفهمت ووافقت على جميع الشروط والأحكام المذكورة
                أعلاه. كما تؤكد أنك تبلغ من العمر 18 عاماً على الأقل أو لديك موافقة ولي الأمر لاستخدام خدماتنا.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Last Updated Notice */}
      <div className="text-center py-6 text-sm text-gray-500">
        <p>تم تحديث هذه الشروط والأحكام آخر مرة في {formatDate(termsConditions.updated_at)}</p>
        <p className="mt-1">
          نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسنقوم بإشعارك بأي تغييرات مهمة قبل 30 يوماً من دخولها حيز التنفيذ
        </p>
      </div>
    </div>
  )
}
