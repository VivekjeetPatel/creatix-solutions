import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('creatix_admin');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = async (email, password) => {
    const res = await api.post('/api/admin/login', { email, password });
    const { token, role } = res.data.data || res.data;
    const adminData = { email, role, token };
    localStorage.setItem('creatix_token', token);
    localStorage.setItem('creatix_admin', JSON.stringify(adminData));
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('creatix_token');
    localStorage.removeItem('creatix_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
