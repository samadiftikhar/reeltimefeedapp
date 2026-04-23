import axios from 'axios'
import { useAuthStore } from '../app/store/authStore'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

/**
 * ✅ REQUEST INTERCEPTOR
 * Attach token to every request
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * ✅ RESPONSE INTERCEPTOR
 * Handle 401 globally
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    
      // 🔥 clear auth state
      useAuthStore.getState().logout()

      // 🔥 redirect to login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance