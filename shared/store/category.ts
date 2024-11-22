import { create } from 'zustand'

interface State {
    activeId: number,
}

interface Actions {
    setActiveId: (id: number) => void
}

export const useCategoryStore = create<State & Actions>((set) => ({
    activeId: 1,
    setActiveId: (id) => set({ activeId: id })
}));