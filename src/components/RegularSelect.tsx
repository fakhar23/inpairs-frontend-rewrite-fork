import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { twMerge } from "tailwind-merge";
import { safeParse } from "./utils";

type Props = {
  id: string;
  label: string;
  isMulti?: boolean;
  error: string | null;
  value: string;
  options: { label: string; value: string | number }[];
  onChange: (newVal: { newAnswer: string; question_key: string }) => void;
  readOnly?: boolean;
};

const RegularDropdown = ({
  id,
  label,
  isMulti,
  error,
  value,
  options,
  onChange,
  readOnly,
}: Props) => {
  type NewValue =
    | MultiValue<{ label: string; value: string | number }>
    | SingleValue<{ label: string; value: string | number }>;

  const handleChange = (newVal: NewValue) => {
    if (newVal === null) {
      onChange({ newAnswer: "", question_key: id });
      return;
    } else if ("value" in newVal) {
      onChange({ newAnswer: newVal.value.toString(), question_key: id }); // is SingleValue
    } else if (Array.isArray(newVal)) {
      const values = newVal.map((item) => item.value); // is MultiValue
      onChange({ newAnswer: JSON.stringify(values), question_key: id });
    }
  };

  const processValue = (value: string) => {
    // if (!value) return { value: '0', label: '' }
    const parsed = safeParse(value);

    if (isMulti && Array.isArray(parsed)) {
      return options.filter((o) => parsed.includes(o.value));
    } else {
      value = parsed && Array.isArray(parsed) ? parsed?.[0] : value;
      return options.find(
        (o) => String(o.value).toLowerCase() === String(value).toLowerCase()
      );
    }
  };

  return (
    <div className={twMerge("w-[50%] mb-2", readOnly && "cursor-not-allowed")}>
      <label className="text-md mb-5 text-[#3D3C3C]">
        {label.replaceAll("*", "")}
      </label>
      <Select
        options={options}
        value={processValue(value)}
        onChange={handleChange}
        isMulti={isMulti}
        className="mt-2"
        id={id}
        instanceId={id}
        isDisabled={readOnly}
        styles={{
          control(baseStyles, state) {
            return {
              ...baseStyles,
              borderColor: "transparent !important",
              boxShadow: state.isFocused ? "0 0 0 1px #EF3E37" : "none",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#EFEFEF96",
              overflowX: "hidden",
              color: readOnly ? "red" : "auto",
              fontWeight: 500,
            };
          },
          dropdownIndicator(base) {
            return {
              ...base,
              color: "#622466 !important",
            };
          },
          indicatorSeparator(base) {
            return {
              ...base,
              display: "none",
            };
          },
          valueContainer(base) {
            return {
              ...base,
              padding: "0.5rem 1rem",
            };
          },
          singleValue(base) {
            return {
              ...base,
              color: "#5B5B5B !important",
            };
          },
          clearIndicator: (base) => ({
            ...base,
            display: "none",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#EF3E37" // Darker orange when selected (change as needed)
              : state.isFocused
                ? "#EF3E37" // Slightly darker orange when hovered (change as needed)
                : "lightorange", // Lighter orange by default (change as needed)
            color: state.isSelected || state.isFocused ? "white" : "#EF3E37",
            cursor: "pointer",
            margin: "0.25rem 0.5rem",
            borderRadius: "4px",
            width: "calc(100% - 1rem)",
            ":active": {
              backgroundColor: "rgba(239, 62, 55 , 0.9)", // Orangish color for the :active state
              color: "white",
            },
          }),
        }}
      />
      {error && <p className="text-red">{error}</p>}
    </div>
  );
};

export default RegularDropdown;
