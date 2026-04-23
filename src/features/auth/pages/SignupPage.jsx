import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Divider } from '@mui/material'
import { AuthLayout } from '../../../layouts/AuthLayout.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { FormInput } from '../../../components/form/FormInput.jsx'
import { useSignupMutation } from '../hooks/useAuthMutations.js'

export function SignupPage() {
  const signupMutation = useSignupMutation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    mode: 'onTouched',
  })

  const password = watch('password')

  const onSubmit = async (values) => {
    try {
      await signupMutation.mutateAsync({
        email: values.email,
        password: values.password,
        name: values.name,
      })

      // ✅ reset form
      reset()

      // ✅ redirect after success
      navigate('/login')
    } catch (err) {
      // handled in mutation, no crash
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Sign up to start posting."
      footer={
        <>
          Already have an account?{' '}
          <Link className="underline" to="/login">
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>

        <FormInput
          name="name"
          control={control}
          label="Name"
          type="text"
          rules={{ required: 'Name is required' }}
          error={errors.name}
        />

        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Enter a valid email',
            },
          }}
          error={errors.email}
        />

        <FormInput
          name="password"
          control={control}
          label="Password"
          type="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Minimum 8 characters',
            },
          }}
          error={errors.password}
        />

        <FormInput
          name="confirmPassword"
          control={control}
          label="Confirm password"
          type="password"
          rules={{
            required: 'Confirm your password',
            validate: (v) =>
              v === password || 'Passwords do not match',
          }}
          error={errors.confirmPassword}
        />

        {/* ✅ ERROR UI */}
        {signupMutation.isError && (
          <p className="text-red-500 text-sm">
            {signupMutation.error?.response?.errors?.[0]?.message ||
              'Signup failed'}
          </p>
        )}

        <Button type="submit" fullWidth loading={signupMutation.isPending}>
          {signupMutation.isPending ? 'Creating...' : 'Sign up'}
        </Button>

        <Divider />

        <Link className="text-sm underline text-slate-600" to="/login">
          Back to login
        </Link>
      </form>
    </AuthLayout>
  )
}