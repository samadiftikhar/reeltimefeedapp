import { io } from 'socket.io-client'
import { BASE_URL } from '../utils/constant'

let socket = null

export const connectSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      transports: ['websocket'],
      withCredentials: true,
      forceNew: true, // ✅ add here
    })
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const getSocket = () => socket