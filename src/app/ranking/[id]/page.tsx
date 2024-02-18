/* eslint-disable @next/next/no-img-element */
"use client";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { Basics, GeneralInfo, Scales, UserInfo } from "../../profile";
import profileBg from "@/assets/profileBgC.png";
import { RankingTable } from "./RankingTable";
import { CloudinaryImage, Toast } from "@/components";
import { UserOptions } from "@/app/profile/UserOptions";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getMatchRanking } from "@/api";
import { RankingResult } from "@/api/types";
import { UserAnswer } from "../../../types/ranking";
import QuestionIds from "@/helpers/questionIds";
import { getAnswer } from "@/helpers";

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

const useGetMatchRanking = (userId: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.matchScoring, userId],
    queryFn: async () => {
      return await getMatchRanking(userId);
    },
    placeholderData: (previousData) => previousData,
  });
};

const RankingUser = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading: getLoading } = useGetMatchRanking(params.id);
  const { user, ranking }: RankingResult = data || { user: {}, ranking: [] };
  const userLifetime = user.created_at
    ? dayjs().diff(dayjs(user.created_at), "month")
    : 0;
  const matchCount = useMemo(() => {
    if (user.gender === "MALE") {
      return user.UserMatchedMales?.length;
    }
    if (user.gender === "FEMALE") {
      return user.UserMatchedFemales?.length;
    }
    return 0;
  }, [user]);
  const userAnswers = user?.UserAnswers || [];

  return (
    <UserProfileLayout>
      <Image
        src={profileBg}
        alt="profile background"
        className="absolute left-0 w-full h-full blur-3xl -z-10 top-[-7rem]"
      />
      <main className="flex flex-col p-10 gap-5">
        {true && (
          <Toast
            type="error"
            title="Note"
            message="Someone else has already ranked this profile!"
          />
        )}

        {true && (
          <Toast
            type="warn"
            title="Reminder"
            message="Check if a female user was ranked 1st for another
            user; if so, ensure she is not ranked 1st for the current user.
            The same applies to 2nd and 3rd rankings."
          />
        )}

        <div className="flex  bg-white rounded-xl py-8 px-5  shadow-md  gap-[1.5rem] border-b border-rose-200 ">
          <div className="flex flex-col gap-4 w-fit">
            <h2 className="font-bryant font-bold  text-xl text-center mb-2.5 leading-tight">
              {user?.first_name}
              {true && (
                <div className="text-sm text-neutral-500">
                  Matched {matchCount} time in {userLifetime} months
                </div>
              )}
            </h2>

            <div className="flex gap-5">
              {!!user.images?.length &&
                user.images.map((url: string, i: number) => (
                  <CloudinaryImage
                    key={url}
                    url={url}
                    width={112}
                    height={112}
                    fallback={FALLBACK_IMAGE_URL}
                    className="w-[7rem] h-[7rem] object-cover rounded-xl md:w-[5rem] md:h-[5rem]"
                  />
                ))}
            </div>
            <UserOptions answers={userAnswers} />
          </div>

          <div className="flex grow gap-4 justify-around [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem] [&>*]:shadow-md md:w-full">
            <GeneralInfo
              title="About me"
              isLoading={getLoading}
              content={getAnswer(userAnswers, "AboutYourself")}
              // editable
            />
            <GeneralInfo
              title="Passions"
              isLoading={getLoading}
              content={getAnswer(userAnswers, "Passion")}
              // editable
            />
            <GeneralInfo
              title="Interests"
              isLoading={getLoading}
              content={getAnswer(userAnswers, "Interests")}
              // editable
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="max-w-[60%] ">
            <RankingTable ranking={ranking} isRanked={user?.ranked} />
          </div>

          <div className="w-full flex flex-col [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem]  [&>*]:shadow-md [&_div]:flex [&_div]:justify-around [&_div]:gap-[1.5rem] [&_div]:border-b [&_div]:border-rose-200 [&_div]:p-[0.5rem] [&_div>*]:w-[50%] md:w-full">
            <Basics isLoading={getLoading} answers={userAnswers} />
            <Scales isLoading={getLoading} answers={userAnswers} />
          </div>
        </div>
      </main>
      <section className=""></section>
    </UserProfileLayout>
  );
};

export default RankingUser;
