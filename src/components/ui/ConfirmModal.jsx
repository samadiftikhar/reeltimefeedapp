import { Modal, Box, Typography, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'

export function ConfirmModal({
  open,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onClose,
  loading = false,
  type = 'danger',
}) {
  const colors = {
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  }

  const accent = colors[type] || colors.danger

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(420px, 92vw)',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          outline: 'none',
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: `${accent}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0, // ✅ prevents icon shrinking
              }}
            >
              <WarningAmberRoundedIcon sx={{ color: accent, fontSize: 20 }} />
            </Box>

            <Typography
              id="confirm-modal-title"
              fontWeight={700}
              fontSize="15px"
              sx={{
                whiteSpace: 'nowrap', // ✅ keeps text in one line
                lineHeight: 1,
              }}
            >
              {title}
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box
          id="confirm-modal-description"
          sx={{
            px: 2.5,
            py: 2.5,
            maxHeight: '45vh',
            overflowY: 'auto',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            {message}
          </Typography>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            justifyContent: 'flex-end',
            px: 2.5,
            py: 2,
            borderTop: '1px solid #f1f5f9',
            background: '#fafafa',
            flexWrap: 'wrap', // mobile fix
          }}
        >
          <Button
            onClick={onClose}
            disabled={loading}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              minWidth: 100,
            }}
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              minWidth: 100,
              backgroundColor: accent,
              '&:hover': {
                backgroundColor: accent,
                opacity: 0.9,
              },
            }}
          >
            {loading ? 'Processing...' : confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}