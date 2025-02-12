import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  openStatus: boolean;
  expanedGroup: string;
  toggleStatus: () => void;
  setExpanedGroup: (group: string) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      openStatus: true,
      expanedGroup: "General",
      toggleStatus: () => {
        set((state) => ({ openStatus: !state.openStatus }));
      },
      setExpanedGroup: (group: string) => set({ expanedGroup: group }),
    }),
    {
      name: "sidebar-storage",
    }
  )
);
