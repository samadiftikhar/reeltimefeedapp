import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi.js'
import { useAuthStore } from '../../../app/store/authStore.js'
import { gql } from 'graphql-request'
import { graphqlRequest } from '../../../services/graphqlRequest'

const CREATE_USER = gql`
    mutation CreateUser($email: String!, $name: String!, $password: String!) {
      createUser(userInput: {
        email: $email
        name: $name
        password: $password
      }) {
        _id
        email
        name
        status
      }
    }
  `
  const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      email
      token
    }
  }
`

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (variables) =>
      graphqlRequest(CREATE_USER, variables),

    onSuccess: (data) => {
      console.log('User created:', data)
    },
  })
}
export function useLoginMutation() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const setToken = useAuthStore((s => s.setToken))

  return useMutation({
    mutationFn: (variables) =>
      graphqlRequest(LOGIN_USER, variables),

    onSuccess: (data) => {
      console.log(data.login)
      setAuth({ user: {userId:data.login.userId,email:data.login.email} })
      setToken({ token: data.login.token })
      localStorage.setItem('snblog.currentUserEmail', data.login.email)
      toast.success('Welcome back!')
      navigate('/feed', { replace: true })
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

