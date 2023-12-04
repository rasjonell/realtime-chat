import { useNavigate } from 'react-router-dom';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

import { fetchData } from './helpers/api';
import useLocalStorage from '../Hooks/useLocalStorage';
import toast from 'react-hot-toast';

type AuthResult = {
  username: string;
  accessToken: string;
};

type AuthContextData = {
  isLoading: boolean;
  logout: () => void;
  user: AuthResult | null;
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isLoading: false,

  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useLocalStorage<AuthResult | null>('user', null);

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);

    const data = await fetchData<AuthResult>('login', { username, password });

    if (data.ok) {
      setUser(data.result);
      navigate('/');
    } else {
      toast.error(data.error.message);
    }

    setIsLoading(false);
  };

  const signup = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);

    const data = await fetchData<AuthResult>('signup', { username, password });

    if (data.ok) {
      setUser(data.result);
      navigate('/');
    } else {
      toast.error(data.error.message);
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup,
      isLoading,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
