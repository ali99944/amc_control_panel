"use client"

import { useState } from "react"
import { Users, RotateCcw, Calendar, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import DataTable, { Column } from "../../../components/datatable"
import Button from "../../../components/ui/button"
import Toolbar from "../../../components/ui/toolbar"
import { useDeletedUsers } from "../../../hooks/use-users"
import User from "../../../types/user"
import RestoreUserDialog from "./restore_user_dialog"
import { formatDate } from "../../../lib/date"
import StatisticCard from "../../../components/ui-components/statistic-card"

export default function DeletedUsersPage() {
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Fetch deleted users data
  const { data: deletedUsers = [], isLoading, refetch } = useDeletedUsers()

  // Calculate stats
  const stats = {
    total: deletedUsers.length,
    deletedThisMonth: deletedUsers.filter((u) => {
      const deleteDate = new Date(u.deleted_at || u.joined_at) // fallback to joined_at if deleted_at doesn't exist
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return deleteDate > thirtyDaysAgo
    }).length,
    withPhone: deletedUsers.filter((u) => u.phone_number).length,
  }

  // Handle restore user
  const handleRestoreUser = (user: User) => {
    setSelectedUser(user)
    setIsRestoreDialogOpen(true)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // Calculate age helper
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  // DataTable columns
  const columns: Column<User>[] = [
    {
      key: "profile_picture",
      title: "الصورة",
      width: "80px",
      render: (value: string | null, row: User) => (
        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden opacity-60">
          {value ? (
            <img src={value || "/placeholder.svg"} alt={row.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      title: "المستخدم",
      sortable: true,
      render: (value: string, row: User) => (
        <div className="opacity-75">
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
          {row.phone_number && (
            <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <Phone className="w-3 h-3" />
              {row.phone_number}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "gender",
      title: "المعلومات",
      render: (value: string, row: User) => (
        <div className="text-sm opacity-75">
          <div className="text-gray-900">{value === "male" ? "ذكر" : value === "female" ? "أنثى" : "غير محدد"}</div>
          <div className="text-gray-500">{calculateAge(row.birth_date)} سنة</div>
        </div>
      ),
    },
    {
      key: "joined_at",
      title: "تاريخ الانضمام",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm opacity-75">
          <div className="text-gray-900">{formatDate(value)}</div>
        </div>
      ),
    },
    {
      key: "deleted_at",
      title: "تاريخ الحذف",
      sortable: true,
      render: (value: string | null) => (
        <div className="text-sm opacity-75">
          <div className="text-red-600">{value ? formatDate(value) : "غير محدد"}</div>
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "120px",
      render: (_, row: User) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary" onClick={() => handleRestoreUser(row)} title="استعادة المستخدم">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="المستخدمين المحذوفين">
        <Button
          size="sm"
          variant="primary-inverted"
          onClick={() => navigate("/users")}
        >
          <span>العودة للمستخدمين</span>
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticCard 
          stat={{
            icon: Users,
            name: "المستخدمين",
            value: stats.total
          }}
        />
        <StatisticCard 
          stat={{
            icon: Users,
            name: "إجمالي المحذوفين",
            value: stats.total
          }}
        />
        <StatisticCard 
          stat={{
            icon: Calendar,
            name: "محذوف هذا الشهر",
            value: stats.deletedThisMonth
          }}
        />


      </div>

      {/* Deleted Users Table */}
      <DataTable
        data={deletedUsers}
        columns={columns}
        loading={isLoading}
        pageSize={10}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا يوجد مستخدمين محذوفين</p>
            <p className="text-sm text-gray-400 mt-2">سيظهر المستخدمين المحذوفين هنا</p>
          </div>
        }
      />

      {/* Restore Dialog */}
      <RestoreUserDialog
        isOpen={isRestoreDialogOpen}
        onClose={() => setIsRestoreDialogOpen(false)}
        user={selectedUser}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
