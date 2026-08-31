import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type Role = 'tenant' | 'landlord';

export type User = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  town: string;
  role: Role;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, role: Role) => void;
  register: (input: Omit<User, 'id'>) => void;
  logout: () => void;
  updateProfile: (patch: Partial<Omit<User, 'id' | 'role'>>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO: Record<Role, User> = {
  tenant: {
    id: 'u-tenant',
    name: 'Nangula Iipinge',
    email: 'nangula@example.com',
    whatsapp: '+264 81 402 1188',
    town: 'Windhoek',
    role: 'tenant'
  },
  landlord: {
    id: 'u-landlord',
    name: 'Maria Shipanga',
    email: 'maria@example.com',
    whatsapp: '+264 81 234 5678',
    town: 'Windhoek',
    role: 'landlord'
  }
};

export function AuthProvider({
  children,
  initialRole



}: {children: React.ReactNode;initialRole?: Role;}) {
  const [user, setUser] = useState<User | null>(
    initialRole ? DEMO[initialRole] : null
  );

  const login = useCallback((email: string, role: Role) => {
    setUser({ ...DEMO[role], email: email || DEMO[role].email });
  }, []);

  const register = useCallback((input: Omit<User, 'id'>) => {
    setUser({ ...input, id: `u-${Date.now()}` });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback<AuthContextValue['updateProfile']>((patch) => {
    setUser((prev) => prev ? { ...prev, ...patch } : prev);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout, updateProfile }),
    [user, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}