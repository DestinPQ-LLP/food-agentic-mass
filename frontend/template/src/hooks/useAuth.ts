import { useCallback, useEffect, useState } from 'react';
import api from '../api/client';

interface AuthState {
  token: string | null;
  user: any | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    token: sessionStorage.getItem('fam-jwt'),
    user: null,
  });

  useEffect(() => {
    const token = sessionStorage.getItem('fam-jwt');
    if (token) setState((s) => ({ ...s, token }));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    sessionStorage.setItem('fam-jwt', data.accessToken);
    setState({ token: data.accessToken, user: data.user });
    return data;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('fam-jwt');
    setState({ token: null, user: null });
  }, []);

  return { ...state, login, logout, isAuthenticated: !!state.token };
}
