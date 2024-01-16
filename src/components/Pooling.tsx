import React from "react";

export default function Pooling({ name, count = 5, onChange }: any) {
  return (
    <div className="flex items-center gap-5 justify-center">
      {new Array(count).fill(null).map((u, i) => {
        const id = name + "-" + i;
        return (
          <div key={i} className="flex flex-col">
            <input
              id={id}
              className="cursor-pointer"
              type="radio"
              name={name}
              value={i + 1}
              onChange={onChange}
            />
            <label htmlFor={id} className="cursor-pointer w-10 text-center">
              {i + 1}
            </label>
          </div>
        );
      })}
    </div>
  );
}
