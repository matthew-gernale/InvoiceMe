export class LoginDTO {
    Email: string = '';
    Password: string = '';

    constructor(init?: Partial<LoginDTO>) {
        Object.assign(this, init);
    }
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: UserClaims | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => void;
    hasRole: (role: string) => boolean;
    isLoading: boolean;
}

export interface AuthGuardProps {
    children: React.ReactNode;
    roles: string[];
}

export interface DecodedRefreshToken {
    nameid: string;
    email: string;
    role: string;
    exp: number;
    name: string;
}

export interface UserClaims {
    id: string;
    email: string;
    role: string;
    name: string;
}