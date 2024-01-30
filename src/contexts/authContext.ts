import { AuthContextResponse } from "@/api/types";
import { Query, UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";

export const AuthContext = createContext<
  UseQueryResult<AuthContextResponse, Error>
>(null as any as UseQueryResult<AuthContextResponse, Error>);
