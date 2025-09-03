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

// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("dems_user");
//     return saved ? JSON.parse(saved) : null;
//   });
//   const [token, setToken] = useState(() => localStorage.getItem("token") || null);
//   const [mfaVerified, setMfaVerified] = useState(false);

//   useEffect(() => {
//     if (user) localStorage.setItem("dems_user", JSON.stringify(user));
//     else localStorage.removeItem("dems_user");
//   }, [user]);

//   useEffect(() => {
//     if (token) localStorage.setItem("token", token);
//     else localStorage.removeItem("token");
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/login`,
//         { email, password }
//       );

//       // Save token + minimal user object
//       setToken(res.data.token);
//       setUser({ email });

//       // MFA simulated
//       setMfaVerified(true);
//     } catch (err) {
//       throw new Error(err.response?.data?.error || "Login failed");
//     }
//   };

//   const signup = async (name, email, password, role) => {
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
//         name,
//         email,
//         password,
//         role,
//       });
//     } catch (err) {
//       throw new Error(err.response?.data?.error || "Signup failed");
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     setMfaVerified(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, mfaVerified, login, signup, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
