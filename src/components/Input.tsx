"use client";

import { InputHTMLAttributes, Ref, useState } from "react";

import Image from "next/image";

import { FieldValues, Path, FieldError } from "react-hook-form";

import hidePasswordIcon from "@/assets/hidePassword.svg";
import passwordIcon from "@/assets/showPassword.svg";
import { twMerge } from "tailwind-merge";
import React from "react";

export type InputFieldProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    id: Path<T>;
    error: FieldError | undefined;
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
            "appearance-none border-b border-inputMediumSlate text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-red500 bg-transparent md:h-[4rem] md:placeholder:text-[12px] md:text-[12px]",
          variation === "secondary" &&
            "bg-[#EFEFEF96] rounded-[10px] px-3 border-inputMediumSlate mt-2 leading-tight h-[3rem] w-full md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] text-gray-charcoal outline-none focus:outline-primaryColor",
          rest.readOnly &&
            "bg-[#EFEFEF96] text-mediumGray cursor-not-allowed focus:outline-mediumGray focus:outline"
        )}
        {...rest}
        type={showPassword ? "text" : rest.type}
      />
      {error && <p className="text-red text-[0.8rem]">{error.message}</p>}

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
