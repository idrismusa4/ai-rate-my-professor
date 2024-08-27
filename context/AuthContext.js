"use client";

import React, { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <AuthContext.Provider value={{ user, isLoaded, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
