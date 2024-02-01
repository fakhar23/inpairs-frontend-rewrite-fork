"use client";

import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";

export function Scales({
  IslamImportance,
  CareerOrFamilyOriented,
  FinancialIndependence,
  FitnessLevel,
  ClosenessToFamily,
  isLoading = true,
}: ProfileDataResponse & { isLoading: boolean }) {
  const SKELETON_WIDTH = "40%";
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
      {ClosenessToFamily && (
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
            <p>{ClosenessToFamily}</p>
          </Skeleton>
        </div>
      )}
    </section>
  );
}
