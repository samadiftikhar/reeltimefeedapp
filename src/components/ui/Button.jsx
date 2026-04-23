import MuiButton from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const VARIANT_TO_PROPS = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'secondary' },
}

export function Button({
  variant = 'primary',
  loading = false,
  loadingText,
  children,
  ...props
}) {
  const mapped = VARIANT_TO_PROPS[variant] ?? VARIANT_TO_PROPS.primary

  return (
    <MuiButton
      {...mapped}
      {...props}
      disabled={loading || props.disabled}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          props.startIcon
        )
      }
      sx={{
        ...(props.sx ?? {}),
        textTransform: 'none',
      }}
    >
      {loading ? loadingText ?? children : children}
    </MuiButton>
  )
}

