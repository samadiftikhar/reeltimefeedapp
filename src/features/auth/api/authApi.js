import { getDb, setDb, wait } from '../../../utils/localDb.js'
import axiosInstance from '../../../services/axiosInstance'

export const authApi = {
  login: async (payload) => {
    const res = await axiosInstance.post('/auth/login',payload)
    return res.data
  },
  signup: async (payload) => {
    const res = await axiosInstance.put(`/auth/signup`, payload)
  
    return res.data
  },
  resetPassword: async (payload) => {
    await wait()
    if (!payload.email) throw new Error('Email is required')
    return { ok: true }
  },
}

