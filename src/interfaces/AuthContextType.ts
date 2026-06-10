import type { AuthUser } from './AuthUser';

export interface AuthContextType {
    user: AuthUser | null;
    login: (user: AuthUser) => void;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
}