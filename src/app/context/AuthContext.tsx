// app/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "../types/user";
import { Birthday } from "../types/birthday";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    birthday: Birthday
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
        {
          identifier: email,
          password,
        }
      );
      setUser(res.data.user);
      localStorage.setItem("jwt", res.data.jwt);
      localStorage.setItem("userId", res.data.user.id);
      router.push("/"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    birthday: Birthday
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
        {
          username,
          email,
          password,
          birthday,
        }
      );

      setUser(res.data.user);
      localStorage.setItem("jwt", res.data.jwt);
      localStorage.setItem("userId", res.data.user.id);
      router.push("/"); // Redirect after registration
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
