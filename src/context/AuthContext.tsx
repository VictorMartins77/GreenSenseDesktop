import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}