"use client"

import { useManagers } from "../../hooks/use-managers"
import { Users, UserCheck, UserX, Shield, Crown } from "lucide-react"
import DataTable from "../../components/datatable"
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
import StatisticCard from "../../components/ui-components/statistic-card"
import Popover from "../../components/ui/popover"
import Card from "../../components/ui/card"
import { PERMISSION_CATEGORIES, PERMISSION_LABELS } from "../../lib/permission"
import { ManagerPermission } from "../../types/permission"


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
              <Badge className="gap-2 w-fit">
                <Crown className="w-3 h-3" />
                <span className="text-xs">جميع الصلاحيات</span>
              </Badge>
            ): (
              <Popover content={<PermissionsPopover manager={manager} />}>
                <Badge variant="secondary">
                  {(manager?.manager_permissions ?? []).length} صلاحية
                </Badge>
              </Popover>
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
          {
            manager.role == 'admin' && (
              <ManagerPermissionsDialog manager={manager} onOpenPermissionsPage={handleOpenPermissionsPage} />
            )
          }
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
        <StatisticCard
          stat={{
            icon: Users,
            name: 'إجمالي المديرين',
            value: stats.total,
          }}
        />

        <StatisticCard
          stat={{
            icon: UserCheck,
            name: 'المديرين النشطين',
            value: stats.active,
          }}
        />

        <StatisticCard
          stat={{
            icon: Shield,
            name: 'المديرين',
            value: stats.admins,
          }}
        />

        <StatisticCard
          stat={{
            icon: Shield,
            name: 'المديرين العامين',
            value: stats.superAdmins,
          }}
        />
      </div>

      {/* <ManagerFiltersComponent 
        filters={{}}
        onClearFilters={() => {}}
        onFiltersChange={() => {}}
      /> */}

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

interface PermissionsPopoverProps {
  manager: Manager
}

function PermissionsPopover({ manager }: PermissionsPopoverProps) {
  // Group permissions by category for better organization
  const groupedPermissions = manager.manager_permissions.reduce((acc, perm) => {
    // Extract category from permission name (e.g., "genre_create" -> "genre")
    const category = perm.name.split('_')[0].toUpperCase()
    
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(perm)
    return acc
  }, {} as Record<string, ManagerPermission[]>)

  return (
    <Card className="w-80 max-h-60 overflow-y-auto custom-scroll border border-gray-300">
      <div className="space-y-4">
        {Object.keys(groupedPermissions).length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">لا توجد صلاحيات محددة</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-gray-900">
                صلاحيات {manager.name}
              </h3>
            </div>

            {/* Permissions by category */}
            {Object.entries(groupedPermissions).map(([category, permissions]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700  pr-2">
                  {PERMISSION_CATEGORIES[category] || category}
                </h4>
                <div className="space-y-1 mr-4">
                  {permissions.map((perm) => (
                    <div
                      key={perm.id}
                      className="flex items-center gap-2 text-sm text-gray-600 py-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{PERMISSION_LABELS[perm.name] || perm.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer with count */}
            <div className="border-t border-gray-200 pt-3 mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>إجمالي الصلاحيات</span>
                <Badge variant="default" className="text-xs">
                  {manager.manager_permissions.length}
                </Badge>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}