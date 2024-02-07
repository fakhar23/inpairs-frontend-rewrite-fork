"use client";
import { GateNavbar } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function ComingSoonPage() {
  const user = useAuthContext();

  return (
    <div className="flex flex-col h-screen">
      <GateNavbar />
      <div className="w-[100%] mb-5 grow flex justify-center items-center">
        <div className="h-fit md:mt-[1rem] md:p-[2rem] w-screen flex justify-center">
          <div className="w-[90%] pb-[4rem] shadow-xl flex justify-center flex-col items-center gap-10 md:p-[1rem] md:pb-[10rem]">
            <p className={`text-large text-primary font-funky md:text-[30px]`}>
              Inpairs
            </p>
            <p className="md:text-[15px] text-center">
              Hi{" "}
              {user.isLoading ? (
                <span className="animate-pulse h-4 inline-block bg-slate-200 rounded w-24 mb-[-3px]"></span>
              ) : (
                user.data?.firstName
              )}
              , Thank you for your interest in inpairs! Right now, we only
              operate in the US and Canada. We’re doing our best to get to your
              country soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
