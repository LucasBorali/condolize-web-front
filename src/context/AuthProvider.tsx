import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "../interfaces/AuthUser";

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<AuthUser | null>(null);

    const login = async (userData: AuthUser) => {
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};