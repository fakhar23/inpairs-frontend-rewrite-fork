"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getUserAuthContext } from "@/api";
import { AuthContext } from "./authContext";

export const AuthController = ({ children }: { children: React.ReactNode }) => {
  const query = useQuery({
    queryKey: [ENDPOINTS.authContext],
    queryFn: async () => {
      return await getUserAuthContext();
    },
  });

  return (
    <AuthContext.Provider value={{ ...query }}>{children}</AuthContext.Provider>
  );
};
