"use client";

import { ProfileDataResponse } from "@/api/types";

export const SCALES: { [key: number]: string } = {
  5: "Primarily family oriented",
  4: "Leaning towards family-oriented",
  3: "Both career and family focused",
  2: "Leaning towards career-oriented",
  1: "Primarily career-oriented.",
};

export function Scales({
  IslamImportance,
  CareerOrFamilyOriented,
  FinancialIndependence,
  FitnessLevel,
}: ProfileDataResponse) {
  const isClosenessToFamily = false;

  return (
    <section className="my-5">
      <div className="flex items-center !justify-start font-bryantProBold text-purple text-[1.25rem]">
        Scales
      </div>

      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Importance of Islam
        </h3>
        <p>{IslamImportance}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Career vs Family
        </h3>
        <p>{CareerOrFamilyOriented}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Financial independence
        </h3>
        <p>{FinancialIndependence}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Fitness activity
        </h3>
        <p>{FitnessLevel}</p>
      </div>
      {isClosenessToFamily && (
        <div>
          <h3 className="font-bryantProMedium text-light-black">
            Closeness to family
          </h3>
          <p>closenessToFamily</p>
        </div>
      )}
    </section>
  );
}
