import axios from "axios";
import { EmailVerificationBody, LoginBody, SignUpBody } from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
});

export async function signUp({ confirmPassword, ...restPayload }: SignUpBody) {
  return axiosInstance.post("/auth/signup", restPayload);
}

export async function requestNewEmailVerification(
  payload: EmailVerificationBody
) {
  return axiosInstance.post("/auth/request-new-verification-email", payload);
}

export async function verifyToken(payload: { jwt: string }) {
  return axiosInstance.post<{ email: string }>("/auth/verify-token", payload);
}

export async function login(payload: LoginBody) {
  const result = await axiosInstance.post("/auth/login", payload);
  if (result.data.jwt) {
    const { jwt, expiresAt, expiresIn, uid } = result.data;
    localStorage.setItem("jwt", jwt);
  }
  return result;
}

export { axiosInstance as axios };
