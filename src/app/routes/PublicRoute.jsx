import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'

export function PublicRoute() {
  const token = useAuthStore((s) => s.token)

  if (token) {
    return <Navigate to="/feed" replace />
  }

  return <Outlet />
}