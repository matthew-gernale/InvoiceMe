import { create } from 'zustand';
import type { UserClaims } from '../@types/auth.type';

interface AuthState {
    // State
    accessToken: string | null;
    userClaims: UserClaims | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setAccessToken: (token: string | null) => void;
    setUserClaims: (claims: UserClaims | null) => void;
    setAuthenticated: (authenticated: boolean) => void;
    setLoading: (loading: boolean) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    userClaims: null,
    isAuthenticated: false,
    isLoading: true,

    setAccessToken: (token: string | null) => set({ accessToken: token }),
    setUserClaims: (claims: UserClaims | null) => set({ userClaims: claims }),
    setAuthenticated: (authenticated: boolean) => set({ isAuthenticated: authenticated }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    clearAuth: () =>
        set({
            accessToken: null,
            userClaims: null,
            isAuthenticated: false,
        }),
}));
