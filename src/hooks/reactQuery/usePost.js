import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../../services/axiosInstance.js'

export function usePost({ url, onSuccess, onError, ...mutationOptions } = {}) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(url, payload)
      return data
    },
    onSuccess,
    onError,
    ...mutationOptions,
  })
}

