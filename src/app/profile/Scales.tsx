"use client";

import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";
import { getAnswer } from "@/helpers";
import { UserAnswer } from "@/types/ranking";

export function Scales({
  answers,
  isLoading = true,
}: ProfileDataResponse & {
  answers: UserAnswer[];
  isLoading?: boolean;
}) {
  const SKELETON_WIDTH = "40%";
  const SKELETON_HEIGHT = 24;

  return (
    <section className="my-5">
      <div className="flex items-center !justify-start font-bryant font-bold text-secondary text-[1.25rem]">
        Scales
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Importance of Islam
        </h3>
        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{getAnswer(answers, "IslamImportance")}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Career vs Family
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{getAnswer(answers, "CareerOrFamilyOriented")}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Financial independence
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{getAnswer(answers, "FinancialIndependence")}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Fitness activity
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{getAnswer(answers, "FitnessLevel")}</p>
        </Skeleton>
      </div>
      {getAnswer(answers, "ClosenessToFamily") && (
        <div>
          <h3 className="font-bryant font-medium  text-light-black">
            Closeness to family
          </h3>

          <Skeleton
            variant="rounded"
            isLoading={isLoading}
            animation="wave"
            width={SKELETON_WIDTH}
            height={SKELETON_HEIGHT}
          >
            <p>{getAnswer(answers, "ClosenessToFamily")}</p>
          </Skeleton>
        </div>
      )}
    </section>
  );
}
