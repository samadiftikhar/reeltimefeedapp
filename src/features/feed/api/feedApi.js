import axiosInstance from '../../../services/axiosInstance'

export const feedApi = {
  getPosts: async ({ page = 1, limit = 10 }) => {
    const res = await axiosInstance.get('/feed/posts', {
      params: { page, limit }
    })
    return res.data
  },
  getPost: async ({ id }) => {
    const res = await axiosInstance.get(`/feed/post/${id}`)
    return res.data
  },
  createPost: async (data) => {

    const formData = new FormData()
  
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('image', data.image) // must match multer

    const res = await axiosInstance.post('/feed/post', formData)
  
    return res.data
  },
  updatePost: async (data) => {

    const formData = new FormData()
  
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('image', data.image) // must match multer

    const res = await axiosInstance.put(`/feed/post/${data.id}`, formData)
  
    return res.data
  },
  deletePost: async (data) => {

    const res = await axiosInstance.delete(`/feed/post/${data.id}`)
  
    return res.data
  },
  likePost: async (postId) => {
    const res = await axiosInstance.post(`/feed/posts/${postId}/like`)
    return res.data
  },
}

