"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { useListState } from "@mantine/hooks";
import { twMerge } from "tailwind-merge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Button, CloudinaryImage, Input, Modal } from "@/components";
import { MatchPairPopper } from "../../profile/MatchPairPopper";
import DraggableList from "@/components/DraggableList/DraggableList";
import DraggableListItem from "@/components/DraggableList/DraggableListItem";
import {
  PotentialMatchInput,
  RankingItem,
  UserPotentialMatch,
  UserRank,
} from "@/types/ranking";
import { ENDPOINTS, updateRanking } from "@/api";

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

type Props = {
  ranking: RankingItem[];
  isRanked?: boolean;
};

export function RankingTable({ ranking }: Props) {
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const [state, handlers] = useListState(ranking || []);
  const [editable, setEditable] = useState<boolean[]>(
    Array.from<boolean>({ length: state.length }).fill(false),
  );

  const queryKey = [ENDPOINTS.matchRanking, params.id];
  const { mutate: update, isPending: updateLoading } = useMutation({
    mutationFn: async (payload: PotentialMatchInput[]) => {
      return await updateRanking(params.id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  useEffect(() => {
    if (ranking?.length) handlers.setState(ranking);
  }, [ranking]);

  const getTableRows = () => {
    return (
      !!state?.length &&
      state.map((potential: RankingItem, index: number) => {
        const userLifetime = potential.PotentialMatch?.created_at
          ? dayjs().diff(dayjs(potential.PotentialMatch?.created_at), "month")
          : 0;
        let matchCount = 0;
        if (potential.PotentialMatch.gender === "MALE") {
          matchCount = potential.PotentialMatch.UserMatchedMales?.length || 0;
        }
        if (potential.PotentialMatch.gender === "FEMALE") {
          matchCount = potential.PotentialMatch.UserMatchedFemales?.length || 0;
        }
        const hasImages =
          potential.PotentialMatch?.images?.length &&
          potential.PotentialMatch?.images[0] !== "";
        let currentRanks: any = [];
        if (potential.PotentialMatch.gender === "FEMALE") {
          currentRanks = potential.PotentialMatch?.UserPotentialMatches?.map(
            (x: UserPotentialMatch) => x.PotentialMatch,
          );
        }
        if (potential.PotentialMatch.gender === "MALE") {
          currentRanks = potential.PotentialMatch?.UserPotentialMatches?.map(
            (x: UserPotentialMatch) => x.MatchedUser,
          );
        }
        return (
          <DraggableListItem
            key={index}
            id={potential.id.toString()}
            index={index}
            className={twMerge(
              "flex bg-white border-b",
              !hasImages
                ? "bg-primary-100"
                : potential.less_fortunate
                  ? "bg-yellow-100"
                  : "",
            )}
          >
            <div className="flex items-center w-[200px]   px-1  py-1">
              <div className="ml-5 flex flex-col space-y-2">
                {!editable[index] ? (
                  <div
                    onClick={() => {
                      const newArr = [...editable];
                      newArr[index] = true;
                      setEditable(newArr);
                    }}
                  >
                    {index + 1}
                  </div>
                ) : (
                  <Input
                    style={{ width: 28, textAlign: "center" }}
                    type="number"
                    autoFocus
                    onKeyDown={(e) => {
                      if (
                        e.code === "Enter" &&
                        "value" in e.target &&
                        typeof e.target.value === "string"
                      ) {
                        handlers.reorder({
                          from: index,
                          to: Number(e.target.value) - 1,
                        });
                        const newArr = [...editable];
                        newArr[index] = false;
                        setEditable(newArr);
                      }
                    }}
                    defaultValue={index + 1}
                    id={"rank" + index}
                    onBlur={(e) => {
                      handlers.reorder({
                        from: index,
                        to: Number(e.target.value) - 1,
                      });
                      const newArr = [...editable];
                      newArr[index] = false;
                      setEditable(newArr);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="w-[300px]  px-1  py-1 font-normal whitespace-nowrap">
              <a
                className="text-blue-500 underline underline-offset-2"
                href={`/profile/${potential.PotentialMatch.id}`}
                target="_blank"
              >
                {potential.PotentialMatch.first_name}{" "}
                {potential.PotentialMatch.last_name}{" "}
              </a>
              <MatchPairPopper
                popper={
                  <>
                    <div>
                      {potential.MatchedUser.first_name}{" "}
                      {potential.MatchedUser.last_name}{" "}
                      <span style={{ color: "rgb(88, 28, 135)" }}>
                        (prefers:{" "}
                        {(!!potential.MatchedUser?.UserAnswers?.length &&
                          potential.MatchedUser?.UserAnswers[0]?.answer) ||
                          ""}
                        )
                      </span>
                    </div>
                    {/* <div className="flex gap-4 mt-3">
                      {potential.MatchedUser.images?.map((url: string) => (
                        <CloudinaryImage
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
                    </div> */}
                    <div className="mt-10">
                      {potential.PotentialMatch.first_name}{" "}
                      {potential.PotentialMatch.last_name}{" "}
                      <span style={{ color: "rgb(88, 28, 135)" }}>
                        (prefers:{" "}
                        {(!!potential.PotentialMatch?.UserAnswers?.length &&
                          potential.PotentialMatch?.UserAnswers[0]?.answer) ||
                          ""}
                        )
                      </span>
                    </div>
                    <div className="flex gap-4 mt-3">
                      {!!potential.PotentialMatch?.images?.length &&
                        potential.PotentialMatch?.images.map((url: string) => (
                          <CloudinaryImage
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
                      {/* {potential.gptReason || "gpt reason here"} */}
                    </div>
                  </>
                }
              />

              <div className="text-sm flex items-center">
                <div>
                  Matched{" "}
                  <span className="text-blue-500">{matchCount || 0}</span>
                </div>
                <div>
                  &nbsp;time{matchCount > 1 ? "s" : ""}&nbsp;in{" "}
                  <span className="text-blue-500">{userLifetime}</span> months
                </div>
              </div>
              <div className="text-sm">Potential Matches: {currentRanks?.length}</div>
            </div>

            <div className="w-[300px] px-1 flex items-center py-1">
              {/* {potential.gptScore || 0} */}
            </div>

            <div className="w-[300px] px-1 py-1">
              {currentRanks?.length &&
                currentRanks.slice(0, 3).map(
                  (userRank: Partial<UserRank>, index: number) => {
                    return (
                      <div key={index}>
                        {index + 1}:
                        <a
                          key={userRank.email}
                          className="text-blue-500 underline underline-offset-2 mx-2"
                          href={`/profile/${userRank.id}`}
                          target="_blank"
                        >
                          {userRank.first_name} {userRank.last_name}
                        </a>
                      </div>
                    );
                  },
                )}
            </div>

            <div className="flex justify-center items-center w-[100px] px-1 py-1 hover:text-rose-500 active:text-rose-700">
              <MdDragIndicator />
            </div>
          </DraggableListItem>
        );
      })
    );
  };

  const onSaveRanking = () => {
    const payload = state.map((row, index: number) => ({
      id: row.id,
      rank: index + 1,
    }));
    update(payload);
  };

  return (
    <div className="flex flex-col items-start gap-10 bg-white rounded-xl shadow-md p-5">
      <section className="max-h-[90%] overflow-y-scroll w-full">
        <div className=" text-lg text-left  div-auto">
          {/* <div className="flex flex-col border b-10 bg-white"> */}
          <div className="w-full flex flex-col gap-3 p-5 pb-0">
            <ul className=" mb-3 ">
              <li className="flex gap-2">
                <div className="w-5 h-5 mt-[3px] bg-yellow-100"></div>
                <div className="md:text-wrap text-nowrap">
                  Users without a match for more than two months.
                </div>
              </li>

              <li className="flex gap-2">
                <div className="w-5 h-5 mt-[3px] bg-primary-100"></div>
                <div className="md:text-wrap text-nowrap">
                  Users who haven&apos;t uploaded any pictures of themselves.
                </div>
              </li>
            </ul>
          </div>
          {/* </div> */}

          <header className="flex text-md text-neutral-700 uppercase bg-neutral-50 border border-x-10 ">
            <div className="w-[200px] px-1 py-3 pl-3">Ranking</div>

            <div className="w-[300px] px-1 py-3">Name</div>

            <div className="w-[300px] px-1 py-3">GPT Score</div>

            <div className="w-[300px] px-1 py-3">Current Ranks</div>

            <div className="w-[100px] px-1 py-3 pr-3">Actions</div>
          </header>

          <section className="bg-white text-neutral-500 border b-10 ">
            <DraggableList
              items={getTableRows()}
              onDragEnd={({ destination, source }) =>
                handlers.reorder({
                  from: source.index,
                  to: destination?.index || 0,
                })
              }
            />
          </section>
        </div>
      </section>

      <div className="flex justify-end w-full">
        <Button className="" onClick={onSaveRanking} isLoading={updateLoading}>
          Save
        </Button>
      </div>
    </div>
  );
}
