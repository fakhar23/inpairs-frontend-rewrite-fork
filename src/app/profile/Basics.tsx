import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";

export function Basics({
  JobOrFieldOfStudy,
  age,
  MainState,
  currentLocation,
  FinishedEducationLevel,
  SpokenLanguages,
  Origin,
  MomOrigin,
  DadOrigin,
  Sect,
  Height,
  Married,
  WillingToMove,
  isLoading = true,
}: ProfileDataResponse & {
  currentLocation: string;
  isLoading?: boolean;
}) {
  const SKELETON_WIDTH = "40%";
  const SKELETON_HEIGHT = 24;

  return (
    <section className="last:border-0">
      <div className="flex items-center !justify-start font-bryantProBold text-secondary text-[1.25rem]">
        Basics
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Occupation
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{JobOrFieldOfStudy}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">Age</h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{age}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Current location
        </h3>
        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{currentLocation}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          State spent most time in
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{MainState}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">Education</h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{FinishedEducationLevel}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">Languages</h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{SpokenLanguages}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">Origin</h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{[Origin, DadOrigin, MomOrigin].filter(Boolean).join(", ")}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">Sect</h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>
            {Sect?.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "")}
          </p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">Height</h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{Height}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Married before?
        </h3>
        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{Married === "true" ? "Yes" : "No"}</p>
        </Skeleton>
      </div>

      {/* {false && (
        <div>
          <h3 className="font-bryant font-medium  text-light-black">Has kids?</h3>
          <p>{Kid}</p>
        </div>
      )} */}

      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Willing to move?
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{WillingToMove}</p>
        </Skeleton>
      </div>
    </section>
  );
}
