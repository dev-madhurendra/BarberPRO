import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getCurrentUser } from '../api/auth';
import type { User } from '../utils/types';
import { immer } from 'zustand/middleware/immer';

export const ROLE = {
  customer: 'customer',
  barber: 'barber',
} as const;
export type RoleType = (typeof ROLE)[keyof typeof ROLE];

type AuthStateData = {
  token: string | null;
  role: RoleType;
  isVerified: boolean;
  user: User | null;
  _hasHydrated: boolean;
  isLoading: boolean;
};
type AuthStateFunction = {
  setAuthState: (data: Partial<AuthStateData>) => void;
  setRole: (role: RoleType) => void;
  clear: () => void;
  fetchUser: () => void;
  setHydrated: (state: boolean) => void;
  isLoading: boolean;
};

export type AuthState = AuthStateData & AuthStateFunction;

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoading: false,
      user: null,
      _hasHydrated: false,
      role: 'customer',
      isVerified: false,
      setAuthState: (data) => set({ ...data }),
      setRole: (role: RoleType) => set({ role }),
      clear: () => set({ token: null }),
      fetchUser: async () => {
        set((state) => ({ ...state, isLoading: true }));
        try {
          const user = await getCurrentUser();
          set({ user, isLoading: false });
        } catch {
          set((state) => ({
            ...state,
            isLoading: false,
            token: null,
            role: undefined,
          }));
        } finally {
          set((state) => ({ ...state, isLoading: false }));
        }
      },
      setHydrated: (state) => {
        if (state) {
          set({ _hasHydrated: state });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        state._hasHydrated = true;
      },
    }
  )
);

export default useAuthStore;
