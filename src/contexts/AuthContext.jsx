import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!mounted) return;

    const storedUser = window.localStorage.getItem('gigora-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    setLoading(false);

    return () => {
      mounted = false;
    };
  }, []);

  // TODO: replace placeholder auth with Supabase when backend URL and API are available.
  const login = async ({ email }) => {
    const normalizedUser = { email };
    setUser(normalizedUser);
    window.localStorage.setItem('gigora-user', JSON.stringify(normalizedUser));
    return { user: normalizedUser };
  };

  const logout = async () => {
    setUser(null);
    window.localStorage.removeItem('gigora-user');
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
