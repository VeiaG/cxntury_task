import { API_BASE_URL } from "@/config";
import { SessionResponse } from "@repo/shared-types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export type SessionProviderContextType = {
    token: string | null;
    isLoading: boolean;
    error: string | null;
    setToken: (token: string | null) => void;
};

const SessionProviderContextDefaultValue: SessionProviderContextType = {
    token: null,
    isLoading: true,
    error: null,
    setToken: () => {},
};

const SessionProviderContext = createContext<SessionProviderContextType>(
    SessionProviderContextDefaultValue
);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // Get token from session storage, if not avaible - fetch it from api
        const fetchToken = async () => {
            try {
                const storedToken = sessionStorage.getItem("sessionToken");
                if (storedToken) {
                    setToken(storedToken);
                } else {
                    const response = await axios.get<SessionResponse>(
                        `${API_BASE_URL}/session`
                    );
                    const newToken = response.data.token;
                    setToken(newToken);
                    sessionStorage.setItem("sessionToken", newToken);
                }
            } catch (error) {
                console.error("Failed to fetch session token:", error);
                setError("Failed to fetch session token");
            } finally {
                setIsLoading(false);
            }
        };
        fetchToken();
    }, []);

    return (
        <SessionProviderContext.Provider value={{ token, isLoading, error, setToken }}>
            {children}
        </SessionProviderContext.Provider>
    );
};
const useSession = () => {
    const context = useContext(SessionProviderContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};
export { SessionProvider, useSession };
