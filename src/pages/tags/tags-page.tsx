"use client"
import { useState } from "react"
import { Plus, Hash, Clock, Music, Edit, Trash2, TagIcon } from "lucide-react"
import CreateTagDialog from "./create-tag-dialog"
import UpdateTagDialog from "./update-tag-dialog"
import DeleteTagDialog from "./delete-tag-dialog"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Toolbar from "../../components/ui/toolbar"
import { useTags } from "../../hooks/use-tags"
import { formatDate } from "../../lib/date"
import { Tag } from "../../types/tag"

export default function TagsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  // Fetch tags data
  const { data: tags = [], isLoading, refetch } = useTags()

  // Calculate stats
  const stats = {
    total: tags.length,
    totalUsage: tags.reduce((acc, tag) => acc + (tag._count?.song_tags || 0), 0),
    mostUsed: tags.reduce(
      (prev, current) => ((prev._count?.song_tags || 0) > (current._count?.song_tags || 0) ? prev : current),
      tags[0],
    ),
    averageUsage:
      tags.length > 0 ? Math.round(tags.reduce((acc, tag) => acc + (tag._count?.song_tags || 0), 0) / tags.length) : 0,
  }

  // Handle edit tag
  const handleEditTag = (tag: Tag) => {
    setSelectedTag(tag)
    setIsUpdateDialogOpen(true)
  }

  // Handle delete tag
  const handleDeleteTag = (tag: Tag) => {
    setSelectedTag(tag)
    setIsDeleteDialogOpen(true)
  }

  // Handle dialog success
  const handleDialogSuccess = () => {
    refetch()
  }

  // DataTable columns
  const columns: Column<Tag>[] = [
    {
      key: "name",
      title: "اسم التاغ",
      sortable: true,
      render: (value: string, row: Tag) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <TagIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            {row.description && <div className="text-sm text-gray-500 line-clamp-1">{row.description}</div>}
          </div>
        </div>
      ),
    },
    {
      key: "_count.song_tags",
      title: "عدد الاستخدامات",
      sortable: true,
      render: (_, row: Tag) => (
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{row._count?.song_tags || 0} أغنية</span>
        </div>
      ),
    },
    {
      key: "created_at",
      title: "تاريخ الإنشاء",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{formatDate(value)}</span>
        </div>
      ),
    },
    {
      key: "updated_at",
      title: "آخر تحديث",
      sortable: true,
      render: (value: string) => <span className="text-sm text-gray-600">{formatDate(value)}</span>,
    },
    {
      key: "actions",
      title: "الإجراءات",
      width: "140px",
      render: (_, row: Tag) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEditTag(row)} title="تعديل">
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDeleteTag(row)} title="حذف">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Toolbar title="إدارة التاغات">
        <Button variant="primary-inverted" icon={Plus} onClick={() => setIsCreateDialogOpen(true)}>
          إنشاء تاغ جديد
        </Button>
      </Toolbar>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي التاغات</p>
              <p className="text-lg font-bold text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">إجمالي الاستخدامات</p>
              <p className="text-lg font-bold text-primary">{stats.totalUsage}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <TagIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">الأكثر استخداماً</p>
              <p className="text-lg font-bold text-primary line-clamp-1">{stats.mostUsed?.name || "لا يوجد"}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">متوسط الاستخدام</p>
              <p className="text-lg font-bold text-primary">{stats.averageUsage}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tags Table */}
      <DataTable
        data={tags}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        pageSize={2}
        emptyState={
          <div className="text-center py-8">
            <TagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد تاغات</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              إنشاء تاغ جديد
            </Button>
          </div>
        }
      />

      {/* Dialogs */}
      <CreateTagDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <UpdateTagDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        tag={selectedTag}
        onSuccess={handleDialogSuccess}
      />

      <DeleteTagDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        tag={selectedTag}
        onSuccess={handleDialogSuccess}
      />
    </div>
  )
}
