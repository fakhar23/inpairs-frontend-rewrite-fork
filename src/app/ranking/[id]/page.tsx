"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { Basics, GeneralInfo, Scales, UserInfo } from "../../profile";
import profileBg from "@/assets/profileBgC.png";
import { RankingTable } from "../RankingTable";
import { CloudinaryImage, Toast } from "@/components";
import { UserOptions } from "@/app/profile/UserOptions";

// TODO: Static data to show the UI, needs backend integration
const potential = {
  topPotentials: [
    {
      id: 100546,
      less_fortunate: true,
      matched_user_id: 1328,
      rank: 1,
      score: 0,
      user_id: 7,
      gptScore: 90,
      gptReason:
        "Aruna and Bilal both prioritize Islam in their lives and are looking for a partner who shares the same values. They both have a strong interest in history and traveling, which can provide them with common ground for shared experiences. They are both family-oriented and career-driven, which aligns with each other's values and goals. Their shared passion for philanthropy and dedication to their faith can create a strong foundation for a meaningful and compatible relationship.",
      images: [""],
      match_total: 0,
      member_months: 5,
      potentional_match: 16,
      first: [],
      second: [],
      third: [],
      type: "Taller or = 5’8, well dressed, maintained hygiene i.e beard is taken care of",
      UserMatch: {
        id: 1328,
        email: "arunaiqbal@mailinator.com",
        role: "USER",
        gender: "FEMALE",
        disabled: false,
        deleted: false,
        verified: false,
        active: false,
        dob: "1998-05-27T00:00:00.000Z",
        username: "Aruna",
        deletedBy: null,
        auth_id: "4cbb32b7-0314-481b-a2c8-e689123cec42",
        created_at: "2023-08-28T02:07:03.200Z",
        deleted_at: null,
        disabled_at: null,
        first_name: "Aruna ",
        in_pool: false,
        last_name: "Iqbal",
        phone_number: "+19168959281",
        profile_completed: false,
        profile_completion_percentage: 0,
        sharable_id: "4cbb32b7-0314-481b-a2c8-e689123cec42",
        updated_at: null,
        completed_first_form: true,
        completed_second_form: true,
        subscribed: true,
        isBetaUser: false,
        paymentFilled: true,
        howDidYouHearAboutUs: "TikTok (Zachariah)",
        ranked: false,
        ranked_at: null,
      },
    },
    {
      id: 100547,
      less_fortunate: false,
      matched_user_id: 2208,
      rank: 2,
      score: 0,
      user_id: 7,
      gptScore: 90,
      gptReason:
        "Bilal and Alaa seem to have a strong compatibility in terms of their dedication to Islam and their desire to grow spiritually. They both prioritize their prayers, Quranic study, and involvement in their Muslim community. Additionally, they both have a passion for healthcare and giving back to their community, which shows a shared sense of responsibility and empathy. Their shared interests in history, running, and involvement in social activities also provide a strong foundation for a potential relationship. The only potential point of contention could be Alaa's desire for her partner to be involved in med/dental school or already in training, which may not align with Bilal's current status as a first year medical student.",
      images: [""],
      match_total: 6,
      member_months: 4,
      potentional_match: 8,
      first: [],
      second: [],
      third: [],
      type: "They don't have to be super tall, but at least 5'8\". Also looking for someone physically fit. I like to run long distances (marathon/half marathons), work out, and eat healthy, so this is important to me. Also ideally fairer skinned, but that's not a deal breaker I guess.",
      UserMatch: {
        id: 2208,
        email: "alaamalik163@mailinator.com",
        role: "USER",
        gender: "FEMALE",
        disabled: false,
        deleted: false,
        verified: false,
        active: false,
        dob: "1999-08-10T00:00:00.000Z",
        username: "amali5",
        deletedBy: null,
        auth_id: "fb38064d-55cf-47df-9b50-db415734bad7",
        created_at: "2023-09-06T23:31:55.136Z",
        deleted_at: null,
        disabled_at: null,
        first_name: "Alaa",
        in_pool: false,
        last_name: "Malik",
        phone_number: "+8565043572428",
        profile_completed: false,
        profile_completion_percentage: 0,
        sharable_id: "fb38064d-55cf-47df-9b50-db415734bad7",
        updated_at: null,
        completed_first_form: true,
        completed_second_form: true,
        subscribed: true,
        isBetaUser: false,
        paymentFilled: true,
        howDidYouHearAboutUs: "Instagram (Zachariah)",
        ranked: false,
        ranked_at: null,
      },
    },
    {
      id: 100548,
      less_fortunate: true,
      matched_user_id: 3021,
      rank: 3,
      score: 0,
      user_id: 7,
      gptScore: 90,
      gptReason:
        "Bilal and Kanzah both have a strong commitment to their Islamic faith and are looking for a partner who shares the same values. They both come from families that have instilled a deep connection to Islam in their upbringing. Additionally, they both have a passion for learning and personal growth, as well as a strong sense of community and family. Their shared interests in history, mental health, and artistic hobbies provide a strong foundation for a deep and meaningful connection.",
      images: [""],
      match_total: 0,
      member_months: 3,
      potentional_match: 5,
      first: [],
      second: [],
      third: [],
      type: "Full beard, modest dressing. Tall (not required but a plus!), stocky/dad bod lol. Nice smile.",
      UserMatch: {
        id: 3021,
        email: "kanzahrashid622@mailinator.com",
        role: "USER",
        gender: "FEMALE",
        disabled: false,
        deleted: false,
        verified: false,
        active: false,
        dob: "1998-06-22T00:00:00.000Z",
        username: "k_rashid",
        deletedBy: null,
        auth_id: "2f00f6df-e231-48d0-a46e-915236ee064a",
        created_at: "2023-10-28T19:46:10.491Z",
        deleted_at: null,
        disabled_at: null,
        first_name: "Kanzah",
        in_pool: false,
        last_name: "Rashid",
        phone_number: "+18475290622",
        profile_completed: false,
        profile_completion_percentage: 0,
        sharable_id: "2f00f6df-e231-48d0-a46e-915236ee064a",
        updated_at: null,
        completed_first_form: true,
        completed_second_form: true,
        subscribed: true,
        isBetaUser: false,
        paymentFilled: true,
        howDidYouHearAboutUs: "Reddit",
        ranked: false,
        ranked_at: null,
      },
    },
    {
      id: 100549,
      less_fortunate: false,
      matched_user_id: 3236,
      rank: 4,
      score: 0,
      user_id: 7,
      gptScore: 80,
      gptReason:
        "Safa and Bilal both have a strong passion for their faith and are dedicated to their Islamic studies. They both come from families where Islam is central to their upbringing, and they are looking for a partner who shares these values. They also both enjoy spending time with family and have similar interests in watching sports and spending time with loved ones. While they may have some differences in their cultural backgrounds, their shared commitment to their faith and family make them highly compatible.",
      images: [],
      match_total: 2,
      member_months: 2,
      potentional_match: 11,
      first: [],
      second: [],
      third: [],
      type: "5’8 or above. Not bald/balding. Fair skinned.",
      UserMatch: {
        id: 3236,
        email: "safailyas3@mailinator.com",
        role: "USER",
        gender: "FEMALE",
        disabled: false,
        deleted: false,
        verified: false,
        active: false,
        dob: "1999-12-17T00:00:00.000Z",
        username: "silyas",
        deletedBy: null,
        auth_id: "4effc537-d71e-4cd3-b4f6-ba401efa41ab",
        created_at: "2023-11-16T23:20:46.065Z",
        deleted_at: null,
        disabled_at: null,
        first_name: "Safa",
        in_pool: false,
        last_name: "Ilyas",
        phone_number: "+15167848797",
        profile_completed: false,
        profile_completion_percentage: 0,
        sharable_id: "4effc537-d71e-4cd3-b4f6-ba401efa41ab",
        updated_at: null,
        completed_first_form: true,
        completed_second_form: true,
        subscribed: true,
        isBetaUser: false,
        paymentFilled: true,
        howDidYouHearAboutUs: "Mawadda",
        ranked: false,
        ranked_at: null,
      },
    },
    {
      id: 100550,
      less_fortunate: false,
      matched_user_id: 1657,
      rank: 5,
      score: 0,
      user_id: 7,
      gptScore: 70,
      gptReason:
        "Bilal and Zanaib both have a strong emphasis on Islam in their lives and value family. They both enjoy spending time with family and have a passion for helping others. However, there may be some differences in their interests and hobbies, as Bilal enjoys sports and history while Zanaib is more focused on cooking, reading, and volunteering. Overall, their shared values and goals make them a good match with potential for a serious relationship.",
      images: [""],
      match_total: 3,
      member_months: 5,
      potentional_match: 16,
      first: [],
      second: [],
      third: [],
      type: "I really want a kind hearted human. Physical wise I’d like him to be taller than me for sure (I’m short so that’s not hard) just really want our personalities to quick and vibe well and just click in all ways.",
      UserMatch: {
        id: 1657,
        email: "zanaib24@mailinator.com",
        role: "USER",
        gender: "FEMALE",
        disabled: false,
        deleted: false,
        verified: false,
        active: false,
        dob: "1999-08-02T00:00:00.000Z",
        username: "Zanali",
        deletedBy: null,
        auth_id: "d95fd3fe-7d92-4496-b37e-5388e372273d",
        created_at: "2023-08-31T04:09:30.027Z",
        deleted_at: null,
        disabled_at: null,
        first_name: "Zanaib",
        in_pool: false,
        last_name: "Ali",
        phone_number: "+12797997877",
        profile_completed: false,
        profile_completion_percentage: 0,
        sharable_id: "d95fd3fe-7d92-4496-b37e-5388e372273d",
        updated_at: null,
        completed_first_form: true,
        completed_second_form: true,
        subscribed: true,
        isBetaUser: false,
        paymentFilled: true,
        howDidYouHearAboutUs: "TikTok Live",
        ranked: false,
        ranked_at: null,
      },
    },
    {
      id: 100551,
      less_fortunate: false,
      matched_user_id: 3448,
      rank: 6,
      score: 0,
      user_id: 7,
      gptScore: 70,
      gptReason:
        "Bilal and Zainab both have a strong commitment to their faith and family, which is a solid foundation for a potential relationship. They both have a passion for helping others, with Bilal's interest in medicine and Zainab's desire to help vulnerable individuals. They also share common interests in history, reading, and baking. However, they may need to work on communication and understanding each other's introverted nature, as well as Zainab's desire for her partner to be good with kids and have a good sense of humor.",
      images: [""],
      match_total: 0,
      member_months: 2,
      potentional_match: 8,
      first: [],
      second: [],
      third: [],
      type: "light brown hair, light / colored eyes, fit, taller than 5'8, shorter than 6'1, short beard / stubble, good sense of style,",
      UserMatch: {
        id: 3448,
        email: "zainabirfan11@mailinator.com",
        role: "USER",
        gender: "FEMALE",
        disabled: false,
        deleted: false,
        verified: false,
        active: false,
        dob: "2000-12-23T00:00:00.000Z",
        username: "zainabirfan11@gmail.com",
        deletedBy: null,
        auth_id: "d641a097-bb71-4534-9a5e-d021d7aacd02",
        created_at: "2023-11-28T00:18:39.525Z",
        deleted_at: null,
        disabled_at: null,
        first_name: "zainab",
        in_pool: false,
        last_name: "irfan",
        phone_number: "+14073734932",
        profile_completed: false,
        profile_completion_percentage: 0,
        sharable_id: "d641a097-bb71-4534-9a5e-d021d7aacd02",
        updated_at: null,
        completed_first_form: true,
        completed_second_form: true,
        subscribed: true,
        isBetaUser: false,
        paymentFilled: true,
        howDidYouHearAboutUs: "TikTok (Zachariah)",
        ranked: false,
        ranked_at: null,
      },
    },
  ],
};

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

