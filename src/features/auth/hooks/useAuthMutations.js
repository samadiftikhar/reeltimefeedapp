import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi.js'
import { useAuthStore } from '../../../app/store/authStore.js'

export function useLoginMutation() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const setToken= useAuthStore((s=>s.setToken))

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth({ user: data.user })
      setToken({token:data.token})
      localStorage.setItem('snblog.currentUserEmail', data.user.email)
      toast.success('Welcome back!')
      navigate('/feed', { replace: true })
    },
  })
}

export function useSignupMutation() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  
  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      setAuth({ user: data.user })
      localStorage.setItem('snblog.currentUserEmail', data.user.email)
      toast.success('Account created!')
      navigate('/login', { replace: true })
    },
  })
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Reset instructions sent (mock).')
    },
  })
}

