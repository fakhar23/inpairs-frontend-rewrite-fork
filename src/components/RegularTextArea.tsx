import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { HTMLInputTypeAttribute, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  error: string | null;
  readOnly?: boolean;
  onChange: (newVal: { newAnswer: string; question_key: string }) => void;
}

const RegularTextArea = ({
  id,
  name,
  value,
  placeholder,
  error,
  readOnly,
  onChange,
}: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <div className="w-[50%] mb-2">
      <label htmlFor={id} className="px-1 ">
        {placeholder.replaceAll("*", "")}
      </label>

      <textarea
        id={id}
        className={twMerge(
          "bg-gray-50 transition-none rounded-[10px] px-3 py-3 border-slate-400 mt-2  w-full     text-gray-400 outline-none focus:outline-primary",
          readOnly &&
            "bg-gray-50 text-gray-400 cursor-not-allowed focus:outline-gray-400 focus:outline"
        )}
        name={name}
        rows={1}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        ref={textAreaRef}
        onChange={(e) =>
          onChange({ newAnswer: e.target.value, question_key: id })
        }
      />

      {error && <p className="text-primary text-[0.8rem] mt-1">{error}</p>}
    </div>
  );
};

export default RegularTextArea;
