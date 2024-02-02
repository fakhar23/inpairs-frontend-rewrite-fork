"use client";
import React, { useEffect } from "react";

import { Poppins } from "next/font/google";
import { Link } from "@/components";

import { useForm } from "react-hook-form";

import { Input, LoadingCircle } from "@/components";
import { PublicNavbar } from "@/components/PublicNav";
import FormsLayout from "@/layouts/FormsLayout";

import { LoginBody } from "@/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/api";
import { handleSuccessfulLoginRoute } from "@/api/routeUser";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // when on login, start fresh and clear all previous queries caches
    // important so that if a user logs out and then logs in again as different user, the queries should be re-fetched for the current user
    queryClient.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginBody) => {
      return await login(payload);
    },
    onSuccess(data) {
      const redirectState = handleSuccessfulLoginRoute(data);
      if (redirectState.shouldRedirect) {
        router.push(redirectState.newRoute);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>();

  return (
    <form
      onSubmit={handleSubmit((payload) => loginMutation.mutate(payload))}
      className="flex flex-col items-center pt-[0.5rem] pb-[1.5rem] gap-[1rem] md:[&>*]:w-full md:w-[90%]"
    >
      <div className="flex flex-col items-center gap-[1rem] w-full">
        <p className="= text-lg md:text-regular">Sign In</p>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          error={errors.email}
          {...register("email", {
            required: "email is required",
          })}
        />
        <div className="w-full relative">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            error={errors.password}
            {...register("password", {
              required: "password is required",
            })}
          />
          {loginMutation.isError && (
            <p className="text-red">
              {isAxiosError(loginMutation.error)
                ? loginMutation.error.response?.data.message
                : loginMutation.error.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full justify-center mt-3">
        <button
          className=" bg-red-500 text-white px-[2.5rem] py-[0.3rem] rounded-3xl shadow-[0_12px_10px_rgba(0,0,0,0.16)] md:px-[3.5rem] md:py-[0.6rem] md:mt-[3rem]"
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending && <LoadingCircle />}
          Sign In
        </button>
      </div>
    </form>
  );
}

export default function Login() {
  return (
    <div className="relative flex flex-col justify-around">
      <PublicNavbar />
      <div className="flex justify-center items-center">
        <FormsLayout>
          <div
            className={`md:flex md:flex-col md:relative md:justify-center md:items-center md:p-0 md:m-0 md:w-full ${poppins.className}`}
          >
            <LoginForm />
            <div className="flex flex-col justify-start text-nowrap">
              <p className="text-center text-xsmall">
                Forgot your password?{" "}
                <Link href="/account-management/reset-password">
                  <span className=" text-red">Reset password</span>
                </Link>
              </p>
              <p className="text-center text-xsmall">
                Didn't receive verification email?{" "}
                <Link href="/account-management/request-verification-email">
                  <span className=" text-red">Request new email </span>
                </Link>
              </p>
              <p className="text-center text-xsmall">
                Don't have an account?{" "}
                <Link href="/register">
                  <span className=" text-red md:text-[12px]">
                    Create an account
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </FormsLayout>
      </div>
      <div />
    </div>
  );
}
