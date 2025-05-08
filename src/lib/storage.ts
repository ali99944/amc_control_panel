import { storage_url } from "../constants/app_constants"

export const getImageLink = (endpoint: string | null | undefined) => {
    if (endpoint) {
        return `${storage_url}/${endpoint}`
    }

    return null
}