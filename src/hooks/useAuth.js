import { useMutation } from '@tanstack/react-query'
import { graphqlClient } from '../services/graphqlClient'
import { CREATE_USER } from '../graphql/authQueries'

export const useCreateUser = () => {
    return useMutation({
      mutationFn: async (variables) => {
        const data = await graphqlClient.request(CREATE_USER, variables)
        return data.createUser
      },
      onSuccess: () => {
        console.log('User created successfully')
      },
      onError: (err) => {
        console.error(err.response?.errors?.[0]?.message || 'Something went wrong')
      }
    })
  }