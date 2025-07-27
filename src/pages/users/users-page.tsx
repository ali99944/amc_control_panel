"use client"

import { useState } from "react"
import { Users, UserCheck, UserX, ShieldOff, Trash2, Calendar, Phone } from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useUsers } from "../../hooks/use-users"
import User from "../../types/user"
import BanUserDialog from "./ban-user-dialog"
import DeleteUserDialog from "./delete-user-dialog"
import { formatDate } from "../../lib/date"
// import UserFiltersComponent from "./users-filter"


export default function UsersPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Fetch users data
  const { data: users = [], isLoading, refetch } = useUsers()

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.is_active && !u.is_banned).length,
    banned: users.filter((u) => u.is_banned).length,
    inactive: users.filter((u) => !u.is_active).length,
    withPhone: users.filter((u) => u.phone_number).length,
    recentlyJoined: users.filter((u) => {
      const joinDate = new Date(u.joined_at)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return joinDate > thirtyDaysAgo
    }).length,
  }

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  // Handle ban/unban user
  // const handleBanUser = (user: User) => {
  //   setSelectedUser(user)
  //   setIsBanDialogOpen(true)
  // }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }


  // Format relative time helper
  const formatRelativeTime = (dateString: string | null) => {
    if (!dateString) return "لم يسجل دخول"

    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "من�� أقل من ساعة"
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `منذ ${diffInDays} يوم`

    return formatDate(dateString)
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
        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
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
        <div>
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
        <div className="text-sm">
          <div className="text-gray-900">{value === "male" ? "ذكر" : value === "female" ? "أنثى" : "غير محدد"}</div>
          <div className="text-gray-500">{calculateAge(row.birth_date)} سنة</div>
        </div>
      ),
    },
    {
      key: "is_active",
      title: "الحالة",
      width: "120px",
      render: (value: boolean, row: User) => {
        if (row.is_banned) {
          return (
            <div className="flex items-center gap-2">
              <ShieldOff className="w-4 h-4 text-red-600" />
              <span className="text-red-600 text-sm font-medium">محظور</span>
            </div>
          )
        }

        return (
          <div className="flex items-center gap-2">
            {value ? (
              <>
                <UserCheck className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm">نشط</span>
              </>
            ) : (
              <>
                <UserX className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">غير نشط</span>
              </>
            )}
          </div>
        )
      },
    },
    {
      key: "joined_at",
      title: "تاريخ الانضمام",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">
          <div className="text-gray-900">{formatDate(value)}</div>
        </div>
      ),
    },
    {
      key: "last_login_time",
      title: "آخر تسجيل دخول",
      sortable: true,
      render: (value: string | null) => <div className="text-sm text-gray-600">{formatRelativeTime(value)}</div>,
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "140px",
      render: (_, row: User) => (
        <div className="flex items-center gap-2">
          {/* <Button
            size="sm"
            variant={row.is_banned ? "primary" : "secondary"}
            onClick={() => handleBanUser(row)}
            title={row.is_banned ? "إلغاء الحظر" : "حظر المستخدم"}
          >
            {row.is_banned ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
          </Button> */}
          <Button size="sm" variant="danger" onClick={() => handleDeleteUser(row)} title="حذف المستخدم">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة المستخدمين">
        <div className="flex items-center gap-2 text-white/90 text-sm">
          <Users className="w-4 h-4" />
          <span>إجمالي: {stats.total} مستخدم</span>
        </div>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي المستخدمين</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">المستخدمين النشطين</p>
              <p className="text-lg font-bold text-primary">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <ShieldOff className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">المحظورين</p>
              <p className="text-lg font-bold text-primary">{stats.banned}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">غير النشطين</p>
              <p className="text-lg font-bold text-primary">{stats.inactive}</p>
            </div>
          </div>
        </Card>


        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">انضموا مؤخراً</p>
              <p className="text-lg font-bold text-primary">{stats.recentlyJoined}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* <UserFiltersComponent 
        filters={{}}
        onClearFilters={() => {}}
        onFiltersChange={() => {}}
      /> */}

      {/* Users Table */}
      <DataTable
        data={users}
        columns={columns}
        loading={isLoading}
        pageSize={5}
        searchable
        exportable
        emptyState={
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا يوجد مستخدمين</p>
            <p className="text-sm text-gray-400 mt-2">سيظهر المستخدمين هنا عند تسجيلهم في التطبيق</p>
          </div>
        }
      />

      {/* Dialogs */}
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        user={selectedUser}
        onSuccess={handleDialogSuccess}
      />

      <BanUserDialog
        isOpen={isBanDialogOpen}
        onClose={() => setIsBanDialogOpen(false)}
        user={selectedUser}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
