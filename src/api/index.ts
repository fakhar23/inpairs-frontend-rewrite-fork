import axios from "axios";
import { EmailVerificationBody, SignUpBody } from "./interfaces";

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

export { axiosInstance as axios };
