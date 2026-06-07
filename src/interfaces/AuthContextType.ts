import type { AuthUser } from './AuthUser';

export interface AuthContextType {
    user: AuthUser | null;
    login: (user: AuthUser) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}