export interface PermissionAction {
    id: string
    name: string
    description: string
    type: "create" | "read" | "update" | "delete" | "manage"
  }
  
  export interface Permission {
    id: string
    name: string
    description: string
    category: "users" | "content" | "analytics" | "system" | "financial"
    actions: PermissionAction[]
  }
  
  export interface Role {
    id: string
    name: string
    description: string
    permissions: Permission[]
    isSystem: boolean
  }
  
  export const PERMISSIONS: Permission[] = [
    {
      id: "1",
      name: "إدارة المستخدمين",
      description: "عرض وتعديل وحذف المستخدمين",
      category: "users",
      actions: [
        { id: "1", name: "عرض المستخدمين", description: "عرض قائمة المستخدمين", type: "read" },
        { id: "2", name: "إضافة مستخدم", description: "إضافة مستخدم جديد", type: "create" },
        { id: "3", name: "تعديل المستخدم", description: "تعديل بيانات المستخدم", type: "update" },
        { id: "4", name: "حذف المستخدم", description: "حذف المستخدم", type: "delete" },
      ],
    },
    {
      id: "2",
      name: "إدارة المحتوى",
      description: "إدارة الأغاني والألبومات والفنانين",
      category: "content",
      actions: [
        { id: "5", name: "عرض الأغاني", description: "عرض قائمة الأغاني", type: "read" },
        { id: "6", name: "إضافة أغنية", description: "رفع أغنية جديدة", type: "create" },
        { id: "7", name: "تعديل الأغنية", description: "تعديل معلومات الأغنية", type: "update" },
        { id: "8", name: "حذف الأغنية", description: "حذف الأغنية", type: "delete" },
        { id: "9", name: "إدارة الفنانين", description: "إدارة الفنانين والألبومات", type: "manage" },
      ],
    },
    {
      id: "3",
      name: "عرض الإحصائيات",
      description: "عرض التقارير والإحصائيات",
      category: "analytics",
      actions: [
        { id: "10", name: "عرض الإحصائيات", description: "عرض إحصائيات النظام", type: "read" },
        { id: "11", name: "تصدير التقارير", description: "تصدير التقارير", type: "manage" },
      ],
    },
    {
      id: "4",
      name: "إعدادات النظام",
      description: "إدارة إعدادات النظام العامة",
      category: "system",
      actions: [
        { id: "12", name: "عرض الإعدادات", description: "عرض إعدادات النظام", type: "read" },
        { id: "13", name: "تعديل الإعدادات", description: "تعديل إعدادات النظام", type: "update" },
      ],
    },
    {
      id: "5",
      name: "الإدارة المالية",
      description: "إدارة الاشتراكات والمدفوعات",
      category: "financial",
      actions: [
        { id: "14", name: "عرض المدفوعات", description: "عرض سجل المدفوعات", type: "read" },
        { id: "15", name: "إدارة الاشتراكات", description: "إدارة اشتراكات المستخدمين", type: "manage" },
      ],
    },
  ]
  
  export const ROLES: Role[] = [
    {
      id: "1",
      name: "مدير المحتوى",
      description: "مسؤول عن إدارة الأغاني والفنانين",
      permissions: [PERMISSIONS[1]],
      isSystem: false,
    },
    {
      id: "2",
      name: "مدير المستخدمين",
      description: "مسؤول عن إدارة المستخدمين والدعم",
      permissions: [PERMISSIONS[0]],
      isSystem: false,
    },
    {
      id: "3",
      name: "مدير عام",
      description: "صلاحيات كاملة على النظام",
      permissions: PERMISSIONS,
      isSystem: true,
    },
  ]
  
  // Dummy manager permissions for comparison
  export const MANAGER_PERMISSIONS: { [managerId: string]: string[] } = {
    "1": ["1", "2", "3"], // Manager 1 has permissions 1, 2, 3
    "2": ["2", "5"], // Manager 2 has permissions 2, 5
    "3": ["1", "2", "3", "4", "5"], // Manager 3 has all permissions
    "4": ["3"], // Manager 4 has only permission 3
  }
  