"use client";

import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

import Image from "next/image";

import {
  RegisterOptions,
  type UseFormRegister,
  FieldValues,
  Path,
  ErrorOption,
} from "react-hook-form";

import hidePasswordIcon from "@/assets/hidePassword.svg";
import passwordIcon from "@/assets/showPassword.svg";
import { twMerge } from "tailwind-merge";

interface FormHookConfig<T extends FieldValues> {
  register: UseFormRegister<T>;
  pattern?: RegisterOptions["pattern"];
  validate?: RegisterOptions["validate"];
}

export interface InputFieldProps<T extends FieldValues> {
  className?: string;
  id: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  errors?: any;
  errorMessage?: string;
  readOnly?: boolean;
  defaultValue?: any;
  formConfig?: FormHookConfig<T>;
  max?: number;
  min?: number;
  name?: string;
  label?: React.ReactNode;
  value?: HTMLInputElement["value"];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  variation?: "primary" | "secondary";
}

export function Input<T extends FieldValues>({
  className,
  id,
  type,
  placeholder,
  errors,
  errorMessage,
  readOnly,
  formConfig,
  defaultValue,
  max,
  min,
  name,
  label,
  value,
  variation = "primary",
  onChange,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={twMerge("w-full mb-2 relative", className)}>
      {label && (
        <label htmlFor={id} className=" text-[#3D3C3C]">
          {label}
        </label>
      )}

      <input
        {...(formConfig
          ? formConfig.register(id, {
              required: errorMessage,
              pattern: formConfig.pattern,
              validate: formConfig.validate,
            })
          : {})}
        className={twMerge(
          variation === "primary" &&
            "appearance-none border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-red-500 bg-transparent md:h-[4rem] md:placeholder:text-[12px] md:text-[12px]",
          variation === "secondary" &&
            "bg-[#EFEFEF96] rounded-[10px] px-3 border-slate-400 mt-2 leading-tight h-[3rem] w-full md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] text-[#5B5B5B] outline-none focus:outline-[#EF3E37]",
          readOnly &&
            "bg-[#EFEFEF96] text-[#7b7b7b] cursor-not-allowed focus:outline-[#7b7b7b] focus:outline"
        )}
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
        max={max}
        min={min}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && errors[id] && (
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
}
