"use client";
import Image from "next/image";

import PhoneNumber from "@/assets/PhoneNumber.png";
import Referred from "@/assets/Referred.png";

export default function ReferralInstructions() {
  return (
    <div className="flex flex-col text-center gap-5">
      <p>
        Want to get a month for free? For every man you refer that makes an
        account, get the next month off! The more people we have, the better
        matches we can make. It&apos;s mad easy, just look below
      </p>

      <div className="flex flex-col gap-3 md:pb-[10rem] flex-wrap md:p-[1rem]">
        <p className="self-start text-xsmall italic md:text-[10px]">
          Make a Referral by giving them your phone number. They will have to
          provide it in this section of forms
        </p>

        <div className="flex gap-3 md:justify-center flex-wrap">
          <Image
            className="w-[500px] md:w-[250px]"
            src={Referred}
            alt="waiting"
            priority={true}
          />

          <Image
            className="w-[500px] md:w-[250px]"
            src={PhoneNumber}
            alt="waiting"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
