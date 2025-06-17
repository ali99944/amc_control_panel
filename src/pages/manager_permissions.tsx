"use client"

import { useState } from "react"
import { Shield, ShieldCheck, Users, Music, BarChart3, Settings, DollarSign, Plus, Search, Edit, Trash2, Check, X } from 'lucide-react'
import { MANAGER_PERMISSIONS, Permission, PERMISSIONS, Role, ROLES } from "../constants/app_permissions"
import DataTable, { Column } from "../components/datatable"
import Select from "../components/ui/select"


export default function PermissionsPage() {
  const [activeTab, setActiveTab] = useState<"permissions" | "roles" | "manager-permissions">("permissions")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [selectedManagerId, setSelectedManagerId] = useState<string>("1")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "users":
        return <Users size={16} className="text-blue-500" />
      case "content":
        return <Music size={16} className="text-primary" />
      case "analytics":
        return <BarChart3 size={16} className="text-purple-500" />
      case "system":
        return <Settings size={16} className="text-gray-500" />
      case "financial":
        return <DollarSign size={16} className="text-yellow-500" />
      default:
        return <Shield size={16} className="text-gray-400" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const styles = {
      users: "bg-blue-500/20 text-blue-600",
      content: "bg-primary/20 text-primary",
      analytics: "bg-purple-500/20 text-purple-600",
      system: "bg-gray-500/20 text-gray-600",
      financial: "bg-yellow-500/20 text-yellow-600",
    }
    const labels = {
      users: "المستخدمين",
      content: "المحتوى",
      analytics: "الإحصائيات",
      system: "النظام",
      financial: "المالية",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category as keyof typeof styles]}`}>
        {labels[category as keyof typeof labels]}
      </span>
    )
  }

  const getActionTypeBadge = (type: string) => {
    const styles = {
      create: "bg-green-500/20 text-green-600",
      read: "bg-blue-500/20 text-blue-600",
      update: "bg-yellow-500/20 text-yellow-600",
      delete: "bg-red-500/20 text-red-600",
      manage: "bg-purple-500/20 text-purple-600",
    }
    const labels = {
      create: "إنشاء",
      read: "عرض",
      update: "تعديل",
      delete: "حذف",
      manage: "إدارة",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    )
  }

  const hasPermission = (permissionId: string, managerId: string) => {
    return MANAGER_PERMISSIONS[managerId]?.includes(permissionId) || false
  }

  const permissionColumns: Column<Permission>[] = [
    {
      key: "name",
      title: "الصلاحية",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center ml-3">
            {getCategoryIcon(row.category)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "الفئة",
      sortable: true,
      render: (value) => getCategoryBadge(value),
    },
    {
      key: "actions",
      title: "الإجراءات المتاحة",
      render: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.actions.slice(0, 3).map((action) => (
            <div key={action.id}>{getActionTypeBadge(action.type)}</div>
          ))}
          {row.actions.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{row.actions.length - 3} المزيد
            </span>
          )}
        </div>
      ),
    },
    {
      key: "actionsCount",
      title: "عدد الإجراءات",
      sortable: true,
      render: (_, row) => (
        <span className="text-gray-900 font-medium">{row.actions.length}</span>
      ),
    },
    {
      key: "controls",
      title: "التحكم",
      render: () => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  const roleColumns: Column<Role>[] = [
    {
      key: "name",
      title: "الدور",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center ml-3">
            {row.isSystem ? (
              <ShieldCheck size={20} className="text-white" />
            ) : (
              <Shield size={20} className="text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{value}</span>
              {row.isSystem && (
                <span className="mr-2 px-2 py-1 bg-red-500/20 text-red-600 rounded-full text-xs">نظام</span>
              )}
            </div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "permissions",
      title: "الصلاحيات",
      render: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.permissions.slice(0, 2).map((permission) => (
            <div key={permission.id}>{getCategoryBadge(permission.category)}</div>
          ))}
          {row.permissions.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{row.permissions.length - 2} المزيد
            </span>
          )}
        </div>
      ),
    },
    {
      key: "permissionsCount",
      title: "عدد الصلاحيات",
      sortable: true,
      render: (_, row) => (
        <span className="text-gray-900 font-medium">{row.permissions.length}</span>
      ),
    },
    {
      key: "controls",
      title: "التحكم",
      render: (_, row) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
          {!row.isSystem && (
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    },
  ]

  const managerPermissionColumns: Column<Permission>[] = [
    {
      key: "name",
      title: "الصلاحية",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center ml-3">
            {getCategoryIcon(row.category)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "الفئة",
      sortable: true,
      render: (value) => getCategoryBadge(value),
    },
    {
      key: "status",
      title: "الحالة",
      render: (_, row) => {
        const hasAccess = hasPermission(row.id, selectedManagerId)
        return (
          <div className="flex items-center">
            {hasAccess ? (
              <div className="flex items-center text-green-600">
                <Check size={16} className="ml-1" />
                <span className="text-sm font-medium">مُفعل</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <X size={16} className="ml-1" />
                <span className="text-sm font-medium">غير مُفعل</span>
              </div>
            )}
          </div>
        )
      },
    },
    {
      key: "actions",
      title: "الإجراءات المتاحة",
      render: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.actions.map((action) => {
            const hasAccess = hasPermission(row.id, selectedManagerId)
            return (
              <div
                key={action.id}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  hasAccess
                    ? "bg-green-500/20 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {action.name}
              </div>
            )
          })}
        </div>
      ),
    },
    {
      key: "controls",
      title: "التحكم",
      render: (_, row) => {
        const hasAccess = hasPermission(row.id, selectedManagerId)
        return (
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              hasAccess
                ? "bg-red-500/20 text-red-600 hover:bg-red-500/30"
                : "bg-green-500/20 text-green-600 hover:bg-green-500/30"
            }`}
          >
            {hasAccess ? "إلغاء" : "تفعيل"}
          </button>
        )
      },
    },
  ]

  const filteredPermissions = PERMISSIONS.filter((permission) => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || permission.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const filteredRoles = ROLES.filter((role) => {
    return role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           role.description.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const stats = [
    {
      label: "إجمالي الصلاحيات",
      value: PERMISSIONS.length.toLocaleString(),
      icon: Shield,
      color: "text-primary",
    },
    {
      label: "الأدوار المخصصة",
      value: ROLES.filter(r => !r.isSystem).length.toLocaleString(),
      icon: ShieldCheck,
      color: "text-blue-500",
    },
    {
      label: "أدوار النظام",
      value: ROLES.filter(r => r.isSystem).length.toLocaleString(),
      icon: Settings,
      color: "text-gray-500",
    },
    {
      label: "فئات الصلاحيات",
      value: [...new Set(PERMISSIONS.map(p => p.category))].length.toLocaleString(),
      icon: BarChart3,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#1ed760] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الصلاحيات والأدوار</h1>
            <p className="text-white/80">إدارة صلاحيات المدراء وأدوارهم في النظام</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
              <Plus size={20} className="ml-2" />
              إضافة صلاحية
            </button>
            <button className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
              <Plus size={20} className="ml-2" />
              إضافة دور
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("permissions")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "permissions"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              الصلاحيات
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "roles"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              الأدوار
            </button>
            <button
              onClick={() => setActiveTab("manager-permissions")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "manager-permissions"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              صلاحيات المدراء
            </button>
          </nav>
        </div>

        {/* Filters and Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "permissions" 
                      ? "البحث في الصلاحيات..." 
                      : activeTab === "roles"
                      ? "البحث في الأدوار..."
                      : "البحث في صلاحيات المدراء..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-4">
              {activeTab === "permissions" && (
                <Select
                  value={filterCategory}
                  onChange={setFilterCategory}
                  options={[
                    { value: "all", label: "جميع الفئات" },
                    { value: "users", label: "المستخدمين" },
                    { value: "content", label: "المحتوى" },
                    { value: "analytics", label: "الإحصائيات" },
                    { value: "system", label: "النظام" },
                    { value: "financial", label: "المالية" },
                  ]}
                />
              )}
              {activeTab === "manager-permissions" && (
                <Select
                  value={selectedManagerId}
                  onChange={setSelectedManagerId}
                  options={[
                    { value: "1", label: "مدير المحتوى" },
                    { value: "2", label: "مدير المستخدمين" },
                    { value: "3", label: "المدير العام" },
                    { value: "4", label: "مدير الدعم" },
                  ]}
                />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "permissions" ? (
            <DataTable
              data={filteredPermissions}
              columns={permissionColumns}
              pageSize={10}
              className="bg-transparent border-transparent"
              emptyState={
                <div className="p-8 text-center">
                  <Shield size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد صلاحيات</h3>
                  <p className="text-gray-500">لم يتم العثور على صلاحيات مطابقة لمعايير البحث</p>
                </div>
              }
            />
          ) : activeTab === "roles" ? (
            <DataTable
              data={filteredRoles}
              columns={roleColumns}
              pageSize={10}
              className="bg-transparent border-transparent"
              emptyState={
                <div className="p-8 text-center">
                  <ShieldCheck size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أدوار</h3>
                  <p className="text-gray-500">لم يتم العثور على أدوار مطابقة لمعايير البحث</p>
                </div>
              }
            />
          ) : (
            <DataTable
              data={filteredPermissions}
              columns={managerPermissionColumns}
              pageSize={10}
              className="bg-transparent border-transparent"
              emptyState={
                <div className="p-8 text-center">
                  <Users size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد صلاحيات</h3>
                  <p className="text-gray-500">لم يتم العثور على صلاحيات للمدير المحدد</p>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
