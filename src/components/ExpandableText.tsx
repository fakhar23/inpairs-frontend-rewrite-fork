import React, { useState } from "react";

const ExpandableText = ({ text, maxChar = 100 }: any) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <span className="whitespace-pre-line	 ">
      {showFullText ? text : text.slice(0, maxChar)}{" "}
      {text.length > maxChar && (
        <span
          className="whitespace-normal text-blue-500 hover:underline focus:outline-none"
          onClick={toggleText}
        >
          {showFullText ? "...less" : "...more"}
        </span>
      )}
    </span>
  );
};

export default ExpandableText;
