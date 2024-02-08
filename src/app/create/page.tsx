"use client";
import { Suspense, useState } from "react";
import { Button, GateNavbar } from "@/components";
import Complete from "./Complete";
import Greeting from "./Greeting";
import Payment from "./Payment";
import PersonalDetails from "./PersonalDetails";
import ReferralInstructions from "./ReferralInstructions";
import Stepper, { IStep } from "./Stepper";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSearchParams, usePathname } from "next/navigation";

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

const stepQueryToStepNumberMap: Record<string, number> = {
  payment: 2,
  "profile-details": 4,
};

function Create() {
  const user = useAuthContext();
  const step = String(useSearchParams().get("step"));
  const [activeStep, setActiveStep] = useState<number>(
    stepQueryToStepNumberMap[step] || 1
  );

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
            <h3 className="text-slate-600 font-bold text-[1.1rem] md:text-regular text-center text-nowrap pb-5">
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
      <GateNavbar />

      <div className="w-[100%] grow mb-5 flex justify-center items-center relative">
        <div className="space-y-[1rem]  sm:h-[100%] min-h-[645px] flex flex-col justify-between md:flex md:flex-col  md:mt-[1rem]  md:justify-between w-[72rem] md:w-[40rem] px-[3rem] py-[1rem] md:m-0 bg-white shadow-lg relative md:p-[1rem]">
          <Stepper activeStep={activeStep} steps={steps} />

          <section className="flex w-[100%]">
            <Button
              className="font-bold disabled:bg-slate-300 disabled:text-white disabled:border-slate-300"
              onClick={() => {
                if (activeStep > 1) setActiveStep((step) => --step);
              }}
              isDisabled={activeStep === 1}
            >
              Back
            </Button>

            <div className="grow"></div>
            <Button
              className="font-bold disabled:bg-slate-300 disabled:text-white disabled:border-slate-300"
              onClick={() => {
                if (activeStep < steps.length) setActiveStep((step) => ++step);
              }}
              isDisabled={isNextStepDisabled}
            >
              Next
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense>
      <Create />
    </Suspense>
  );
}
