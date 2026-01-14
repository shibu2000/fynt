import { useSQLiteContext } from "expo-sqlite";
import React, { FC, useContext, useState } from "react";

interface RegisterFormType {
  name: string;
  email: string;
  password: string;
}

const AuthContext = React.createContext<{
  login: (password: string) => Promise<boolean>;
  register: (data: RegisterFormType) => Promise<boolean>;
  checkUserExistance: () => Promise<{ email: string; name: string } | null>;
} | null>(null);

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const db = useSQLiteContext();

  const checkUserExistance = async () => {
    try {
      const res = await db.getFirstAsync<{ name: string; email: string }>(
        `SELECT name, email FROM user ORDER BY id DESC LIMIT 1`
      );
      if (res) {
        setUser(res);
        return res;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const login = async (password: string) => {
    const res = await db.getFirstAsync<{ password: string }>(
      `SELECT password FROM user ORDER BY id DESC LIMIT 1`
    );
    if (res?.password == password) {
      return true;
    }
    throw new Error("Invalid password");
  };

  const register = async (data: RegisterFormType) => {
    const res = await db.getFirstAsync<{ email: string }>(
      `SELECT email FROM user`
    );
    if (res?.email) {
      throw new Error("Email already exists");
    }

    try {
      await db.runAsync(
        `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`,
        [data.name, data.email, data.password]
      );
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to register");
    }
  };
  return (
    <AuthContext.Provider value={{ login, register, checkUserExistance }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
