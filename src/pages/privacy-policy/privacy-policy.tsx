"use client"
import { FileText, Clock, Hash, AlertCircle } from "lucide-react"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { usePrivacyPolicy, useUpdatePrivacyPolicy } from "../../hooks/use-privacy-policy"
import { formatDate } from "../../lib/date"
import PrivacyPolicyForm from "./privacy-policy-form"
import { PrivacyPolicyFormData } from "./privacy-policy-schema"


export default function PrivacyPolicyPage() {
  const { data: privacyPolicy, isLoading, refetch } = usePrivacyPolicy()
  const { mutate: updatePrivacyPolicy, isPending } = useUpdatePrivacyPolicy(() => {
    refetch()
  })

  const handleSubmit = (data: PrivacyPolicyFormData) => {
    updatePrivacyPolicy({
      title: data.title,
      sections: data.sections,
    })
  }

  // Calculate stats
  const stats = privacyPolicy
    ? {
        totalSections: privacyPolicy.sections.length,
        totalPoints: privacyPolicy.sections.reduce((acc, section) => acc + section.points.length, 0),
        lastUpdated: privacyPolicy.updated_at,
        averagePointsPerSection:
          privacyPolicy.sections.length > 0
            ? Math.round(
                privacyPolicy.sections.reduce((acc, section) => acc + section.points.length, 0) /
                  privacyPolicy.sections.length,
              )
            : 0,
      }
    : null

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Toolbar title="إدارة سياسة الخصوصية" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">جاري تحميل سياسة الخصوصية...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!privacyPolicy) {
    return (
      <div className="space-y-4">
        <Toolbar title="إدارة سياسة الخصوصية" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-500">لم يتم العثور على سياسة الخصوصية</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Toolbar title="إدارة سياسة الخصوصية" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">عدد الأقسام</p>
              <p className="text-lg font-bold text-primary">{stats?.totalSections}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي النقاط</p>
              <p className="text-lg font-bold text-primary">{stats?.totalPoints}</p>
            </div>
          </div>
        </Card>


        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">آخر تحديث</p>
              <p className="text-lg font-bold text-primary">
                {stats?.lastUpdated ? formatDate(stats.lastUpdated) : "غير محدد"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Privacy Policy Form */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <PrivacyPolicyForm initialData={privacyPolicy} onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  )
}
