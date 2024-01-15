export function Basics() {
  return (
    <section className="last:border-0">
      <div className="flex items-center !justify-start font-bryantProBold text-purple text-[1.25rem]">
        Basics
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Occupation</h3>
        <p>Occupation</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Age</h3>
        <p>age</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Current location
        </h3>
        <p>current</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          State spent most time in
        </h3>
        <p>most_spent_on_state</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Education</h3>
        <p>education</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Languages</h3>
        <p>
          {" "}
          language
          {/* {Array.isArray(
            safeParse(user.questionsAnswers?.["languages"]?.answer)
          )
            ? safeParse(user.questionsAnswers?.["languages"]?.answer)
                .filter(Boolean)
                .join(", ")
            : user.questionsAnswers?.["languages"]?.answer ?? "N/A"} */}
        </p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Origin</h3>
        <p>origin</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Sect</h3>
        <p>
          {" "}
          sect
          {/* {Array.isArray(getAnswer("sect"))
            ? getAnswer("sect")?.filter(Boolean).join(", ")
            : getAnswer("sect")} */}
        </p>{" "}
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">Height</h3>
        <p>height</p>
      </div>
      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Married before?
        </h3>
        <p>yes</p>
      </div>

      {false && (
        <div>
          <h3 className="font-bryantProMedium text-light-black">Has kids?</h3>
          <p>no</p>
        </div>
      )}

      <div>
        <h3 className="font-bryantProMedium text-light-black">
          Willing to move?
        </h3>
        <p>no</p>
      </div>
    </section>
  );
}
