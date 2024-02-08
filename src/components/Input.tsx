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
        <label htmlFor={rest.id} className=" text-gray-gunmetal">
          {label}
        </label>
      )}

      <input
        ref={ref as Ref<HTMLInputElement>}
        className={twMerge(
          variation === "primary" &&
            "appearance-none border-b border-gray-400 text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-primary bg-transparent md:h-[4rem]    ",
          variation === "secondary" &&
            "bg-gray-100 rounded-[10px] px-3 border-gray-200 mt-2 leading-tight h-[3rem] w-full md:h-[4rem]     text-gray-gunmetal outline-none focus:outline-primary",
          rest.readOnly &&
            "bg-gray-100 text-gray-gunmetal cursor-not-allowed focus:outline-gray focus:outline"
        )}
        {...rest}
        type={showPassword ? "text" : rest.type}
      />
      {error && (
        <p className="text-primary text-[0.8rem] mt-2">{error.message}</p>
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
        <label htmlFor={rest.id} className=" text-gray-gunmetal">
          {label}
        </label>
      )}

      <textarea
        ref={ref as Ref<HTMLTextAreaElement>}
        className={twMerge(
          "p-3",
          variation === "primary" &&
            "appearance-none border-b border-gray-400 text-gray-gunmetal leading-tight focus:outline-none w-full focus:placeholder-transparent focus:border-primary bg-transparent    ",
          variation === "secondary" &&
            "bg-gray-100 rounded-[10px] px-3 border-gray-400 mt-2 leading-tight w-full     text-gray outline-none focus:outline-primary",
          rest.readOnly &&
            "bg-gray-100 text-gray-gunmetal cursor-not-allowed focus:outline-gray focus:outline"
        )}
        {...rest}
      />
      {error && <p className="text-primary text-[0.8rem]">{error.message}</p>}
    </div>
  );
});
