"use client";
import React from "react";

export interface IStepper {
  activeStep: number;
  steps: Array<IStep>;
}

export interface IStep {
  label: string;
  content: React.ReactNode;
}

export const Stepper = ({ activeStep, steps }: IStepper) => {
  return (
    <>
      <section className="flex justify-between items-center">
        {steps.map((step, i) => {
          return (
            <div
              className={
                i + 1 !== steps.length
                  ? "w-full flex items-center"
                  : "flex items-center"
              }
              key={step.label}
            >
              <div
                className={`relative flex flex-col items-center ${
                  i + 1 === activeStep ? "text-darkSlate" : "text-mediumSlate"
                }`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out border-2 border-mediumSlate h-11 w-11 flex items-center justify-center py-3 ${
                    i + 1 <= activeStep ? "text-white bg-red500" : ""
                  }`}
                >
                  {i + 1 < activeStep ? (
                    <span className="font-bold">&#x2713;</span>
                  ) : (
                    i + 1
                  )}
                </div>
                <div className="absolute top-0 text-center mt-16 text-xs font-bryantProMedium uppercase sm:hidden">
                  {step.label}
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  i + 1 < activeStep
                    ? "border-mediumRose"
                    : "border-mediumSlate"
                }`}
              ></div>
            </div>
          );
        })}
      </section>

      <section className="md:px-[40px] pt-[4rem] md:mb-[10rem] md:flex-1 md:pt-[3rem] relative pb-[3rem]">
        {steps[activeStep - 1].content}
      </section>
    </>
  );
};

export default Stepper;
