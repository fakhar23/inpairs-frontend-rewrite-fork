"use client";

import { InputHTMLAttributes, useState } from "react";

import Image from "next/image";

import {
  RegisterOptions,
  type UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

import hidePasswordIcon from "@/assets/hidePassword.svg";
import passwordIcon from "@/assets/showPassword.svg";
import { twMerge } from "tailwind-merge";

export type InputFieldProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    id: Path<T>;
    errors?: FieldErrors<T>;
    name?: Path<T>;
    label?: React.ReactNode;
    variation?: "primary" | "secondary";
  };

export function Input<T extends FieldValues>({
  className,
  errors,
  label,
  variation = "primary",
  ...rest
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={twMerge("w-full mb-2 relative", className)}>
      {label && (
        <label htmlFor={rest.id} className=" text-[#3D3C3C]">
          {label}
        </label>
      )}

      <input
        className={twMerge(
          variation === "primary" &&
            "appearance-none border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-red-500 bg-transparent md:h-[4rem] md:placeholder:text-[12px] md:text-[12px]",
          variation === "secondary" &&
            "bg-[#EFEFEF96] rounded-[10px] px-3 border-slate-400 mt-2 leading-tight h-[3rem] w-full md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] text-[#5B5B5B] outline-none focus:outline-[#EF3E37]",
          rest.readOnly &&
            "bg-[#EFEFEF96] text-[#7b7b7b] cursor-not-allowed focus:outline-[#7b7b7b] focus:outline"
        )}
        type={showPassword ? "text" : rest.type}
        {...rest}
      />
      {errors && errors[rest.id]?.message && (
        <p className="text-red text-[0.8rem]">
          {JSON.stringify(errors[rest.id]?.message).replaceAll('"', "")}
        </p>
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
}
