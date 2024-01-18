"use client";
import React, { useState } from "react";

const Accordion = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div
      className="w-full my-2 sm:my-4 md:my-6 shadow-md cursor-pointer bg-white rounded-xl"
      onClick={toggleExpanded}
    >
      <div className="px-6 text-left items-center h-20 flex justify-between text-[1.5rem] gap-[2rem]">
        <h3>{question}</h3>

        <div>{expanded ? "-" : "+"}</div>
      </div>
      <div
        className={`px-6 pt-0 overflow-hidden transition-[max-height] duration-400 ease-in ${
          expanded ? "max-h-80" : "max-h-0"
        } text-gray-gunmetal`}
      >
        <p className="pb-4">{answer}</p>
      </div>
    </div>
  );
};

export default Accordion;
