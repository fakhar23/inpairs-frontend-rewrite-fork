"use client";
import React from "react";

import { Poppins } from "next/font/google";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { Input, LoadingButton } from "@/components";
import { PublicNavbar } from "@/components/PublicNav";
import FormsLayout from "@/layouts/FormsLayout";

import { LoginBody } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api";
import { handleSuccessfulLoginRoute } from "@/api/routeUser";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

function LoginForm() {
  const router = useRouter();
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
      className="flex flex-col items-center px-[2.5rem] pt-[0.5rem] pb-[1.5rem] gap-[1rem] md:[&>*]:w-full md:w-[90%]"
    >
      <div className="flex flex-col items-center gap-[1rem] w-[80%] md:w-full">
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
            <p className="text-red">Invalid login credentials</p>
          )}
        </div>
      </div>

      <div className="flex w-full justify-center mt-3">
        <button
          className=" bg-red500 text-white px-[2.5rem] py-[0.3rem] rounded-3xl shadow-[0_12px_10px_rgba(0,0,0,0.16)] md:px-[3.5rem] md:py-[0.6rem] md:mt-[3rem]"
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending && <LoadingButton />}
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
            <div className="flex flex-col justify-start">
              <p className="text-center text-xsmall">
                Forgot your password?{" "}
                <Link href="/reset-password">
                  <span className=" text-red">Reset password</span>
                </Link>
              </p>
              <p className="text-center text-xsmall">
                Didn't receive verification email?{" "}
                <Link href="/request-verification-email">
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
