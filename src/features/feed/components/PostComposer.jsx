import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Box, Modal, TextField, Typography, InputLabel, FormHelperText } from '@mui/material'
import { Button } from '../../../components/ui/Button.jsx'
import { FormInput } from '../../../components/form/FormInput.jsx'
import { FormTextarea } from '../../../components/form/FormTextarea.jsx'
import { BASE_URL } from '../../../utils/constant.js'
import { uploadImage } from '../../../services/uploadImage'

export function PostComposer({
  onSubmit,
  isSubmitting,
  mode = 'create',
  initialData,
  isOpen,
  onClose,
}) {
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [existingImage, setExistingImage] = useState('')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      image: null,
    },
    mode: 'onTouched',
  })

  // ✅ Populate form in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset({
        title: initialData.title || '',
        content: initialData.content || '',
        image: null,
      })

      const img = initialData.imageUrl
        ? BASE_URL + '/' + initialData.imageUrl
        : ''

      setImagePreview(img)
      setExistingImage(initialData.imageUrl || '')
      setImageFile(null)
    }

    if (mode === 'create') {
      reset({
        title: '',
        content: '',
        image: null,
      })

      setImagePreview('')
      setExistingImage('')
      setImageFile(null)
    }
  }, [mode, initialData, reset])

  const handleClose = () => {
    onClose()
    setImagePreview('')
    setImageFile(null)
    setExistingImage('')
    reset()
  }


  const handleCreate = async (values) => {
    let imageUrl = existingImage || ''

    // ✅ upload if new file selected
    if (imageFile instanceof File) {
      imageUrl = await uploadImage(imageFile, existingImage)
    }

    const payload = {
      title: values.title,
      content: values.content,
      imageUrl, // ✅ correct field for GraphQL
    }

    await onSubmit(payload)
    handleClose()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 'min(640px, 92vw)', mx: 'auto', my: '6vh', p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h6" fontWeight={800} mb={2}>
          {mode === 'edit' ? 'Edit Post' : 'Create Post'}
        </Typography>

        <form onSubmit={handleSubmit(handleCreate)} className="space-y-3">
          <FormInput
            name="title"
            control={control}
            label="Title"
            rules={{ required: 'Title is required' }}
            error={errors.title}
          />

          <FormTextarea
            name="content"
            control={control}
            label="Content"
            rules={{ required: 'Content is required' }}
            error={errors.content}
            rows={5}
          />

          <div>
            <InputLabel>Upload image</InputLabel>

            <TextField
              type="file"
              fullWidth
              inputProps={{ accept: 'image/*' }}
              onChange={(e) => {
                const file = e.target.files?.[0] || null

                setImageFile(file)

                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => setImagePreview(reader.result)
                  reader.readAsDataURL(file)
                }
              }}
            />

            <FormHelperText error={Boolean(errors.image)}>
              {errors.image?.message}
            </FormHelperText>
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              className="h-48 w-full rounded-lg object-cover"
              alt="preview"
            />
          )}

          <div className="flex gap-2">
            <Button type="submit" loading={isSubmitting}>
              {mode === 'edit' ? 'Update' : 'Create'}
            </Button>

            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
} 