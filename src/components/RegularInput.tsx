import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id: string;
  name: string;
  value: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  error: string | null;
  readOnly?: boolean;
  onChange: (newVal: { newAnswer: string; question_key: string }) => void;
  max?: number;
  min?: number;
}

const Input = ({
  id,
  name,
  value,
  type,
  placeholder,
  error,
  readOnly,
  onChange,
  max,
  min,
}: InputProps) => {
  return (
    <div className="w-[50%] mb-2">
      <label htmlFor={id} className="px-1 text-[#3D3C3C]">
        {placeholder.replaceAll("*", "")}
      </label>

      <input
        id={id}
        className={twMerge(
          "bg-[#EFEFEF96] rounded-[10px] px-3 border-slate-400 mt-2 leading-tight h-[3rem] w-full md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] text-[#5B5B5B] outline-none focus:outline-[#EF3E37]",

          readOnly &&
            "bg-[#EFEFEF96] text-[#7b7b7b] cursor-not-allowed focus:outline-[#7b7b7b] focus:outline"
        )}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(e) =>
          onChange({ newAnswer: e.target.value, question_key: id })
        }
        max={max}
        min={min}
      />
      {error && <p className="text-red text-[0.8rem] mt-1">{error}</p>}
    </div>
  );
};

export default Input;
