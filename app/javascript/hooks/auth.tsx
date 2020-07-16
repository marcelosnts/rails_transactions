import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  user_id: string;
}

interface SignInCredentials {
  name: string;
  password: string;
}

interface AuthContextData {
  user_id: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user_id = localStorage.getItem('@RailsTransactions:user_id');

    if (user_id) {
      return {
        user_id,
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ name, password }) => {
    const response = await api.post('sessions', {
      name,
      password,
    });

    const { user_id } = response.data;

    if(user_id !== undefined){
      localStorage.setItem('@RailsTransactions:user_id', JSON.stringify(user_id));

      setData({ user_id });
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@RailsTransactions:user_id');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user_id: data.user_id, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }

  return context;
}

export { AuthProvider, useAuth };