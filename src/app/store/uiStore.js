import { create } from 'zustand'

export const useUiStore = create((set) => ({
  isNavOpen: false,
  toggleNav: () => set((s) => ({ isNavOpen: !s.isNavOpen })),
  closeNav: () => set({ isNavOpen: false }),
}))

