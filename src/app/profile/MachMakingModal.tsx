"use client";

import React from "react";
import { CloudinaryImage, Modal } from "@/components";
import { Score } from "@/types/scorings";
import { MatchPairPopper } from "./MatchPairPopper";

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

type Props = {
  scoring: Score;
  userId?: string;
  setScoring: (scoring: Score) => void;
  handleSave: () => void;
  onClose: () => void;
  submitLoading: boolean;
  isRanked: boolean;
  userInfo: Record<string, any>;
};

export function MatchMakingModal(props: Props, ref: any) {
  const handleRankUp = (rank: number) => {
    const index = rank - 1;
    if (props.scoring && index > 0) {
      const score = { ...props.scoring };

      score.topPotentials[index - 1].rank += 1;
      score.topPotentials[index].rank -= 1;
      score.topPotentials.sort(({ rank: a }, { rank: b }) => a - b);

      props.setScoring(score);
    }
  };

  const handleRankDown = (rank: number) => {
    const index = rank - 1;
    if (props.scoring && index < props.scoring?.topPotentials.length - 1) {
      const scores = { ...props.scoring };

      scores.topPotentials[index + 1].rank -= 1;
      scores.topPotentials[index].rank += 1;
      scores.topPotentials.sort(({ rank: a }, { rank: b }) => a - b);

      props.setScoring(scores);
    }
  };

  const handleChangeRank = (val: string, email: string) => {
    const value = Number(val);
    if (value) {
      const newIndex = value - 1;
      if (newIndex >= 0 && newIndex < props.scoring?.topPotentials.length) {
        const newScores = { ...props.scoring };
        const newTopPotentials = newScores.topPotentials.filter(
          (x) => x.UserMatch.email !== email
        );
        const toChange = newScores.topPotentials.find(
          (x) => x.UserMatch.email == email
        );
        if (toChange) {
          newTopPotentials.splice(newIndex, 0, toChange);
        }
        props.setScoring({
          ...newScores,
          topPotentials: newTopPotentials.map((u, index) => ({
            ...u,
            rank: index + 1,
          })),
        });
      }
    }
  };

  const getTableRows = () => {
    return props.scoring?.topPotentials?.map((potential: any) => {
      return (
        <tr
          key={potential.UserMatch.auth_id}
          className="bg-white border-b"
          style={{
            backgroundColor: !potential.images.length
              ? "#fee2e2"
              : potential.less_fortunate
                ? "#fef9c3"
                : undefined,
          }}
        >
          <th scope="row" className="px-6 py-4 font-normal whitespace-nowrap">
            <a
              className="text-blue-500 underline underline-offset-2"
              href={`/profile/${potential.UserMatch.auth_id}`}
              target="_blank"
            >
              {potential.UserMatch.first_name} {potential.UserMatch.last_name}{" "}
            </a>
            <MatchPairPopper
              popper={
                <>
                  <div>
                    {potential.UserMatch.first_name}{" "}
                    {potential.UserMatch.last_name}{" "}
                    <span style={{ color: "rgb(88, 28, 135)" }}>
                      (prefers: {potential.type})
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    {potential.images.map((url: string) => (
                      <CloudinaryImage
                        alt=""
                        key={url}
                        fallback={FALLBACK_IMAGE_URL}
                        className="rounded-xl"
                        height={200}
                        width={200}
                        url={url}
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="mt-5">
                    {props.userInfo.first_name} {props.userInfo.last_name}{" "}
                    <span style={{ color: "rgb(88, 28, 135)" }}>
                      (prefers: {props.userInfo.type})
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    {props.userInfo.images?.map((url: string) => (
                      <CloudinaryImage
                        alt=""
                        key={url}
                        fallback={FALLBACK_IMAGE_URL}
                        className="rounded-xl"
                        height={200}
                        width={200}
                        // maxHeight={200}
                        url={url}
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="mt-5">{potential.gptReason}</div>
                </>
              }
            />
            <div className="text-sm flex items-center">
              <div>
                Matched{" "}
                <span className="text-blue-500">
                  {potential?.match_total || 0}
                </span>
              </div>
              <div>
                &nbsp;time{potential?.match_total > 1 ? "s" : ""}&nbsp;in{" "}
                <span className="text-blue-500">
                  {potential?.member_months}
                </span>{" "}
                months
              </div>
            </div>
            <div className="text-sm">
              Potential Matches: {potential?.potentional_match}
            </div>
          </th>

          <td className="px-6 py-4">{potential.gptScore}</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <p>{potential.rank}</p>
              <div className="ml-5 flex flex-col space-y-2">
                <button
                  className="border-2 border-slate-200 rounded-sm p-1 hover:bg-neutral-400"
                  onClick={() => handleRankUp(potential.rank)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                    />
                  </svg>
                </button>
                <input
                  style={{ width: 28, textAlign: "center" }}
                  type="text"
                  onKeyDown={(e) => {
                    if (
                      e.code === "Enter" &&
                      "value" in e.target &&
                      typeof e.target.value === "string"
                    ) {
                      handleChangeRank(
                        e.target.value,
                        potential.UserMatch.email
                      );
                      e.target.value = "";
                    }
                  }}
                  className="border-red-300 border-solid border-2"
                />
                <button
                  className="border-2 border-slate-200 rounded-sm p-1 hover:bg-neutral-400"
                  onClick={() => handleRankDown(potential.rank)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div>
              1st:{" "}
              {potential.first.map(
                (u: {
                  email: string;
                  first_name: string | null;
                  last_name: string | null;
                  sharable_id: string;
                }) => (
                  <a
                    key={u.email}
                    className="text-blue-500 underline underline-offset-2 mr-2"
                    href={`/profile/${u.sharable_id}`}
                    target="_blank"
                  >
                    {u.first_name} {u.last_name}{" "}
                  </a>
                )
              )}
            </div>
            <div>
              2nd:{" "}
              {potential.second.map(
                (u: {
                  email: string;
                  first_name: string | null;
                  last_name: string | null;
                  sharable_id: string;
                }) => (
                  <a
                    key={u.email}
                    className="text-blue-500 underline underline-offset-2 mr-2"
                    href={`/profile/${u.sharable_id}`}
                    target="_blank"
                  >
                    {u.first_name} {u.last_name}{" "}
                  </a>
                )
              )}
            </div>
            <div>
              3rd:{" "}
              {potential.third.map(
                (u: {
                  email: string;
                  first_name: string | null;
                  last_name: string | null;
                  sharable_id: string;
                }) => (
                  <a
                    key={u.email}
                    className="text-blue-500 underline underline-offset-2 mr-2"
                    href={`/profile/${u.sharable_id}`}
                    target="_blank"
                  >
                    {u.first_name} {u.last_name}{" "}
                  </a>
                )
              )}
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="fixed bg-white shadow-sm rounded-sm z-10 w-[90vw] h-[80vh] flex flex-col justify-center items-center border border-red-500 modal left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <header className="w-full">
        <h1 className="text-2xl font-bold pt-3 text-center">Ranking</h1>

        <p className="ml-6 mt-6 mb-6 font-bold" style={{ maxWidth: "60ch" }}>
          Reminder: Check if a female user was ranked 1st for another user; if
          so, ensure she is not ranked 1st for the current user. The same
          applies to 2nd and 3rd rankings.
        </p>

        <ul className="ml-6">
          <li className="flex gap-2 items-center">
            <div className="w-5 h-5 bg-yellow-100"></div> Users without a match
            for more than two months.
          </li>

          <li className="flex gap-2 items-center">
            <div className="w-5 h-5 bg-red-100"></div> Users who haven&apos;t
            uploaded any pictures of themselves.
          </li>
        </ul>
      </header>

      <hr className="h-px my-4 bg-neutral-200 border-0 dark:bg-neutral-700"></hr>

      {props.isRanked && (
        <section className="w-full">
          <div className="container mx-auto mb-5">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-10"
              role="alert"
            >
              <strong className="font-bold">Note: </strong>

              <span className="block sm:inline">
                Someone else has already ranked this profile!
              </span>
            </div>
          </div>
        </section>
      )}
      <section className="max-h-[90%] overflow-y-scroll w-full">
        <table className="w-full text-lg text-left text-neutral-500 table-auto">
          <thead className="text-md text-neutral-700 uppercase bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                GPT Score
              </th>

              <th scope="col" className="px-6 py-3">
                Ranking
              </th>

              <th scope="col" className="px-6 py-3">
                Current Ranks
              </th>
            </tr>
          </thead>
          <tbody>{getTableRows()}</tbody>
        </table>
      </section>

      <footer className="flex justify-center my-5 space-x-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => props.handleSave()}
          disabled={props.submitLoading}
        >
          {props.submitLoading ? "Loading..." : "Save ranking"}
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </footer>
    </div>
  );
}
