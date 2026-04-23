import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Alert, Divider } from '@mui/material'
import { AuthLayout } from '../../../layouts/AuthLayout.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { FormInput } from '../../../components/form/FormInput.jsx'
import { useLoginMutation } from '../hooks/useAuthMutations.js'

export function LoginPage() {
  const loginMutation = useLoginMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  })

  const onSubmit = async(values) =>{
    try {
      await    loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
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
      title="Welcome back"
      subtitle="Log in to continue to your feed."
      footer={
        <>
          No account? <Link className="underline" to="/signup">Sign up</Link>
        </>
      }
    >
      <div className="space-y-3">
        {/* <Alert severity="info" variant="outlined">
          Demo user: <strong>demo@demo.com</strong> / <strong>Password123!</strong>
        </Alert> */}

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

          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            rules={{ required: 'Password is required' }}
            error={errors.password}
          />

          <Button type="submit" fullWidth loading={loginMutation.isPending}>
            Log in
          </Button>
        </form>

        <Divider />

        <Link className="text-sm underline text-slate-600" to="/reset-password">
          Forgot password?
        </Link>
      </div>
    </AuthLayout>
  )
}

