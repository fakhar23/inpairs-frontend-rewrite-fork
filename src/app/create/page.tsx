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
import { useQuery } from "@tanstack/react-query";

function useProfileStepper(activeStep: number) {
  const user = useAuthContext();
  switch (activeStep) {
    case 1: {
      return {
        isNextStepDisabled: false,
      };
    }
    case 2: {
      return {
        isNextStepDisabled: !user.data?.isPayingUser,
      };
    }
    case 3: {
      return {
        isNextStepDisabled: false,
      };
    }
    case 4: {
      return {
        isNextStepDisabled: !user.data?.completedTheirProfile,
      };
    }
    case 5: {
      return {
        isNextStepDisabled: true,
      };
    }
  }
  return {
    isNextStepDisabled: false,
  };
}

export default function Create() {
  const user = useAuthContext();
  const [activeStep, setActiveStep] = useState<number>(1);

  useQuery({
    queryKey: ["get-active-step"],
    queryFn: async () => {
      const queryParams = Object.fromEntries(
        new URLSearchParams(document.location.search)
      );

      if ("step" in queryParams) {
        if (queryParams.step === "payment") setActiveStep(2);
        else if (queryParams.step === "profile-details") setActiveStep(4);
      }

      return null;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { isNextStepDisabled } = useProfileStepper(activeStep);
  const formerPayingUser =
    !user.data?.isPayingUser && user.data?.completedTheirProfile;

  const steps: Array<IStep> = [
    // 1
    {
      label: "Greeting",
      content: <Greeting />,
    },
    // 2
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
    // 3
    {
      label: "Referral Instruction",
      content: <ReferralInstructions />,
    },
    // 4
    {
      label: "Personal Details",
      content: <PersonalDetails />,
    },
    // 5
    {
      label: "Complete",
      content: <Complete />,
    },
  ];

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
              disabled={isNextStepDisabled}
            >
              Next
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
