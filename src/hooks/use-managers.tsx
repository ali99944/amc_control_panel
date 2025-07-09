"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { Manager, CreateManagerData, UpdateManagerData, ManagerPermissionsData } from "../types/manager"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"
import Permission from "../types/permission"

export function useManagers() {
    const { notify } = useNotifications()

    const {
        data: managers,
        isLoading,
        error,
        refetch,
    } = useGetQuery<Manager[]>({
        url: "managers",
        key: ["managers"],
    })

    const createManagerMutation = useMutationAction({
        method: "post",
        url: "managers",
        onSuccessCallback: (data) => {
            console.log(data);
            notify.success("تم إنشاء المدير بنجاح")
            refetch()
        },
        onErrorCallback: (error) => {
            const errorObject = getApiError(error)
            
            notify.error(errorObject.message)
        },
    })

    const updateManagerMutation = useMutationAction({
        method: "put",
        url: "managers",
        onSuccessCallback: (data) => {
            console.log(data);

            notify.success("تم تحديث المدير بنجاح")
            refetch()
        },
        onErrorCallback: (error) => {
            console.log(error);

            notify.error('خطأ في تحديث المدير')
        },
    })

    const deleteManagerMutation = useMutationAction({
        method: "delete",
        url: "managers",
        onSuccessCallback: () => {
            notify.error('تم حذف المدير بنجاح')
            refetch()
        },
        onErrorCallback: (error) => {
            console.log(error);
            notify.error("خطأ في حذف المدير")
        },
    })

    const updateManagerPermissionsMutation = useMutationAction({
        method: "put",
        url: "managers/permissions",
        onSuccessCallback: () => {
            notify.success("تم تحديث الصلاحيات بنجاح")
            refetch()
        },
        onErrorCallback: (error) => {
            console.log(error);

            notify.error("خطأ في تحديث الصلاحيات")
        },
    })

    const createManager = (data: CreateManagerData) => {
        createManagerMutation.mutate(data)
    }

    const updateManager = (id: number, data: UpdateManagerData) => {
        updateManagerMutation.mutate({ id, ...data })
    }

    const deleteManager = (id: number) => {
        deleteManagerMutation.mutate({ id })
    }

    const updateManagerPermissions = (id: number, data: ManagerPermissionsData) => {
        updateManagerPermissionsMutation.mutate({ id, ...data })
    }

    return {
        managers: managers || [],
        isLoading,
        error,
        refetch,
        createManager,
        updateManager,
        deleteManager,
        updateManagerPermissions,
        isCreating: createManagerMutation.isPending,
        isUpdating: updateManagerMutation.isPending,
        isDeleting: deleteManagerMutation.isPending,
        isUpdatingPermissions: updateManagerPermissionsMutation.isPending,
    }
}

export function useManagerPermissions(managerId: number) {
    const {
        data: permissions,
        isLoading,
        error,
        refetch,
    } = useGetQuery<Permission[]>({
        url: `managers/${managerId}/permissions`,
        key: ["manager-permissions", managerId.toString()],
    })

    return {
        permissions: permissions || [],
        isLoading,
        error,
        refetch,
    }
}

export function useAllPermissions() {
    const {
        data: permissions,
        isLoading,
        error,
    } = useGetQuery<Permission[]>({
        url: "permissions",
        key: ["permissions"],
    })

    return {
        permissions: permissions || [],
        isLoading,
        error,
    }
}
