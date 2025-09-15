import React, { createContext, useContext, useState } from 'react';
import { api, setAuthToken } from '../services/api';

type AuthCtx = {
  token?: string;
  user?: { id: number; name: string; email: string; role: 'admin' | 'client' };
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState<AuthCtx['user']>();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      setUser(data.user);
      setAuthToken(data.token);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setToken(undefined);
    setUser(undefined);
    setAuthToken(undefined);
  };

  return <Ctx.Provider value={{ token, user, login, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
