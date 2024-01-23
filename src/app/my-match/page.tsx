"use client";

import { Fragment, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { UserProfileLayout } from "@/layouts";
import { UserInfo } from "../profile";
import MatchCard from "./MatchCard";
import { COLORS } from "../../../tailwind.config";

export type UserMatch =
  | {
      currentUser: string;
      match: string;
      name: string;
      age: number;
      image: string;
      currentUserResponse: string;
      matchResponse: string;
      phone_number: string;
      instagram_handle: string;
      response: string;
      currentWave: number;
      offsetWave: number;
      message: undefined;
    }
  | {
      currentUser: string;
      match: null;
      currentWave: number;
      offsetWave: number;
      message: string;
    };

const Match = () => {
  //   const { data: currentMatch, isLoading } = useGetMatch()
  const currentMatch = {
    match: {
      id: 2842,
      matchEntryId: 2843,
      note: null,
      get_end: false,
      isUserOne: true,
      match_viewed: true,
      profile_viewed: true,
      currentUser: "9cf8ca2b-51b6-4872-95d8-b7bd69913b7a",
      currentUserResponse: "PENDEING",
      match: "644a7438-4ea9-4d0c-a32d-1eb5d841a0b3",
      name: "Mohammed Rabah",
      firstName: "Mohammed",
      age: 29,
      response: "PENDEING",
      image: null,
      currentWave: 0,
      offsetWave: 1,
    },
    message: "success",
  };

  const isLoading = false;

  const [needToRefetch, setNeedToRefetch] = useState<boolean>(false);
  const today = new Date();
  const dayOfMonth = today.getDate();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const currentMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(today);
  const nextMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(nextMonth);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <ClipLoader
          color={COLORS.primaryColor}
          size={75}
          aria-label="Loading..."
        />
      </div>
    );
  }

  console.log({ currentMatch });

  return (
    <UserProfileLayout>
      {currentMatch?.match ? (
        <section className="relative flex justify-end mx-auto  md:flex-col sm:px-[1rem]">
          <UserInfo ranking={false} />

          <section className="flex flex-wrap h-auto resize-y w-[75%] md:w-full md:px-0 md:mt-3">
            <h2 className="font-bryantProMedium text-left ml-16 md:ml-4 text-[1.5rem] mt-2">
              Best Matches For You
            </h2>

            <div className="w-full  my-5 h-[11px] bg-offWhite mr-[-8rem] " />

            <div className="flex flex-wrap justify-between w-full  ">
              <Fragment key={currentMatch?.match.currentUser}>
                <MatchCard
                  user={currentMatch.match}
                  needToRefetch={needToRefetch}
                  setNeedToRefetch={setNeedToRefetch}
                />
                <div className="w-full my-5 h-[11px] bg-offWhite" />
              </Fragment>
            </div>
          </section>
        </section>
      ) : (
        <section className="w-[80%] p-5 py-[3rem] my-0 mx-auto">
          <h2 className="font-bryantProMedium text-[2rem] text-purple font-bold mb-[4rem]">
            Best Match For You
          </h2>

          <div className="w-[100%] h-[10rem] flex justify-center items-center shadow-xl">
            <p className="text-[20px] p-4">{currentMatch?.message}</p>
          </div>
        </section>
      )}
    </UserProfileLayout>
  );
};

export default Match;
