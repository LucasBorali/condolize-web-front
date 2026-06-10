import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "../interfaces/AuthUser";
import { me } from "../api/authApi.ts";

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const token = localStorage.getItem("token")
             
            if (!token) {
                setLoading(false);
                return;
            }

             try {
                const currentUser = await me();

                setUser(currentUser);
            }
            catch {
                localStorage.removeItem("token");
            }
            finally {
                setLoading(false);
            }

        }

        restoreSession();
    }, [])



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
                loading,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};