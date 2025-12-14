import { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

const API_BASE =
  "https://super-duper-halibut-944x9j49v54c9xwj-5050.app.github.dev";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/status`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUser(data.loggedIn ? data.user : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, API_BASE }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
