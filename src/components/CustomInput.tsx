import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface ICustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
  inputClassName?: string;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  id,
  className = "",
  inputClassName = "",
  label = "",
  onChange,
  ...props
}: ICustomInputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <div className={`relative flex flex-col items-start ${className}`}>
      <div className="relative w-full flex rounded-md justify-center items-center">
        <input
          type="text"
          id={id}
          placeholder={""}
          value={value}
          onChange={handleChange}
          className={`border-transparent h-12 outline-0 peer px-4 placeholder-transparent rounded-lg
           text-neutral-900 w-full transition-all duration-300 ${
             label ? "pt-4" : ""
           } ${inputClassName}
            focus:placeholder-slate-400`}
          {...props}
        />
        <label
          htmlFor={id}
          className={`absolute bg-transparent duration-300 origin-[0] px-2 scale-75 text-neutral-500 top-4 left-0 transform -translate-y-4 z-4 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
          peer-focus:px-2 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:-translate-y-4 peer-focus:top-4`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CustomInput;
