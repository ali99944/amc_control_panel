"use client"

import { useManagers } from "../../hooks/use-managers"
import { Users, UserCheck, UserX, Shield } from "lucide-react"
import DataTable from "../../components/datatable"
import Card from "../../components/ui/card"
import { CreateManagerDialog } from "./create-manager-dialog"
import { DeleteManagerDialog } from "./delete-manager-dialog"
import { ManagerPermissionsDialog } from "./manager-permissions-dialog"
import { UpdateManagerDialog } from "./update-manager-dialog"
import Avatar from "../../components/ui/avatar"
import { formatDate } from "../../lib/date"
import { useNavigate } from "react-router-dom"
import { Manager } from "../../types/manager"
import Toolbar from "../../components/ui/toolbar"
import { Badge } from "../../components/ui/badge"


export default function ManagersPage() {
  const { managers, isLoading } = useManagers()

  console.log(managers);
  

  const navigate = useNavigate()

  // Navigate to permissions page
  const handleOpenPermissionsPage = (managerId: number) => {
    navigate(`/managers/${managerId}/permissions`)
  }



  // Calculate statistics
  const stats = {
    total: managers.length,
    active: managers.filter((m) => m.is_active).length,
    admins: managers.filter((m) => m.role === "admin").length,
    superAdmins: managers.filter((m) => m.role === "super_admin").length,
  }

  const columns = [
    {
      key: "name",
      title: "المدير",
      render: (_: null, manager: Manager) => (
        <div className="flex items-center gap-x-3">
          <Avatar 
              src={manager.profile_picture ?? ''}
            />
          <div>
            <div className="font-medium text-gray-900">{manager.name}</div>
            <div className="text-sm text-gray-500">{manager.username}</div>
          </div>
        </div>
      ),
    },

    {
      key: "role",
      title: "الدور",
      render: (_: null, manager: Manager) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            manager.role === "super_admin" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
          }`}
        >
          {manager.role === "super_admin" ? "مدير عام" : "مدير"}
        </span>
      ),
    },
    {
      key: "permissions",
      title: "الصلاحيات",
      render: (_: null ,manager: Manager) => (
        <div className="text-sm text-gray-900">
          {
            manager.role == 'super_admin' ? (
              <Badge>جميع الصلاحيات</Badge>
            ): (
              `${(manager?.manager_permissions ?? []).length} صلاحية`
            )
          }
        </div>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      render: (_: null, manager: Manager) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            manager?.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {manager?.is_active ? (
            <>
              <UserCheck className="w-3 h-3 ml-1" />
              نشط
            </>
          ) : (
            <>
              <UserX className="w-3 h-3 ml-1" />
              غير نشط
            </>
          )}
        </span>
      ),
    },
    {
      key: "last_login",
      title: "آخر تسجيل دخول",
      render: (_: null, manager: Manager) => (
        <div className="text-sm text-gray-500">
          {manager?.last_login ? new Date(manager?.last_login).toLocaleDateString("ar-SA") : "لم يسجل دخول بعد"}
        </div>
      ),
    },
    {
      key: "created_at",
      title: "تاريخ الإنشاء",
      render: (manager: Manager) => (
        <div className="text-sm text-gray-500">{formatDate(manager.created_at)}</div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_: null, manager: Manager) => (
        <div className="flex items-center gap-x-2 space-x-reverse">
          <ManagerPermissionsDialog manager={manager} onOpenPermissionsPage={handleOpenPermissionsPage} />
          <UpdateManagerDialog manager={manager} />
          <DeleteManagerDialog manager={manager} />
        </div>
      ),
    },
  ]
  

  return (
    <div className="space-y-4">

      <Toolbar title="إدارة المديرين">
        <CreateManagerDialog />
      </Toolbar>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card >
          <div className="flex items-center">
            <div className="p-2 bg-primary rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي المديرين</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card >
          <div className="flex items-center">
            <div className="p-2 bg-primary rounded-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المديرين النشطين</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card >
          <div className="flex items-center">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المديرين</p>
              <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
            </div>
          </div>
        </Card>

        <Card >
          <div className="flex items-center">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المديرين العامين</p>
              <p className="text-2xl font-bold text-gray-900">{stats.superAdmins}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <DataTable
          data={managers}
          columns={columns}
          loading={isLoading}
          // selectedItems={selectedManagers}
          // onSelectionChange={setSelectedManagers}
          emptyState="لا توجد مديرين"
        />
    </div>
  )
}
