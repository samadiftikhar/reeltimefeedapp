import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function resolveMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  )
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(resolveMessage(error))
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(resolveMessage(error))
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = error?.response?.status

        if (status === 401 || status === 404) {
          return false
        }

        return failureCount < 2
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
  },
})
