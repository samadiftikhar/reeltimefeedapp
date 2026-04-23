import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.token)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

