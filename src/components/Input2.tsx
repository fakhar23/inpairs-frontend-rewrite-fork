import { useEffect, useMemo, useState } from "react";

const formatIban = (value: string) => {
  return value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

const formatPhone = (value: string) => {
  return value
    .replace(/[^\d]/g, "")
    .replace(/(.{2})(.{2})/g, "$1 $2")
    .trim();
};

const CustomInput = ({
  id,
  name,
  type = "text",
  label = "",
  className = "",
  inputClassName = "",
  labelClassName,
  icon,
  isTextArea = false,
  onChange = null,
  bordered = false,
  outline,
  placeholder,
  ...props
}: any) => {
  const [customVal, setCustomVal] = useState("");
  const isIban = type === "iban";
  const isPhone = type === "phone";
  const isCurrency = type === "currency";
  const borderClass = bordered ? "border-1 border-blue-600" : "border-0";
  const customInputClass = [!!icon && "pl-8", borderClass];

  const onChangeCustom = (e: any) => {
    if (isIban || isPhone) {
      if (isIban) {
        setCustomVal(formatIban(e.target.value));
      }
      if (isPhone) {
        setCustomVal(formatPhone(e.target.value));
      }
      onChange(e);
    } else {
      onChange(e);
    }
  };

  const text = useMemo(() => {
    if (label && !placeholder) {
      return " ";
    }
    if (label && placeholder) {
      return placeholder;
    }
  }, [placeholder]);

  useEffect(() => {
    if (isIban) {
      setCustomVal(formatIban(props.defaultValue));
    }
    if (isPhone) {
      setCustomVal(formatPhone(props.defaultValue));
    }
  }, [props.defaultValue]);

  return (
    <div className={`relative flex flex-col items-start ${className}`}>
      <div
        className={`${
          bordered ? "border" : ""
        } relative w-full flex rounded-md justify-center items-center`}
      >
        {isTextArea ? (
          <textarea
            id={id || name || label}
            name={name}
            placeholder={text}
            className={` w-full rounded-md ${!!label && "pt-3.5 pt-5 "}
              placeholder-white focus:placeholder-slate-400
              px-2.5 pb-1 text-neutral-800 appearance-none
              focus:outline-none border-transparent border focus:border-blue-600 peer
              ${outline ? "ring-1 ring-gray-200" : "focus:ring-0"}
              ${customInputClass.join(" ")} ${inputClassName}`}
            rows={props.rows || 4}
            onChange={onChange}
            {...props}
          />
        ) : (
          <input
            id={id || name || label}
            name={name}
            className={`px-4 outline-0 h-12  ${!!label && "pt-4"}
              placeholder-white focus:placeholder-slate-400 w-full
              text-neutral-900 rounded-lg border-transparent appearance-none
              focus:outline-none focus:ring-0 focus:border-blue-600 peer
              ${
                outline ? " focus:ring-1  ring-1 ring-gray-200" : "focus:ring-0"
              }

              ${props.disabled && "text-[#999]"}
              ${customInputClass.join(" ")}  ${inputClassName}`}
            type={isIban || isPhone ? "text" : isCurrency ? "number" : type}
            value={isIban || isPhone ? customVal : props.value}
            defaultValue={isIban || isPhone ? customVal : props.defaultValue}
            onChange={onChange ? onChangeCustom : props.onChange}
            placeholder={text}
            max="100"
            {...props}
          />
        )}
        <div
          className={`absolute peer-focus:visible z-4 left-3 pt-3 ${
            props.value ? "visible" : "invisible"
          }`}
        >
          {icon}
        </div>
        <label
          htmlFor={id || name || label}
          className={`absolute text-neutral-500 focus:text-blue-600 duration-300 transform ${
            isTextArea
              ? "-translate-y-2 top-2 peer-focus:-translate-y-2 peer-focus:top-2 pt-2 peer-focus:pt-0"
              : "-translate-y-4 top-4 peer-focus:-translate-y-4 peer-focus:top-4 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2"
          } scale-75 z-4 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-focus:scale-75 left-1 ${labelClassName}`}
        >
          {label}
          {props.required ? <span className="ml-1 text-red">*</span> : null}
        </label>
      </div>
    </div>
  );
};

export default CustomInput;
