import { Typography } from '@mui/material'
import { AppLayout } from '../../../layouts/AppLayout.jsx'
import { PostComposer } from '../components/PostComposer.jsx'
import { PostList } from '../components/PostList.jsx'
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  usePostsQuery,
  useUpdatePostMutation
} from '../hooks/useFeed.js'

import { useState } from 'react'
import { Button } from '../../../components/ui/Button.jsx'
import { usePostSocket } from '../../../hooks/usePostSocket.js'
import { useQueryClient } from '@tanstack/react-query'
import { postEventHandler } from '../../../realtime/postEventHandler.js'

export function FeedPage() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const postsQuery = usePostsQuery(page, rowsPerPage)

  const createPost = useCreatePostMutation()
  const deletePost = useDeletePostMutation()
  const likePost = useLikePostMutation()
  const updatePost = useUpdatePostMutation()

  const [selectedPost, setSelectedPost] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  // ✅ FIXED: SINGLE SOURCE OF TRUTH KEY
  const queryKey = ['feed', 'posts']

  // ✅ SOCKET (SENIOR CLEAN APPROACH)
  usePostSocket((data) => {
    postEventHandler({
      data,
      queryClient,
      queryKey,
    })
  })

  return (
    <AppLayout>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Feed
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Real-time Feed
          </Typography>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          Create Post
        </Button>
      </div>


      <PostComposer
        key={selectedPost?._id || 'create'}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setSelectedPost(null)
        }}
        mode={selectedPost ? 'edit' : 'create'}
        initialData={selectedPost}
        isSubmitting={createPost.isPending}
        onSubmit={(values) => {
          if (selectedPost) {
            return updatePost.mutateAsync({
              id: selectedPost._id,
              ...values,
            })
          }

          return createPost.mutateAsync(values).then(() => {
            setPage(1)
          })
        }}
      />

      <PostList
        query={postsQuery}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setIsOpen={setIsOpen}
        setSelectedPost={setSelectedPost}
        likingId={likePost.variables}
        onDelete={async (id) => {
          await deletePost.mutateAsync({ id })

          const totalItems = postsQuery.data?.totalItems || 0
          const newTotal = totalItems - 1
          const totalPages = Math.ceil(newTotal / rowsPerPage)

          if (page > totalPages) {
            setPage(totalPages || 1)
          }
        }}
        onLike={(id) => likePost.mutate(id)}
      />
    </AppLayout>
  )
}