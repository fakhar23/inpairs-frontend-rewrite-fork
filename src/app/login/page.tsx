"use client";
import React from "react";
import { useState } from "react";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";

import HidePassword from "@/assets/hidePassword.svg";
import ShowPassword from "@/assets/showPassword.svg";
import { Input } from "@/components/Input";
import { PublicNavbar } from "@/components/PublicNav";
import FormsLayout from "@/layouts/FormsLayout";

import LoadingButton from "@/assets/loadinbBtnSvg.svg";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const LogIn = () => {
  return (
    <div className="relative flex flex-col justify-around">
      <PublicNavbar />
      <div className="flex justify-center items-center">
        <FormsLayout>
          <div
            className={`md:flex md:flex-col md:relative md:justify-center md:items-center md:p-0 md:m-0 md:w-full ${poppins.className}`}
          >
            <LogInForm />
            <div className="flex flex-col justify-start">
              <p className="text-center text-xsmall">
                Forgot your password?{" "}
                <Link href="/reset-password">
                  <span className=" text-red">Reset password</span>
                </Link>
              </p>
              <p className="text-center text-xsmall">
                Didn&apos;t receive verification email?{" "}
                <Link href="/request-verification-email">
                  <span className=" text-red">Request new email </span>
                </Link>
              </p>
              <p className="text-center text-xsmall">
                Don&apos;t have an account?{" "}
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
};

export default LogIn;

interface FormValues {
  email: string;
  password: string;
}

const LogInForm = () => {
  // TODO: Add state logic for showing this error on 401
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [load, setLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //   TODO: Add logic for handling login
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start px-[2.5rem] pt-[0.5rem] pb-[1.5rem] gap-[1rem] md:[&>*]:w-full md:w-[90%]"
    >
      <div className="flex flex-col items-start gap-[1rem] w-[80%] md:w-full">
        <p className="= text-lg md:text-regular">Sign In</p>
        <Input
          register={register}
          id="email"
          type="email"
          placeholder="Email"
          errorMessage="email is required"
          errors={errors}
        />
        <div className="w-full relative">
          <Input
            register={register}
            id="password"
            type="password"
            placeholder="Password"
            errorMessage="password is required"
            errors={errors}
          />
          {invalidCredentials && (
            <p className="text-red">Invalid credentials.</p>
          )}
        </div>
      </div>

      <div className="flex w-full justify-center mt-3">
        <button
          className=" bg-red-500 text-white px-[2.5rem] py-[0.3rem] rounded-3xl shadow-[0_12px_10px_rgba(0,0,0,0.16)] md:px-[3.5rem] md:py-[0.6rem] md:mt-[3rem]"
          type="submit"
          disabled={load}
        >
          {load && <LoadingButton />}
          Sign In
        </button>
      </div>
    </form>
  );
};
