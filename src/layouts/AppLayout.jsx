import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../app/store/authStore.js'

export function AppLayout({ children }) {
  const navigate = useNavigate()
  // Use separate selectors — object selectors return a new reference each render and cause
  // "Maximum update depth exceeded" with Zustand.
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="page-shell">
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}
      >
        <Toolbar className="content-container flex gap-3">
          <Typography
            variant="h6"
            component={Link}
            to="/feed"
            sx={{ fontWeight: 900, letterSpacing: -0.4 }}
          >
            Social Blog
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Button component={Link} to="/feed" color="inherit" size="small">
              Feed
            </Button>
            {user ? (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user.email}
                </Typography>
                <Button
                  onClick={() => {
                    logout()
                    localStorage.removeItem('snblog.currentUserEmail')
                    navigate('/feed', { replace: true })
                  }}
                  variant="outlined"
                  size="small"
                >
                  Clear session
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit" size="small">
                  Log in
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <main className="content-container py-8">{children}</main>
    </div>
  )
}

