import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

interface SidebarState {
  openStatus: boolean;
  toggleStatus: () => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  openStatus: true,
  toggleStatus: () => set((state) => ({ openStatus: !state.openStatus })),
}));
