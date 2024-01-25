"use client";
import { useState } from "react";

import { PublicNavbar } from "@/components";

import Complete from "./Complete";
import Greeting from "./Greeting";
import Payment from "./Payment";
import PersonalDetails from "./PersonalDetails";
import ReferralInstructions from "./ReferralInstructions";
import Stepper, { IStep } from "./Stepper";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Create() {
  const user = useAuthContext();
  const [activeStep, setActiveStep] = useState<number>(1);

  const formerPayingUser =
    !user.data?.isPayingUser && user.data?.completedTheirProfile;

  const steps: Array<IStep> = [
    {
      label: "Greeting",
      content: <Greeting />,
    },
    {
      label: "Next Steps",
      content: (
        <>
          {formerPayingUser && (
            <h3 className="text-slate-600 font-bold text-[1.1rem] md:text-regular text-center pb-5">
              Welcome back! To continue enjoying our service, kindly consider
              re-subscribing.
            </h3>
          )}
          <Payment />
        </>
      ),
    },
    {
      label: "Referral Instruction",
      content: <ReferralInstructions />,
    },
    {
      label: "Personal Details",
      content: <PersonalDetails />,
    },
    {
      label: "Complete",
      content: <Complete />,
    },
  ];

  // TODO: Backend
  const isDisabled = activeStep === steps.length;

  return (
    <div className="flex flex-col	h-[100vh]">
      <PublicNavbar canViewTheirProfile={false} />

      <div className="w-[100%] grow mb-5 md:h-screen flex justify-center items-center relative">
        <div className="space-y-[1rem]  sm:h-[100%] min-h-[645px] flex flex-col justify-between md:flex md:flex-col  md:mt-[1rem] md:h-[90vh] md:justify-between w-[72rem] md:w-[40rem] px-[3rem] py-[1rem] md:m-0 bg-white shadow-lg relative md:p-[1rem]">
          <Stepper activeStep={activeStep} steps={steps} />

          <section className="flex w-[100%]">
            <button
              className="bg-white text-slate-800 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-slate-300 disabled:pointer-events-none disabled:text-white bottom-20  md:text-regular"
              onClick={() => {
                if (activeStep > 1) setActiveStep((step) => --step);
              }}
              disabled={activeStep === 1}
            >
              Back
            </button>

            <div className="grow"></div>
            <button
              className="bg-red-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-slate-300 disabled:pointer-events-none md:text-regular"
              onClick={() => {
                if (activeStep < steps.length) setActiveStep((step) => ++step);
              }}
              disabled={isDisabled}
            >
              Next
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
