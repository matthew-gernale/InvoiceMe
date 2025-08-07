import Cookies from 'js-cookie';

import api from '../config/axiosinstance'

import { LoginDTO, UserClaims } from '../@types/auth.type'
import { decodeRefreshToken } from '../utilities/helpers';

import { AxiosError } from 'axios'
import { useAuthStore } from '../stores';


class AuthService {
    private initialized = false;

    private get store() {
        return useAuthStore.getState();
    }

    async login(payload: LoginDTO): Promise<string> {
        try {
            const response = await api.post('/auth/login', payload);
            const loginResponse = response.data;
            const accessToken = loginResponse.AccessToken;
            if (!accessToken) return "";

            this.store.setAccessToken(accessToken);
            const userClaims = this.setUserClaims(accessToken);
            this.store.setAuthenticated(true);

            return userClaims?.role ?? "";
        } catch (error) {

            const axiosError = error as AxiosError;
            console.error('Login failed:', axiosError.response?.data);
            return "";
        }
    }

    async refreshToken(): Promise<boolean> {
        try {
            const response = await api.post('/auth/refresh-token');
            const accessToken = response.data;

            if (accessToken) {
                this.store.setAccessToken(accessToken);
                this.setUserClaims(accessToken);
                this.store.setAuthenticated(true);
            }

            return true;
        } catch {
            this.logout();
            return false;
        }
    }

    logout(): void {
        this.store.clearAuth();
        Cookies.remove('refreshToken');
        api.post('/auth/logout').catch(console.error);
    }

    getAccessToken(): string | null {
        return this.store.accessToken;
    }

    getUserClaims(): UserClaims | null {
        return this.store.userClaims;
    }

    hasRole(role: string): boolean {
        return this.store.userClaims?.role === role;
    }

    isAuthenticated(): boolean {
        return this.store.isAuthenticated;
    }

    async initializeAuth(): Promise<void> {
        if (this.initialized) return;
        this.initialized = true;

        this.store.setLoading(true);

        try {
            const refreshed = await this.refreshToken();
            if (!refreshed) {
                this.store.clearAuth();
            }
        } catch {
            this.store.clearAuth();
        } finally {
            this.store.setLoading(false);
        }
    }

    private setUserClaims(refreshToken: string): UserClaims | null {
        const decoded = decodeRefreshToken(refreshToken);
        if (!decoded) return null;

        const userClaims: UserClaims = {
            id: decoded.nameid,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name
        };

        this.store.setUserClaims(userClaims);

        return userClaims;
    }
}

const authService = new AuthService();
export default authService;