import { createContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import authService from '../../services/authService';
import { useAuthStore } from '../../stores';
import type { AuthContextType } from '../../@types/auth.type'

const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: async () => '',
    logout: () => { },
    hasRole: () => false,
    isLoading: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const {
        isAuthenticated,
        userClaims: user,
        isLoading
    } = useAuthStore();

    useEffect(() => {

        const initializeAuth = async () => {
            await authService.initializeAuth();
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        const allowedAuthenticationPaths = ['/signin'];

        if (!isLoading && !isAuthenticated && !allowedAuthenticationPaths) navigate('/signin');
    }, [isLoading, isAuthenticated, navigate, location]);

    const login = async (Email: string, Password: string): Promise<string> => {
        const success = await authService.login({ Email, Password });
        return success;
    };

    const logout = (): void => {
        authService.logout();
        navigate('/signin');
    };

    const hasRole = (role: string): boolean => {
        return authService.hasRole(role);
    };

    const contextValue: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
        hasRole,
        isLoading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
        { children }
        </AuthContext.Provider>
    );
};
