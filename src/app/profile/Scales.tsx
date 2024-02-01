"use client";

import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";

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
  isLoading = true,
}: ProfileDataResponse & { isLoading: boolean }) {
  const isClosenessToFamily = false;
  const SKELETON_WIDTH = 120;
  const SKELETON_HEIGHT = 24;

  return (
    <section className="my-5">
      <div className="flex items-center !justify-start font-bryantProBold text-purple text-[1.25rem]">
        Scales
      </div>

      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Importance of Islam
        </h3>
        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{IslamImportance}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Career vs Family
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{CareerOrFamilyOriented}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Financial independence
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{FinancialIndependence}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Fitness activity
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{FitnessLevel}</p>
        </Skeleton>
      </div>
      {isClosenessToFamily && (
        <div>
          <h3 className="font-bryantProMedium text-light-black">
            Closeness to family
          </h3>

          <Skeleton
            variant="rounded"
            isLoading={isLoading}
            animation="wave"
            width={SKELETON_WIDTH}
            height={SKELETON_HEIGHT}
          >
            <p>closenessToFamily</p>
          </Skeleton>
        </div>
      )}
    </section>
  );
}
