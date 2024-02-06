"use client";

import {
  InputHTMLAttributes,
  Ref,
  TextareaHTMLAttributes,
  useState,
} from "react";

import Image from "next/image";

import { FieldValues, Path, FieldError } from "react-hook-form";

import hidePasswordIcon from "@/assets/hidePassword.svg";
import passwordIcon from "@/assets/showPassword.svg";
import { twMerge } from "tailwind-merge";
import React from "react";

export type InputFieldProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    id: Path<T>;
    error?: FieldError | undefined;
    name?: Path<T>;
    label?: React.ReactNode;
    variation?: "primary" | "secondary";
  };

export type TextAreaFieldProps<T extends FieldValues> =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    id: Path<T>;
    error?: FieldError | undefined;
    name?: Path<T>;
    label?: React.ReactNode;
    variation?: "primary" | "secondary";
  };

export const Input = React.forwardRef(function WrappedInput<
  T extends FieldValues,
>(
  {
    className,
    error,
    label,
    variation = "primary",
    ...rest
  }: InputFieldProps<T>,
  ref: unknown
) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={twMerge("w-full mb-2 relative", className)}>
      {label && (
        <label htmlFor={rest.id} className=" text-[#3D3C3C]">
          {label}
        </label>
      )}

      <input
        ref={ref as Ref<HTMLInputElement>}
        className={twMerge(
          variation === "primary" &&
            "appearance-none border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-red-500 bg-transparent md:h-[4rem] md:placeholder:text-[12px] md:text-[12px]",
          variation === "secondary" &&
            "bg-[#EFEFEF96] rounded-[10px] px-3 border-slate-400 mt-2 leading-tight h-[3rem] w-full md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] text-[#5B5B5B] outline-none focus:outline-[#EF3E37]",
          rest.readOnly &&
            "bg-[#EFEFEF96] text-[#7b7b7b] cursor-not-allowed focus:outline-[#7b7b7b] focus:outline"
        )}
        {...rest}
        type={showPassword ? "text" : rest.type}
      />
      {error && (
        <p className="text-red-500 text-[0.8rem] mt-2">{error.message}</p>
      )}

      {rest.type === "password" && (
        <div className="absolute right-2 top-[18px] bottom-2">
          <button
            className="text-sm"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <Image
                className="md:w-7"
                src={passwordIcon}
                alt="password icon"
              />
            ) : (
              <Image
                className="md:w-7"
                src={hidePasswordIcon}
                alt="hide password"
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
});

export const TextArea = React.forwardRef(function WrappedTextArea<
  T extends FieldValues,
>(
  {
    className,
    error,
    label,
    variation = "primary",
    ...rest
  }: TextAreaFieldProps<T>,
  ref: unknown
) {
  return (
    <div className={twMerge("w-full mb-2 relative", className)}>
      {label && (
        <label htmlFor={rest.id} className=" text-[#3D3C3C]">
          {label}
        </label>
      )}

      <textarea
        ref={ref as Ref<HTMLTextAreaElement>}
        className={twMerge(
          "p-3",
          variation === "primary" &&
            "appearance-none border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none w-full focus:placeholder-transparent focus:border-red-500 bg-transparent md:placeholder:text-[12px] md:text-[12px]",
          variation === "secondary" &&
            "bg-[#EFEFEF96] rounded-[10px] px-3 border-slate-400 mt-2 leading-tight w-full md:placeholder:text-[12px] md:text-[12px] text-[#5B5B5B] outline-none focus:outline-[#EF3E37]",
          rest.readOnly &&
            "bg-[#EFEFEF96] text-[#7b7b7b] cursor-not-allowed focus:outline-[#7b7b7b] focus:outline"
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-[0.8rem]">{error.message}</p>}
    </div>
  );
});
