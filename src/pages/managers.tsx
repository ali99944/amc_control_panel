"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Shield,
  ShieldCheck,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Settings,
  Clock,
  Calendar,
  Download,
  Eye,
  Ban,
  UserCheck,
  Mail,
  Phone,
  Building,
} from "lucide-react"
import { Manager } from "../types/user-management"
import DataTable, { Column } from "../components/datatable"
import Dropdown from "../components/ui/dropdown"
import Modal from "../components/ui/modal"
import Select from "../components/ui/select"
import { useMutationAction } from "../hooks/queries-actions"


const mockManagers: Manager[] = [
  {
    id: "1",
    name: "محمد أحمد علي",
    email: "mohamed@amc.com",
    phone: "+966501234567",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastActive: "2024-01-20",
    permissions: [],
    assignedBy: "super_admin",
    department: "إدارة المحتوى",
    notes: "مسؤول عن إدارة الأغاني والفنانين",
  },
  {
    id: "2",
    name: "سارة حسن محمد",
    email: "sara@amc.com",
    phone: "+966507654321",
    role: "admin",
    status: "active",
    joinDate: "2024-01-05",
    lastActive: "2024-01-19",
    permissions: [],
    assignedBy: "super_admin",
    department: "إدارة المستخدمين",
    notes: "مسؤولة عن دعم المستخدمين والاشتراكات",
  },
  {
    id: "3",
    name: "أحمد علي حسن",
    email: "ahmed@amc.com",
    phone: "+966512345678",
    role: "admin",
    status: "suspended",
    joinDate: "2023-11-15",
    lastActive: "2024-01-10",
    permissions: [],
    assignedBy: "super_admin",
    department: "التحليلات",
    notes: "معلق مؤقتاً لمراجعة الصلاحيات",
  },
]

export default function ManagersPage() {
  const [managers] = useState<Manager[]>(mockManagers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null)

  // API Hooks
//   const { data: managersData, isLoading } = useGetQuery<Manager[]>({
//     key: ["managers"],
//     url: "/api/managers",
//   })

  const deleteManagerMutation = useMutationAction<void, string>({
    method: "delete",
    url: "/api/managers",
    key: ["managers"],
    onSuccessCallback: () => {
      setShowDeleteModal(false)
      setSelectedManager(null)
    },
  })

  const updateManagerStatusMutation = useMutationAction<Manager, { id: string; status: string }>({
    method: "patch",
    url: "/api/managers/status",
    key: ["managers"],
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <ShieldCheck size={16} className="text-red-500" />
      case "admin":
        return <Shield size={16} className="text-primary" />
      default:
        return <Shield size={16} className="text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-primary/20 text-primary",
      inactive: "bg-gray-500/20 text-gray-600",
      suspended: "bg-yellow-500/20 text-yellow-600",
    }
    const labels = {
      active: "نشط",
      inactive: "غير نشط",
      suspended: "معلق",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const handleDeleteManager = (manager: Manager) => {
    setSelectedManager(manager)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedManager) {
      deleteManagerMutation.mutate(selectedManager.id)
    }
  }

  const handleStatusChange = (managerId: string, newStatus: string) => {
    updateManagerStatusMutation.mutate({ id: managerId, status: newStatus })
  }

  const columns: Column<Manager>[] = [
    {
      key: "name",
      title: "المدير",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center ml-3">
            {row.avatar ? (
              <img src={row.avatar || "/placeholder.svg"} alt={value} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <Shield size={20} className="text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{value}</span>
              <span className="mr-2">{getRoleIcon(row.role)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <Mail size={14} />
              {row.email}
            </div>
            {row.phone && (
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <Phone size={14} />
                {row.phone}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "department",
      title: "القسم",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Building size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value || "غير محدد"}</span>
        </div>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "joinDate",
      title: "تاريخ التعيين",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "lastActive",
      title: "آخر نشاط",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Clock size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <Link
            to={`/control-panel/managers/${row.id}`}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </Link>
          <Link
            to={`/control-panel/managers/edit/${row.id}`}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </Link>
          <Link
            to={`/control-panel/managers/permissions/${row.id}`}
            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings size={16} />
          </Link>
          <Dropdown
            trigger={
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal size={16} />
              </button>
            }
            items={[
              {
                label: row.status === "active" ? "تعليق المدير" : "تفعيل المدير",
                icon: row.status === "active" ? <Ban /> : <UserCheck />,
                onClick: () => handleStatusChange(row.id, row.status === "active" ? "suspended" : "active"),
              },
              {
                label: "حذف المدير",
                icon: <Trash2 size={20} />,
                onClick: () => handleDeleteManager(row),
                destructive: true,
              },
            ]}
          />
        </div>
      ),
    },
  ]

  const filteredManagers = managers.filter((manager) => {
    const matchesSearch =
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (manager.department && manager.department.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = filterRole === "all" || manager.role === filterRole
    const matchesStatus = filterStatus === "all" || manager.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || manager.department === filterDepartment
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment
  })

  const stats = [
    {
      label: "إجمالي المدراء",
      value: managers.length.toLocaleString(),
      icon: Shield,
      color: "text-primary",
    },
    {
      label: "المدراء النشطون",
      value: managers.filter((m) => m.status === "active").length.toLocaleString(),
      icon: UserCheck,
      color: "text-primary",
    },
    {
      label: "المدراء العامون",
      value: managers.filter((m) => m.role === "super_admin").length.toLocaleString(),
      icon: ShieldCheck,
      color: "text-red-500",
    },
    {
      label: "المدراء المعلقون",
      value: managers.filter((m) => m.status === "suspended").length.toLocaleString(),
      icon: Ban,
      color: "text-yellow-500",
    },
  ]

  const departments = [...new Set(managers.map((m) => m.department).filter(Boolean))]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#1ed760] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة المدراء</h1>
            <p className="text-white/80">إدارة المدراء والصلاحيات في مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            <UserPlus size={20} className="ml-2" />
            إضافة مدير جديد
          </button>
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

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن المدراء..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select
              value={filterRole}
              onChange={setFilterRole}
              options={[
                { value: "all", label: "جميع الأدوار" },
                { value: "admin", label: "مدير" },
                { value: "super_admin", label: "مدير عام" },
              ]}
            />
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                { value: "all", label: "جميع الحالات" },
                { value: "active", label: "نشط" },
                { value: "inactive", label: "غير نشط" },
                { value: "suspended", label: "معلق" },
              ]}
            />
            <Select
              value={filterDepartment}
              onChange={setFilterDepartment}
              options={[
                { value: "all", label: "جميع الأقسام" },
                ...departments.map((dept) => ({ value: dept!, label: dept! })),
              ]}
            />
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1ed760] transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Managers Table */}
      <DataTable
        data={filteredManagers}
        columns={columns}
        pageSize={10}
        className="bg-white border-gray-200"
        emptyState={
          <div className="p-8 text-center">
            <Shield size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مدراء</h3>
            <p className="text-gray-500">لم يتم العثور على مدراء مطابقين لمعايير البحث</p>
          </div>
        }
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="تأكيد حذف المدير" size="md">
        <div className="space-y-4">
          <p className="text-gray-700">
            هل أنت متأكد من حذف المدير <strong>{selectedManager?.name}</strong>؟ هذا الإجراء لا يمكن التراجع عنه وسيتم
            إلغاء جميع صلاحياته.
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={confirmDelete}
              disabled={deleteManagerMutation.isPending}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {deleteManagerMutation.isPending ? "جاري الحذف..." : "حذف"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
