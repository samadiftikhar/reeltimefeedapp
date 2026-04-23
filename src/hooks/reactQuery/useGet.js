import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../../services/axiosInstance.js'

export function useGet({ key, url, params, enabled = true, select }) {
  return useQuery({
    queryKey: key,
    enabled,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { params })
      return data
    },
    select,
  })
}

