import { Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="page-shell">
      <div className="content-container py-10">
        <div className="mx-auto max-w-md">
          <div className="mb-6">
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {subtitle}
              </Typography>
            ) : null}
          </div>

          <Card elevation={0} sx={{ boxShadow: 'soft' }}>
            <CardContent sx={{ p: 3 }}>
              {children}
              {footer ? (
                <div className="mt-4 text-center text-sm text-slate-600">
                  {footer}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-slate-500">
            <Link to="/feed" className="underline">
              Go to feed
            </Link>
            <span className="mx-2">·</span>
            <a
              className="underline"
              href="https://vite.dev"
              target="_blank"
              rel="noreferrer"
            >
              Vite
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