const Profile = ({ data }: any) => {
  const params = useParams<{ id: string }>();
  const user_id = params["id"] || "";
  const content = { answer: "", key: "", answer_id: 1 };

  const [ranking, setRanking] = useState<boolean>(true);
  const [canEdit, setCanEdit] = useState<boolean>(false);

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
              Mahdi abdulkareem user
              {true && (
                <div className="text-sm text-neutral-500">
                  Matched 3 time in 2 months
                </div>
              )}
            </h2>

            <div className="flex">
              <CloudinaryImage
                alt=""
                url={""}
                width={112}
                height={112}
                fallback={FALLBACK_IMAGE_URL}
                className="w-[7rem] h-[7rem] object-cover rounded-xl md:w-[5rem] md:h-[5rem]"
              />
              <CloudinaryImage
                alt=""
                url={""}
                width={112}
                height={112}
                fallback={FALLBACK_IMAGE_URL}
                className="w-[7rem] h-[7rem] object-cover rounded-xl md:w-[5rem] md:h-[5rem]"
              />
              <CloudinaryImage
                alt=""
                url={""}
                width={112}
                height={112}
                fallback={FALLBACK_IMAGE_URL}
                className="w-[7rem] h-[7rem] object-cover rounded-xl md:w-[5rem] md:h-[5rem]"
              />
            </div>
            <div className="ml-auto">
              <UserOptions />
            </div>
          </div>

          <div className="flex grow gap-4 justify-around   [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem] [&>*]:shadow-md md:w-full">
            {/* <GeneralInfo title="About me" content={content} canEdit={canEdit} />
            <GeneralInfo title="Passions" content={content} canEdit={canEdit} />
            <GeneralInfo
              title="Interests"
              content={content}
              canEdit={canEdit}
            /> */}
          </div>
        </div>

        <div className="flex gap-5">
          <div className="max-w-[70%] ">
            <RankingTable
              scoring={potential}
              userId={user_id}
              isRanked={true}
              userInfo={{}}
            />
          </div>

          <div className="flex flex-col [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem]  [&>*]:shadow-md [&_div]:flex [&_div]:justify-around [&_div]:gap-[1.5rem] [&_div]:border-b [&_div]:border-rose-200 [&_div]:p-[0.5rem] [&_div>*]:w-[50%] md:w-full">
            {/* <Basics /> */}
            {/* <Scales /> */}
          </div>
        </div>
      </main>
      <section className=""></section>
    </UserProfileLayout>
  );
};

export default Profile;
