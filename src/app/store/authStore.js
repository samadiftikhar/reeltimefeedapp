import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token:null,
      setAuth: ({ user }) =>
        set({
          user: user ?? null,
        }),
      setToken:({token})=>set({token:token}),
      logout: () => set({ user: null, token:null }),
    }),
    {
      name: 'snblog.auth',
      partialize: (state) => ({
        user: state.user,
        token:state.token,
      }),
    },
  ),
)

