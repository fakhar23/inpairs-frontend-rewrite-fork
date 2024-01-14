"use client";

import { useState } from "react";

import Image from "next/image";

import {
  RegisterOptions,
  UseFormReturn,
  type UseFormRegister,
} from "react-hook-form";

import { FormFields } from "@/app/register/page";
import hidePasswordIcon from "@/assets/hidePassword.svg";
import passwordIcon from "@/assets/showPassword.svg";

export interface InputProps {
  className?: string;
  register: UseFormRegister<FormFields>;
  id: keyof FormFields;
  type: string;
  placeholder: string;
  errors: any;
  errorMessage: string;
  readOnly?: boolean;
  pattern?: RegisterOptions["pattern"];
  validate?: RegisterOptions["validate"];
  defaultValue?: any;
}

export const Input = ({
  className,
  id,
  type,
  placeholder,
  errors,
  errorMessage,
  readOnly,
  pattern,
  register,
  validate,
  defaultValue,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full mb-2 relative">
      <input
        {...register(id, { required: errorMessage, pattern, validate })}
        className={`appearance-none border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-red-500 bg-transparent md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] ${className}`}
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <p className="text-red text-[0.8rem]">{errors[id].message}</p>
      )}

      {type === "password" && (
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
};
