import { Alert } from '@mui/material'

export function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>
      {message}
    </Alert>
  )
}

