import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const ROLE = {
  customer: 'customer',
  barber: 'barber',
} as const;
export type RoleType = (typeof ROLE)[keyof typeof ROLE];

type AuthStateData = {
  token: string | null;
  role: RoleType;
  isVerified: boolean;
};
type AuthStateFunction = {
  setAuthState: (data: Partial<AuthStateData>) => void;
  setRole: (role: RoleType) => void;
  clear: () => void;
};

type AuthState = AuthStateData & AuthStateFunction;

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: 'customer',
      isVerified: false,
      setAuthState: (data) => set({ ...data }),
      setRole: (role: RoleType) => set({ role }),
      clear: () => set({ token: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
