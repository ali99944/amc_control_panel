import type { PermissionCategory } from "../types/permission"

// Permission labels for display (Arabic)
export const PERMISSION_LABELS: Record<string, string> = {
  // Genre permissions
  genre_create: "إنشاء الأنواع",
  genre_read: "عرض الأنواع",
  genre_update: "تعديل الأنواع",
  genre_delete: "حذف الأنواع",

  // Artist permissions
  artist_create: "إنشاء الفنانين",
  artist_read: "عرض الفنانين",
  artist_update: "تعديل الفنانين",
  artist_delete: "حذف الفنانين",

  // Song permissions
  song_create: "إنشاء الأغاني",
  song_read: "عرض الأغاني",
  song_update: "تعديل الأغاني",
  song_delete: "حذف الأغاني",

  // Playlist permissions
  playlist_create: "إنشاء قوائم التشغيل",
  playlist_read: "عرض قوائم التشغيل",
  playlist_update: "تعديل قوائم التشغيل",
  playlist_delete: "حذف قوائم التشغيل",

  // Album permissions
  album_create: "إنشاء الألبومات",
  album_read: "عرض الألبومات",
  album_update: "تعديل الألبومات",
  album_delete: "حذف الألبومات",

  // Manager permissions
  manager_create: "إنشاء المديرين",
  manager_read: "عرض المديرين",
  manager_update: "تعديل المديرين",
  manager_delete: "حذف المديرين",
}

// Category labels for display (Arabic)
export const PERMISSION_CATEGORIES: Record<string, string> = {
  GENRE: "إدارة الأنواع",
  ARTIST: "إدارة الفنانين",
  SONG: "إدارة الأغاني",
  PLAYLIST: "إدارة قوائم التشغيل",
  ALBUM: "إدارة الألبومات",
  MANAGER: "إدارة المديرين",
}

// Role labels for display (Arabic)
export const ROLE_LABELS: Record<string, string> = {
  super_admin: "مدير عام",
  admin: "مدير",
  staff: "موظف",
}

// Convert API permissions structure to flat array
export const flattenPermissions = (permissions: PermissionCategory): string[] => {
  const flattened: string[] = []

  Object.values(permissions).forEach((category) => {
    Object.values(category).forEach((permission) => {
      flattened.push(permission)
    })
  })

  return flattened
}

// Group permissions by category
export const groupPermissionsByCategory = (permissions: PermissionCategory): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {}

  Object.entries(permissions).forEach(([categoryKey, categoryPerms]) => {
    grouped[categoryKey] = Object.values(categoryPerms)
  })

  return grouped
}

// Get permission label
export const getPermissionLabel = (permissionName: string): string => {
  return PERMISSION_LABELS[permissionName] || permissionName
}

// Get category label
export const getCategoryLabel = (categoryKey: string): string => {
  return PERMISSION_CATEGORIES[categoryKey] || categoryKey
}

// Get role label
export const getRoleLabel = (role: string): string => {
  return ROLE_LABELS[role] || role
}

// Check if manager has a permission or not
export const hasPermission = (managerPermissions: string[], permissionName: string): boolean => {
  return managerPermissions.includes(permissionName)
}
