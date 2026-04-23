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
      </div>

      <Button onClick={() => setIsOpen(true)}>
        Create Post
      </Button>

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
          const val = { title: values.title, content: values.content, imageUrl: values.imageUrl }
          if (selectedPost) {
            return updatePost.mutateAsync({
              id: selectedPost._id,
              postInput: val,
            })
          }
          return createPost.mutateAsync({
            postInput: val
          }).then(() => {
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