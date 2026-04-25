import { Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="page-shell flex items-center justify-center">
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

        </div>
      </div>
    </div>
  )
}

