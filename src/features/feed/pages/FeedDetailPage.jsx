
import { AppLayout } from '../../../layouts/AppLayout.jsx'


import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
  Divider
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useState } from 'react'
import { PostComposer } from '../components/PostComposer.jsx'
import { ConfirmModal } from '../../../components/ui/ConfirmModal.jsx'
import { Loader } from '../../../components/ui/Loader.jsx'
import { ErrorMessage } from '../../../components/ui/ErrorMessage.jsx'
import { BASE_URL } from '../../../utils/constant.js'

// 🔥 You should create this query
import { usePostQuery, useDeletePostMutation, useLikePostMutation, useUpdatePostMutation } from '../hooks/useFeed.js'
import { useAuthStore } from '../../../app/store/authStore.js'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export function FeedDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?._id)
  const { data, isLoading, isError, error } = usePostQuery(postId)
  const deletePost = useDeletePostMutation()
  const likePost = useLikePostMutation()
  const updatePost = useUpdatePostMutation()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (isLoading) return <Loader />
  if (isError) return <ErrorMessage message={error?.message} />

  const post = data?.post

  if (!post) {
    return (
      <Typography align="center" mt={5}>
        Post not found
      </Typography>
    )
  }

  return (
    <AppLayout> <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {/* 🔙 Back */}
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <Card sx={{ mt: 2, borderRadius: 3 }}>
        {/* IMAGE */}
        {post.imageUrl && (
          <CardMedia
            component="img"
            height="350"
            image={BASE_URL + '/' + post.imageUrl}
            alt={post.title}
          />
        )}

        <CardContent>
          {/* HEADER */}
          <Typography variant="body2" color="text.secondary">
            {post.creator?.name} · {formatDate(post.createdAt)}
          </Typography>

          <Typography variant="h5" fontWeight={800} mt={1}>
            {post.title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* CONTENT */}
          <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {post.content}
          </Typography>

          {/* ACTIONS */}
          <Stack direction="row" spacing={1} mt={3}>
            {/* <IconButton onClick={() => likePost.mutate(post._id)}>
              <FavoriteBorderIcon />
            </IconButton>

            <Typography variant="body2">
              {post.likes || 0}
            </Typography> */}

            {userId === post.creator._id && (
              <IconButton onClick={() => setIsEditOpen(true)}>
                <EditIcon />
              </IconButton>
            )}
            {userId === post.creator._id && (
              <IconButton onClick={() => setDeleteOpen(true)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* ✏️ EDIT MODAL */}
      <PostComposer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        mode="edit"
        initialData={post}
        isSubmitting={updatePost.isPending}
        onSubmit={(values) =>
          updatePost.mutateAsync({
            id: post._id,
            ...values
          })
        }
      />

      {/* 🗑 DELETE CONFIRM */}
      <ConfirmModal
        open={deleteOpen}
        title="Delete Post"
        message={`Delete "${post.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await deletePost.mutateAsync({ id: post._id })
          navigate('/feed') // 🔥 redirect after delete
        }}
      />
    </Box>
    </AppLayout>
  )
}