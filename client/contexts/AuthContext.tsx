"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, getUserData, clearAuthCookies, UserData } from "@/lib/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  logout: () => void;
  refreshAuth: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status
  const checkAuth = useCallback(() => {
    const authenticated = isAuthenticated();
    const user = getUserData();
    
    // console.log("Auth Check:", { authenticated, user });
    
    setIsLoggedIn(authenticated);
    setUserData(user);
    setLoading(false);
  }, []);

  // Check auth on mount and when pathname changes
  useEffect(() => {
    checkAuth();
  }, [checkAuth, pathname]);

  const logout = useCallback(() => {
    clearAuthCookies();
    setIsLoggedIn(false);
    setUserData(null);
    router.push("/");
    router.refresh();
  }, [router]);

  const refreshAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, logout, refreshAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
