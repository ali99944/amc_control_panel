"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Users, UserPlus, Search, MoreHorizontal, Edit, Trash2, Shield, ShieldCheck, Music, ListMusic, Clock, Calendar, Download, Eye, Ban, UserCheck, Globe, Phone, Mail } from 'lucide-react'
import DataTable, { Column } from "../../components/datatable"
import Dropdown from "../../components/ui/dropdown"
import Modal from "../../components/ui/modal"
import Select from "../../components/ui/select"
import { useMutationAction } from "../../hooks/queries-actions"
import { User } from "../../types/user-management"

const mockUsers: User[] = [
  {
    id: "1",
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    role: "premium",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    songsPlayed: 1250,
    playlistsCreated: 12,
    subscriptionType: "premium",
    country: "السعودية",
    dateOfBirth: "1990-05-15",
    gender: "male",
    preferences: {
      language: "ar",
      notifications: true,
      publicProfile: true,
    },
    statistics: {
      totalListeningTime: 45600,
      favoriteGenres: ["طرب", "بوب"],
      deviceCount: 3,
    },
  },
  {
    id: "2",
    name: "فاطمة علي حسن",
    email: "fatima@example.com",
    phone: "+966507654321",
    role: "user",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    songsPlayed: 890,
    playlistsCreated: 8,
    subscriptionType: "free",
    country: "الإمارات",
    dateOfBirth: "1995-08-22",
    gender: "female",
    preferences: {
      language: "ar",
      notifications: false,
      publicProfile: false,
    },
    statistics: {
      totalListeningTime: 23400,
      favoriteGenres: ["كلاسيكي", "فولكلور"],
      deviceCount: 2,
    },
  },
  {
    id: "3",
    name: "محمد حسن أحمد",
    email: "mohamed@example.com",
    phone: "+966512345678",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastActive: "2024-01-20",
    songsPlayed: 2340,
    playlistsCreated: 25,
    subscriptionType: "family",
    country: "مصر",
    dateOfBirth: "1988-03-10",
    gender: "male",
    preferences: {
      language: "ar",
      notifications: true,
      publicProfile: true,
    },
    statistics: {
      totalListeningTime: 78900,
      favoriteGenres: ["طرب", "تراثي"],
      deviceCount: 4,
    },
  },
]

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterSubscription, setFilterSubscription] = useState<string>("all")
  const [, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // API Hooks
  // const { data: usersData, isLoading } = useGetQuery<User[]>({
  //   key: ["users"],
  //   url: "/api/users",
  // })

  const deleteUserMutation = useMutationAction<void, string>({
    method: "delete",
    url: "/api/users",
    key: ["users"],
    onSuccessCallback: () => {
      setShowDeleteModal(false)
      setSelectedUser(null)
    },
  })

  const updateUserStatusMutation = useMutationAction<User, { id: string; status: string }>({
    method: "patch",
    url: "/api/users/status",
    key: ["users"],
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <ShieldCheck size={16} className="text-primary" />
      case "super_admin":
        return <Shield size={16} className="text-red-500" />
      case "premium":
        return <Shield size={16} className="text-yellow-500" />
      default:
        return <Users size={16} className="text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-primary/20 text-primary",
      inactive: "bg-gray-500/20 text-gray-600",
      suspended: "bg-yellow-500/20 text-yellow-600",
      banned: "bg-red-500/20 text-red-600",
    }
    const labels = {
      active: "نشط",
      inactive: "غير نشط",
      suspended: "معلق",
      banned: "محظور",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getSubscriptionBadge = (type: string) => {
    const styles = {
      free: "bg-gray-500/20 text-gray-600",
      premium: "bg-primary/20 text-primary",
      family: "bg-blue-500/20 text-blue-600",
    }
    const labels = {
      free: "مجاني",
      premium: "مميز",
      family: "عائلي",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    )
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUserMutation.mutate(selectedUser.id)
    }
  }

  const handleStatusChange = (userId: string, newStatus: string) => {
    updateUserStatusMutation.mutate({ id: userId, status: newStatus })
  }

  const columns: Column<User>[] = [
    {
      key: "name",
      title: "المستخدم",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center ml-3">
            {row.avatar ? (
              <img src={row.avatar || "/placeholder.svg"} alt={value} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <Users size={20} className="text-white" />
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
      key: "status",
      title: "الحالة",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "subscriptionType",
      title: "نوع الاشتراك",
      sortable: true,
      render: (value) => getSubscriptionBadge(value),
    },
    {
      key: "country",
      title: "البلد",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Globe size={16} className="text-gray-400 ml-1" />
          <span className="text-gray-700">{value || "غير محدد"}</span>
        </div>
      ),
    },
    {
      key: "songsPlayed",
      title: "الأغاني المُشغلة",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Music size={16} className="text-primary ml-1" />
          <span className="text-gray-900">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "playlistsCreated",
      title: "قوائم التشغيل",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <ListMusic size={16} className="text-primary ml-1" />
          <span className="text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "joinDate",
      title: "تاريخ الانضمام",
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
            to={`/control-panel/users/${row.id}`}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </Link>
          <Link
            to={`/control-panel/users/edit/${row.id}`}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </Link>
          <Dropdown
            trigger={
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal size={16} />
              </button>
            }
            items={[
              {
                label: row.status === "active" ? "تعليق المستخدم" : "تفعيل المستخدم",
                icon: row.status === "active" ? <Ban /> : <UserCheck />,
                onClick: () => handleStatusChange(row.id, row.status === "active" ? "suspended" : "active"),
              },
              {
                label: "حذف المستخدم",
                icon: <Trash2 />,
                onClick: () => handleDeleteUser(row),
                destructive: true,
              },
            ]}
          />
        </div>
      ),
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    const matchesSubscription = filterSubscription === "all" || user.subscriptionType === filterSubscription
    return matchesSearch && matchesRole && matchesStatus && matchesSubscription
  })

  const stats = [
    {
      label: "إجمالي المستخدمين",
      value: users.length.toLocaleString(),
      icon: Users,
      color: "text-primary",
    },
    {
      label: "المستخدمون النشطون",
      value: users.filter((u) => u.status === "active").length.toLocaleString(),
      icon: UserCheck,
      color: "text-primary",
    },
    {
      label: "المشتركون المميزون",
      value: users.filter((u) => u.subscriptionType === "premium").length.toLocaleString(),
      icon: Shield,
      color: "text-yellow-500",
    },
    {
      label: "المدراء",
      value: users.filter((u) => u.role === "admin" || u.role === "super_admin").length.toLocaleString(),
      icon: ShieldCheck,
      color: "text-blue-500",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#1ed760] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة المستخدمين</h1>
            <p className="text-white/80">إدارة وتتبع جميع مستخدمي مركز علي الإعلامي</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            <UserPlus size={20} className="ml-2" />
            إضافة مستخدم جديد
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
                placeholder="البحث عن المستخدمين..."
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
                { value: "user", label: "مستخدم" },
                { value: "premium", label: "مميز" },
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
                { value: "banned", label: "محظور" },
              ]}
            />
            <Select
              value={filterSubscription}
              onChange={setFilterSubscription}
              options={[
                { value: "all", label: "جميع الاشتراكات" },
                { value: "free", label: "مجاني" },
                { value: "premium", label: "مميز" },
                { value: "family", label: "عائلي" },
              ]}
            />
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1ed760] transition-colors">
              <Download size={16} className="ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        pageSize={10}
        className="bg-white border-gray-200"
        emptyState={
          <div className="p-8 text-center">
            <Users size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مستخدمين</h3>
            <p className="text-gray-500">لم يتم العثور على مستخدمين مطابقين لمعايير البحث</p>
          </div>
        }
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تأكيد حذف المستخدم"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            هل أنت متأكد من حذف المستخدم <strong>{selectedUser?.name}</strong>؟ هذا الإجراء لا يمكن التراجع عنه.
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
              disabled={deleteUserMutation.isPending}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {deleteUserMutation.isPending ? "جاري الحذف..." : "حذف"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
