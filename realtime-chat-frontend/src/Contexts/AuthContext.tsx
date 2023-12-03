import { useNavigate } from 'react-router-dom';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

import { fetchData } from './helpers/api';
import useLocalStorage from '../Hooks/useLocalStorage';

type AuthContextData = {
  isLoading: boolean;
  logout: () => void;
  error: string | null;
  user: null | { username: string };
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
};

type AuthResult = {
  username: string;
  accessToken: string;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  error: null,
  isLoading: false,

  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useLocalStorage<AuthResult | null>('user', null);

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);

    const data = await fetchData<AuthResult>('login', { username, password });

    if (data.ok) {
      setUser(data.result);
    } else {
      setError(data.error.message);
    }

    setIsLoading(false);
    navigate('/');
  };

  const signup = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);

    const data = await fetchData<AuthResult>('signup', { username, password });

    if (data.ok) {
      setUser(data.result);
    } else {
      setError(data.error.message);
    }

    setIsLoading(false);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      error,
      login,
      logout,
      signup,
      isLoading,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
