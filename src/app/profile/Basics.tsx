import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";
import { UserAnswer } from "@/types/ranking";
import { getAnswer } from "@/helpers";

export function Basics({
  answers,
  isLoading = true,
}: ProfileDataResponse & {
  answers: UserAnswer[];
  isLoading?: boolean;
}) {
  const SKELETON_WIDTH = "40%";
  const SKELETON_HEIGHT = 24;
  return (
    <section className="last:border-0">
      <div className="flex items-center !justify-start font-bryant font-bold text-secondary text-[1.25rem]">
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
          <p>{getAnswer(answers,"JobOrFieldOfStudy")}</p>
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
          <p>{getAnswer(answers,"Age")}</p>
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
          <p>{getAnswer(answers,"ResidencyState")}</p>
        </Skeleton>
      </div>
      <div>
        <h3 className="font-bryant font-medium  text-light-black">
          Spent most time in
        </h3>

        <Skeleton
          variant="rounded"
          isLoading={isLoading}
          animation="wave"
          width={SKELETON_WIDTH}
          height={SKELETON_HEIGHT}
        >
          <p>{getAnswer(answers,"MainCity")}</p>
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
          <p>{getAnswer(answers,"FinishedEducationLevel")}</p>
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
          <p>{getAnswer(answers,"SpokenLanguages")}</p>
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
          <p>
            {[
              getAnswer(answers,"Origin"),
              getAnswer(answers,"DadOrigin"),
              getAnswer(answers,"MomOrigin"),
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
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
            {getAnswer(answers,"Sect")
              ?.replaceAll("[", "")
              .replaceAll("]", "")
              .replaceAll('"', "")}
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
          <p>{getAnswer(answers,"Height")}</p>
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
          <p>{getAnswer(answers,"Married") === "true" ? "Yes" : "No"}</p>
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
          <p>{getAnswer(answers,"WillingToMove")}</p>
        </Skeleton>
      </div>
    </section>
  );
}
