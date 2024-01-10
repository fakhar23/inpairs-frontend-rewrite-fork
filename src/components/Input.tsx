interface InputProps {
  className?: string;
  register: any;
  id: string;
  type: string;
  placeholder: string;
  errors: any;
  errorMessage: string;
  readOnly?: boolean;
}

const Input = ({
  className,
  register,
  id,
  type,
  placeholder,
  errors,
  errorMessage,
  readOnly,
}: InputProps) => {
  return (
    <div className="w-full mb-2">
      <input
        {...register(id, { required: errorMessage })}
        className={`appearance-none border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none h-[3rem] w-full focus:placeholder-transparent focus:border-red-500 bg-transparent md:h-[4rem] md:placeholder:text-[12px] md:text-[12px] ${className}`}
        id={id}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {errors[id] && (
        <p className="text-red text-[0.8rem]">{errors[id].message}</p>
      )}
    </div>
  );
};

export default Input;
