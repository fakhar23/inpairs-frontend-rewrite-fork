"use client";

import { Button } from "@/components";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export const MatchPairPopper = ({ popper }: { popper: React.ReactNode }) => {
  const [shown, setShown] = useState(false);

  return (
    <>
      <Button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 border-transparent text-sm rounded-md"
        onClick={(e) => {
          e.preventDefault();
          setShown((shown) => !shown);
        }}
      >
        {shown ? "Hide" : "Show"}
      </Button>

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

            <Button
              className="rounded"
              onClick={(e) => {
                e.stopPropagation();
                setShown(false);
              }}
            >
              Hide
            </Button>
          </div>,
          document.body
        )}
    </>
  );
};
