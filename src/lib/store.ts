import { create } from "zustand";
import { persist } from "zustand/middleware";
import { refreshToken } from "@/apis/userApis";

interface SidebarState {
  openStatus: boolean;
  expanedGroup: string;
  toggleStatus: () => void;
  setExpanedGroup: (group: string) => void;
}

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      setAccessToken: (token: string | null) => {
        set({ accessToken: token, isAuthenticated: !!token });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // Attempt to refresh the token during rehydration
            (async () => {
              if (!state.accessToken) {
                const refreshedToken = await refreshToken();
                if (refreshedToken) {
                  state.setAccessToken(refreshedToken);
                }
              }
              state.isLoading = false;
            })();
          }
        };
      },
    }
  )
);
