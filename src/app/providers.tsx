"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        toast.error(
          (error instanceof AxiosError && error.response?.data?.message) ||
            error.message
        );
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
