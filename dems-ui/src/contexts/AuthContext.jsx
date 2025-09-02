import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./SupabaseContext"; // adjust path as needed

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("dems_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [mfaVerified, setMfaVerified] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("dems_user", JSON.stringify(user));
    else localStorage.removeItem("dems_user");
  }, [user]);

  const login = async (email, role) => {
    // Step 1: Validate user from custom Supabase table
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", role)
      .eq("status", "active")
      .single();

    if (error || !data) {
      throw new Error("Invalid email or role");
    }

    // Step 2: Store user context
    setUser({ email, role, agency: data.agency });
    setMfaVerified(false); // MFA not yet verified
  };

  const logout = () => {
    setUser(null);
    setMfaVerified(false);
  };

  return (
    <AuthContext.Provider value={{ user, mfaVerified, setMfaVerified, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
