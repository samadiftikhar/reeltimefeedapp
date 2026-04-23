import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../../features/auth/pages/LoginPage.jsx'
import { SignupPage } from '../../features/auth/pages/SignupPage.jsx'
import { ResetPasswordPage } from '../../features/auth/pages/ResetPasswordPage.jsx'
import { FeedPage } from '../../features/feed/pages/FeedPage.jsx'
import { FeedDetailPage } from '../../features/feed/pages/FeedDetailPage.jsx'
import { ProtectedRoute } from './ProtectedRoute.jsx'
import { PublicRoute } from './PublicRoute.jsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />

      {/* 🔓 Public (ONLY when NOT logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* 🔐 Protected (ONLY when logged in) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:postId" element={<FeedDetailPage />} />

      </Route>

      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  )
}