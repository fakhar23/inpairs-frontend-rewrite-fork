"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

export const MatchPairPopper = ({ popper }: { popper: React.ReactNode }) => {
  const [shown, setShown] = useState(false);

  return (
    <>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline ml-2 text-sm"
        onClick={(e) => {
          e.preventDefault();
          setShown((shown) => !shown);
        }}
      >
        {shown ? "hide" : "show"}
      </button>

      {shown &&
        createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 800,
              maxHeight: 900,
              overflow: "auto",
              position: "fixed",
              top: 20,
              left: 460,
              zIndex: 30,
            }}
            className="matching-pair-popper bg-white p-[2rem] rounded-xl shadow-md flex flex-col justify-center items-end border"
          >
            <div
              className="p-3"
              style={{
                whiteSpace: "break-spaces",
                maxHeight: 800,
                overflow: "scroll",
              }}
            >
              {popper}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
              onClick={(e) => {
                e.stopPropagation();
                setShown(false);
              }}
            >
              Hide
            </button>
          </div>,
          document.body
        )}
    </>
  );
};
