import { ProfileDataResponse } from "@/api/types";

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
}: ProfileDataResponse & {
  currentLocation: string;
}) {
  return (
    <section className="last:border-0">
      <div className="flex items-center !justify-start font-bryantProBold text-purple text-[1.25rem]">
        Basics
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Occupation</h3>
        <p>{JobOrFieldOfStudy}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Age</h3>
        <p>{age}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Current location
        </h3>
        <p>{currentLocation}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          State spent most time in
        </h3>
        <p>{MainState}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Education</h3>
        <p>{FinishedEducationLevel}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Languages</h3>
        <p>{SpokenLanguages}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Origin</h3>
        <p>{[Origin, DadOrigin, MomOrigin].filter(Boolean).join(", ")}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Sect</h3>
        <p>
          {Sect?.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "")}
        </p>{" "}
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Height</h3>
        <p>{Height}</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Married before?
        </h3>
        <p>{Married === "true" ? "Yes" : "No"}</p>
      </div>

      {/* {false && (
        <div>
          <h3 className="font-bryantProMedium text-light-black">Has kids?</h3>
          <p>{Kid}</p>
        </div>
      )} */}

      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Willing to move?
        </h3>
        <p>{WillingToMove}</p>
      </div>
    </section>
  );
}
