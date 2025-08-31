
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dems_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [mfaVerified, setMfaVerified] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('dems_user', JSON.stringify(user));
    else localStorage.removeItem('dems_user');
  }, [user]);

  const login = async (email, role) => {
    // Simulated MFA prompt
    setUser({ email, role });
    setMfaVerified(true);
  };

  const logout = () => {
    setUser(null);
    setMfaVerified(false);
  };

  return (
    <AuthContext.Provider value={{ user, mfaVerified, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
