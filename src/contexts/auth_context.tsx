import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAxios } from "../hooks/axios";
import { api_url } from "../constants/app_constants";
import Manager from "../types/manager";

interface AuthContextType {
  isAuthenticated: boolean;
  user: Manager | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Manager | null>(null);
  const axios = useAxios();

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (storedUser && token) {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && typeof parsedUser === "object") {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        // Clear invalid data from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Failed to parse stored user data:", error);
      // Clear invalid data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
}, []);

 const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${api_url}/managers/login/`, {
      username,
      password,
    });

    if (response.data && response.data.token && response.data.user) {
      const userData = response.data.user;
      if (userData && typeof userData === "object") {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.data.token);
        return true;
      } else {
        console.error("Invalid user data received from server");
        return false;
      }
    }
    console.error(response.data);
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
