import { useEffect } from 'react'
import { connectSocket } from '../services/socket'

export const usePostSocket = (onEvent) => {
  useEffect(() => {
    const socket = connectSocket()

    const handler = (data) => {
      onEvent?.(data)
    }

    // ❌ remove old listeners first (CRITICAL)
    socket.off('posts')

    // ✅ attach single listener
    socket.on('posts', handler)

    return () => {
      socket.off('posts', handler)
    }
  }, []) // 🔥 IMPORTANT: EMPTY DEPENDENCY
}