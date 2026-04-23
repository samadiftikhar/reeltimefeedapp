import { Controller } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

export function FormSelect({
  name,
  control,
  label,
  rules,
  error,
  options = [],
  ...selectProps
}) {
  const labelId = `${name}-label`
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl fullWidth size="small" error={Boolean(error)}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select labelId={labelId} label={label} {...field} {...selectProps}>
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

