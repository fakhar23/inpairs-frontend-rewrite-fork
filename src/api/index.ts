import axios from "axios";
import {
  EmailVerificationBody,
  LoginBody,
  LoginResponse,
  SignUpBody,
} from "./types";

export const ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  emailVerification: "/auth/request-new-verification-email",
  tokenVerification: "/auth/verify-token",
};

const PUBLIC_ENDPOINTS = [
  ENDPOINTS.login,
  ENDPOINTS.signup,
  ENDPOINTS.emailVerification,
  ENDPOINTS.tokenVerification,
];

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
});

axiosInstance.interceptors.request.use((config) => {
  if (PUBLIC_ENDPOINTS.includes(config.url || "")) {
    return config;
  } else {
    const [jwt, expires_at, uid] = ["jwt", "expires_at", "uid"].map(
      localStorage.getItem
    );
    // check all are set
    if (jwt && expires_at && uid) {
      // check  if jwt has expired
      // TODO: use jsonwebtoken instead
      if (Number(new Date()) > JSON.parse(expires_at)) {
        ["jwt", "expires_at", "uid"].forEach(localStorage.removeItem);
        window.location.href = "/login";
      } else {
        config.headers.Authorization = jwt;
        config.headers["uid"] = uid;
      }
    } else {
      ["jwt", "expires_at", "uid"].forEach(localStorage.removeItem);
      window.location.href = "/login";
    }
    return config;
  }
});

export async function signUp({ confirmPassword, ...restPayload }: SignUpBody) {
  return axiosInstance.post(ENDPOINTS.signup, restPayload);
}

export async function requestNewEmailVerification(
  payload: EmailVerificationBody
) {
  return axiosInstance.post(ENDPOINTS.emailVerification, payload);
}

export async function verifyToken({ jwt }: { jwt: string }) {
  return axiosInstance.get<{ email: string }>(ENDPOINTS.tokenVerification, {
    headers: { Authorization: jwt },
  });
}

export async function login(payload: LoginBody) {
  const result = await axiosInstance.post<LoginResponse>(
    ENDPOINTS.login,
    payload
  );
  if (result.data.token && result.data.uid) {
    localStorage.setItem("jwt", result.data.token.jwt);
    localStorage.setItem(
      "expires_at",
      JSON.stringify(result.data.token.expirationDate)
    );
    localStorage.setItem("uid", result.data.uid);
  }
  return result.data;
}

export { axiosInstance as axios };
