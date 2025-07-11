"use client"
import { FileText, Clock, Hash, AlertCircle } from "lucide-react"
import type { TermsConditionsFormData } from "./terms-conditions-form-schema"
import TermsConditionsForm from "./terms-conditions-form"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useTermsConditions, useUpdateTermsConditions } from "../../hooks/use-terms-conditions"
import { formatDate } from "../../lib/date"

export default function TermsConditionsPage() {
  const { data: termsConditions, isLoading, refetch } = useTermsConditions()
  const { mutate: updateTermsConditions, isPending } = useUpdateTermsConditions(() => {
    refetch()
  })

  const handleSubmit = (data: TermsConditionsFormData) => {
    updateTermsConditions({
      title: data.title,
      sections: data.sections,
    })
  }

  // Calculate stats
  const stats = termsConditions
    ? {
        totalSections: termsConditions.sections.length,
        totalPoints: termsConditions.sections.reduce((acc, section) => acc + section.points.length, 0),
        lastUpdated: termsConditions.updated_at,
        averagePointsPerSection:
          termsConditions.sections.length > 0
            ? Math.round(
                termsConditions.sections.reduce((acc, section) => acc + section.points.length, 0) /
                  termsConditions.sections.length,
              )
            : 0,
      }
    : null

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Toolbar title="إدارة الشروط والأحكام" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">جاري تحميل الشروط والأحكام...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!termsConditions) {
    return (
      <div className="space-y-4">
        <Toolbar title="إدارة الشروط والأحكام" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-500">لم يتم العثور على الشروط والأحكام</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Toolbar title="إدارة الشروط والأحكام" />

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

      {/* Terms and Conditions Form */}
      <div className="p-4 rounded-lg">
        <TermsConditionsForm initialData={termsConditions} onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  )
}
