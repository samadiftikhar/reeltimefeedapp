import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

export function FormTextarea({
  name,
  control,
  label,
  rules,
  error,
  rows = 4,
  ...textFieldProps
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          label={label}
          multiline
          rows={rows}
          error={Boolean(error)}
          helperText={error?.message}
          {...textFieldProps}
        />
      )}
    />
  )
}

