"use client";
import Image from "next/image";
import { Control, Controller } from "react-hook-form";
import Select, { OptionProps, components } from "react-select";
import { SignUpBody } from "@/api/types";
import { countries } from "./countries";

type CountryOption = {
  value: string;
  label: string;
  flagUrl: string;
};

const FlagOption: React.FC<OptionProps<CountryOption, false>> = (props) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        width={35}
        height={40}
        src={props.data.flagUrl}
        alt={props.data.label}
        className="flag-icon"
        style={{ width: "24px", marginRight: "10px" }}
        loading="lazy"
      />
      {props.data.label}
    </div>
  </components.Option>
);

export function CountrySelect({ control }: { control: Control<SignUpBody> }) {
  const countryOptions = countries.map(([country, flagUrl]) => ({
    label: country,
    value: country,
    flagUrl: flagUrl,
  }));

  return (
    <div className="w-full text-gray gap-1">
      <Controller
        name="country"
        control={control}
        rules={{ required: "Country is required" }}
        render={({ field: { onChange, value, ...rest } }) => (
          <Select
            options={countryOptions}
            getOptionLabel={(option) => option.label}
            value={countryOptions.find((c) => c.value === value)}
            components={{ Option: FlagOption }}
            placeholder="Which country do you live"
            className="select md:placeholder:text-[12px] md:text-[12px] text-red leading-tight"
            onChange={(option) => onChange(option?.value)}
            styles={{
              control(baseStyles, state) {
                return {
                  ...baseStyles,
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "#fff",
                  overflowX: "hidden",
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
                  padding: "-50rem 0rem",
                };
              },
              singleValue(base) {
                return {
                  ...base,
                  color: "#5B5B5B !important",
                };
              },
              placeholder(base) {
                return {
                  ...base,
                  color: "#5B5B5B !important",
                };
              },
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#EF3E37"
                  : state.isFocused
                    ? "#EF3E37"
                    : "lightorange",
                color:
                  state.isSelected || state.isFocused ? "white" : "#EF3E37",
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
            {...rest}
          />
        )}
      />
    </div>
  );
}