"use client";

import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { Button, CloudinaryImage, Input, Modal } from "@/components";
import { Score } from "@/types/scorings";
import { MatchPairPopper } from "../profile/MatchPairPopper";
import DraggableList from "@/components/DraggableList/DraggableList";
import DraggableListItem from "@/components/DraggableList/DraggableListItem";
import { useListState } from "@mantine/hooks";
import { twMerge } from "tailwind-merge";

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

type Props = {
  scoring: any;
  userId?: string;
  // handleSave: () => void;
  // onClose: () => void;
  // submitLoading: boolean;
  isRanked: boolean;
  userInfo: Record<string, any>;
};

export function RankingTable(props: Props, ref: any) {
  const [state, handlers] = useListState(props.scoring.topPotentials);
  const [editable, setEditable] = useState<boolean[]>(
    Array.from<boolean>({ length: state.length }).fill(false)
  );

  const getTableRows = () => {
    return state.map((potential: any, index: number) => {
      return (
        <DraggableListItem
          id={potential.UserMatch.email}
          index={index}
          key={potential.UserMatch.auth_id}
          className={twMerge(
            "flex bg-white border-b",
            !potential.images.length
              ? "bg-[#fee2e2]"
              : potential.less_fortunate
                ? "bg-[#fef9c3]"
                : ""
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
          </div>

          <div className="w-[300px] px-1 flex items-center py-1">
            {potential.gptScore}
          </div>

          <div className="w-[300px] px-1 py-1">
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
          </div>

          <div className="flex justify-center items-center w-[100px] px-1 py-1 hover:text-rose-500 active:text-rose-700">
            <MdDragIndicator />
          </div>
        </DraggableListItem>
      );
    });
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
        <Button className="" onClick={() => undefined}>
          Save
        </Button>
      </div>
    </div>
  );
}
