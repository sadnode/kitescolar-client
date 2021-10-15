import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ErrorToast } from '../components/Toast';

import { api } from '../services/api';

type User = {
  name: string;
  cpf: number;
}

type SignInCredentials = {
  cpf: number;
  ne: number;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Login(credentials: SignInCredentials): Promise<void>;
  Logout(): void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("@KIT:token");

    if (token) {
      api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const { name, cpf } = response.data;

        setUser({
          name,
          cpf
        });
      }).catch(() => {
        Logout();
      });
    }

  }, []);

  async function Login({ cpf, ne }: SignInCredentials) {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const response = await api.post("/auth/login", {
        numcpf: cpf,
        numcad: ne
      });

      setUser(response.data.user);
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      localStorage.setItem("@KIT:user", JSON.stringify(response.data.user));
      localStorage.setItem("@KIT:token", response.data.token);
    } catch {
      ErrorToast("Credenciais incorretas!")
    }
  }

  function Logout() {
    setUser(null);

    localStorage.removeItem('@KIT:user');
    localStorage.removeItem('@KIT:token');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
