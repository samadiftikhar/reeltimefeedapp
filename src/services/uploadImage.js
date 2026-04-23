// services/uploadImage.js
import { BASE_URL } from '../utils/constant'
import { useAuthStore } from '../app/store/authStore'

export const uploadImage = async (file, oldPath = null) => {
    const token = useAuthStore.getState().token

    const formData = new FormData()
    formData.append('image', file)

    if (oldPath) {
        formData.append('oldPath', oldPath)
    }

    const res = await fetch(`${BASE_URL}/post-image`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Image upload failed')
    }

    return data.filePath
}