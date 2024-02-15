"use client";

import { Fragment, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { UserProfileLayout } from "@/layouts";
import { UserInfo } from "../profile";
import MatchCard from "./MatchCard";
import { COLORS } from "../../../tailwind.config";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getMatch } from "@/api";
import { useGetMatch } from "@/hooks/useGetMatch";

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
  const { profileData, currentLocation } = useProfile("me");
  const match = useGetMatch();

  if (match.isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <ClipLoader
          color={COLORS.primary.DEFAULT}
          size={75}
          aria-label="Loading..."
        />
      </div>
    );
  }

  return (
    <UserProfileLayout>
      {match.data?.matchedUserId ? (
        <section className="relative flex justify-end mx-auto  md:flex-col sm:px-[1rem]">
          <UserInfo
            {...profileData.data}
            isLoading={profileData.isLoading}
            currentLocation={currentLocation}
            viewingTheirOwnProfile
          />

          <section className="flex flex-wrap h-auto resize-y w-[75%] md:w-full md:px-0 md:mt-3">
            <h2 className="font-bryant font-medium  text-left ml-16 md:ml-4 text-[1.5rem] mt-2">
              Best Matches For You
            </h2>

            <div className="w-full  my-5 h-[11px] mr-[-8rem] " />

            <div className="flex flex-wrap justify-between w-full">
              <MatchCard />
              <div className="w-full my-5 h-[11px]" />
            </div>
          </section>
        </section>
      ) : (
        <section className="w-[80%] p-5 py-[3rem] my-0 mx-auto">
          <h2 className="font-bryantProMedium text-[2rem] text-title font-bold mb-[4rem]">
            Best Match For You
          </h2>

          <div className="w-[100%] h-[10rem] flex justify-center items-center shadow-xl">
            <p className="text-[20px] p-4">{match.data?.message}</p>
          </div>
        </section>
      )}
    </UserProfileLayout>
  );
};

export default Match;
