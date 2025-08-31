
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext({ role: 'guest' });

export function RoleProvider({ children }) {
  const { user } = useAuth();
  const role = user?.role ?? 'guest';
  return <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>;
}
export function useRole() { return useContext(RoleContext); }
