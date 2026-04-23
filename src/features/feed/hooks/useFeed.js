import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { feedApi } from '../api/feedApi.js'

const feedKeys = {
  all: ['feed'],
  posts: () => [...feedKeys.all, 'posts'],
}

export function usePostsQuery(page, limit) {
  return useQuery({
    queryKey: ['feed', 'posts'],
    queryFn: () => feedApi.getPosts({ page, limit }),
    keepPreviousData: true,
  })
}
export function usePostQuery(id) {
  return useQuery({
    queryKey: ['feed', 'post',id], // 🔥 dynamic key
    queryFn: () => feedApi.getPost({ id }),
    keepPreviousData: true // smooth UX
  })
}
export function useCreatePostMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: feedApi.createPost,
    onSuccess: async () => {
      toast.success('Post Created!')
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}
export function useUpdatePostMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: feedApi.updatePost,
    onSuccess: async () => {
      toast.success('Post Updated!')
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}
export function useDeletePostMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: feedApi.deletePost,
    onSuccess: async () => {
      toast.success('Post Deleted!')
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}

export function useLikePostMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: feedApi.likePost,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}

