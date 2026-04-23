import { GraphQLClient } from 'graphql-request'
import { BASE_URL } from '../utils/constant'
import { useAuthStore } from '../app/store/authStore'

export const graphqlRequest = async (query, variables) => {
  const token = useAuthStore.getState().token   // 🔥 get token from zustand

  const client = new GraphQLClient(`${BASE_URL}/graphql`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })

  return client.request(query, variables)
}