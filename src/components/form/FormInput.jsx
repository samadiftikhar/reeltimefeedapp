import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

export function FormInput({
  name,
  control,
  label,
  rules,
  error,
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
          error={Boolean(error)}
          helperText={error?.message}
          {...textFieldProps}
        />
      )}
    />
  )
}

