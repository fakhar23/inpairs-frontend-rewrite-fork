import axios from "axios";
import {
  AuthContextResponse,
  EmailVerificationBody,
  LoginBody,
  LoginResponse,
  ProfileDataResponse,
  SetPassword,
  SignUpBody,
  SupportEmailBody,
} from "./types";
import { toast } from "react-toastify";

export const ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  emailVerification: "/auth/request-new-verification-email",
  tokenVerification: "/auth/verify-token",
  authContext: "/auth/user-auth-context",
  paymentSession: "/payment/checkout-session",
  uploadImages: "/images",
  resetPassword: "/auth/reset-password",
  setPassword: "/auth/set-password",
  profileData: "/profile",
  supportEmail: "/email/support",
  matchmaking: "/matchmaking",
  matchTracking: "/matchmaking/tracking",
};

const PUBLIC_ENDPOINTS = [
  ENDPOINTS.login,
  ENDPOINTS.signup,
  ENDPOINTS.emailVerification,
  ENDPOINTS.tokenVerification,
  ENDPOINTS.resetPassword,
  ENDPOINTS.setPassword,
  ENDPOINTS.supportEmail,
];

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
});

axiosInstance.interceptors.request.use(function onFulfilled(config) {
  if (PUBLIC_ENDPOINTS.includes(config.url || "")) {
    return config;
  } else {
    const jwt = localStorage.getItem("jwt");
    const expires_at = localStorage.getItem("expires_at");
    const uid = localStorage.getItem("uid");

    // check all are set
    if (jwt && expires_at && uid) {
      // check  if jwt has expired
      // TODO: use jsonwebtoken instead
      if (Number(new Date()) > JSON.parse(expires_at)) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("uid");
        toast.error(
          "Your session has expired: Please log in again to continue",
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        config.headers.Authorization = jwt;
        config.headers["uid"] = uid;
      }
    } else {
      localStorage.removeItem("jwt");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("uid");
      toast.error("Your session has expired: Please log in again to continue");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    return config;
  }
});

export async function signUp({ confirmPassword, ...restPayload }: SignUpBody) {
  return axiosInstance.post(ENDPOINTS.signup, restPayload);
}

export async function requestNewEmailVerification(
  payload: EmailVerificationBody,
) {
  const result = await axiosInstance.post<{ message: string }>(
    ENDPOINTS.emailVerification,
    payload,
  );
  return result.data;
}

export async function verifyToken({ jwt }: { jwt: string }) {
  return axiosInstance.get<{ email: string }>(ENDPOINTS.tokenVerification, {
    headers: { Authorization: jwt },
  });
}

export async function login(payload: LoginBody) {
  const result = await axiosInstance.post<LoginResponse>(
    ENDPOINTS.login,
    payload,
  );
  if (result.data.token && result.data.uid) {
    localStorage.setItem("jwt", result.data.token.jwt);
    localStorage.setItem(
      "expires_at",
      JSON.stringify(result.data.token.expirationDate),
    );
    localStorage.setItem("uid", result.data.uid);
  }
  return result.data;
}

export async function getUserAuthContext() {
  const result = await axiosInstance.get<AuthContextResponse>(
    ENDPOINTS.authContext,
  );
  return result.data;
}

export async function createCheckoutSession() {
  const result = await axiosInstance.post<{ checkoutSession: string }>(
    ENDPOINTS.paymentSession,
  );
  return result.data;
}

export async function uploadImages(payload: { images: string[] }) {
  const result = await axiosInstance.post<{ message: string }>(
    ENDPOINTS.uploadImages,
    payload,
  );
  return result.data;
}

export async function resetPassword(payload: { email: string }) {
  const result = await axiosInstance.post<{ message: string }>(
    ENDPOINTS.resetPassword,
    payload,
  );
  return result.data;
}

export async function setPassword(payload: SetPassword) {
  const result = await axiosInstance.post<{ message: string }>(
    ENDPOINTS.setPassword,
    { password: payload.password },
    {
      headers: { Authorization: payload.token },
    },
  );
  return result.data;
}

export async function getProfileData(userId: string) {
  const result = await axiosInstance.get<ProfileDataResponse>(
    ENDPOINTS.profileData + "/" + userId,
  );
  return result.data;
}

export async function sendSupportEmail(payload: SupportEmailBody) {
  const result = await axiosInstance.post<{ message: string }>(
    ENDPOINTS.supportEmail,
    payload,
  );
  return result.data;
}

export async function getMatchmaking(queryString: string) {
  const result = await axiosInstance.get(ENDPOINTS.matchmaking + queryString);
  return result.data;
}

export async function updateMatchmaking(id: string, payload: any) {
  const result = await axiosInstance.patch(
    `${ENDPOINTS.matchmaking}/${id}`,
    payload,
  );
  return result.data;
}

export async function getMatchTracking(queryString: string) {
  console.log(ENDPOINTS.matchTracking + queryString);
  const result = await axiosInstance.get(ENDPOINTS.matchTracking + queryString);
  return result.data;
}

export { axiosInstance as axios };
