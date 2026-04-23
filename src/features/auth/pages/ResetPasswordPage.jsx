import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Divider } from '@mui/material'
import { AuthLayout } from '../../../layouts/AuthLayout.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { FormInput } from '../../../components/form/FormInput.jsx'
import { useResetPasswordMutation } from '../hooks/useAuthMutations.js'

export function ResetPasswordPage() {
  const resetMutation = useResetPasswordMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
    mode: 'onTouched',
  })

  const onSubmit = (values) => resetMutation.mutate(values)

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We’ll email you reset instructions."
      footer={
        <>
          Remembered it? <Link className="underline" to="/login">Log in</Link>
        </>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
          }}
          error={errors.email}
        />

        <Button type="submit" fullWidth loading={resetMutation.isPending}>
          Send reset link
        </Button>

        <Divider />

        <Link className="text-sm underline text-slate-600" to="/login">
          Back to login
        </Link>
      </form>
    </AuthLayout>
  )
}

