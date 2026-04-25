import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Loader } from '../../../components/ui/Loader.jsx'
import { ErrorMessage } from '../../../components/ui/ErrorMessage.jsx'
import { SkeletonList } from '../../../components/ui/SkeletonList.jsx'
import { ConfirmModal } from '../../../components/ui/ConfirmModal.jsx'

import { BASE_URL } from '../../../utils/constant.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CustomPagination from '../../../components/common/Pagination.jsx'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export function PostList({
  query,
  onLike,
  likingId,
  setSelectedPost,
  setIsOpen,
  onDelete,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage
}) {
  const navigate = useNavigate()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  if (query.isLoading) return <SkeletonList count={3} />
  if (query.isError) return <ErrorMessage message={query.error?.message} />

  const posts =
    query.data?.posts ?? query.data?.data?.posts ?? query.data?.posts
  const creators = query.data?.creator ?? query.data?.data?.creator ?? query.data?.posts
  const totalItems = query.data?.totalItems || 0
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">

        <div className="text-6xl mb-3">📝</div>

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          No posts yet
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mt: 1, maxWidth: 320 }}
        >
          Be the first to create a post and share something amazing with the community.
        </Typography>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {(posts ?? []).map((p) => (
        <Card key={p._id} elevation={0}>
          <CardContent className="space-y-2">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {p.creator?.name} · {formatDate(p.createdAt)}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {p.title || 'Untitled Post'}
            </Typography>

            {p.imageUrl && (
              <img
                src={BASE_URL + '/' + p.imageUrl}
                alt={p.title || 'Post image'}
                className="h-60 w-full rounded-lg object-cover"
              />
            )}

            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {p.content || p.body}
            </Typography>
          </CardContent>

          <CardActions sx={{ px: 2, pb: 1 }}>
            {/* LIKE */}
            <IconButton
              onClick={() => onLike(p._id)}
              disabled={likingId === p._id}
            >
              {likingId === p._id ? <Loader size={18} /> : <FavoriteBorderIcon />}
            </IconButton>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {p.likes ?? 0}
            </Typography>

            {/* VIEW */}
            <IconButton onClick={() => navigate(`/feed/${p._id}`)}>
              <VisibilityIcon />
            </IconButton>

            {/* DELETE (OPEN MODAL) */}
            <IconButton
              onClick={() => {
                setDeleteTarget(p)
                setDeleteOpen(true)
              }}
            >
              <DeleteIcon />
            </IconButton>

            {/* EDIT */}
            <IconButton
              onClick={() => {
                setSelectedPost(p)
                setIsOpen(true)
              }}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      {/* ✅ CONFIRM DELETE MODAL */}
      <ConfirmModal
        open={deleteOpen}
        title="Delete Post"
        message={`Are you sure you want to delete "${deleteTarget?.title || 'this post'}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => {
          setDeleteOpen(false)
          setDeleteTarget(null)
        }}
        onConfirm={() => {
          if (deleteTarget?._id) {
            onDelete(deleteTarget._id)
          }
          setDeleteOpen(false)
          setDeleteTarget(null)
        }}

      />

      <CustomPagination
        page={page}
        count={totalPages} // 🔥 IMPORTANT
        onPageChange={(newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(newLimit) => {
          setRowsPerPage(newLimit)
          setPage(1) // reset page
        }}
      />
    </div>
  )
}