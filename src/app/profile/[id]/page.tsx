"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { Basics, GeneralInfo, Scales, UserInfo } from "..";
import profileBg from "@/assets/profileBgC.png";
import { ENDPOINTS, getProfileData } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const params = useParams<{ id: string }>();
  const user_id = params["id"] || "";
  const profileData = useQuery({
    queryKey: [ENDPOINTS.profileData, user_id],
    queryFn: async () => {
      return await getProfileData(user_id);
    },
  });
  const stateOrCountry =
    profileData.data?.MainState ===
    "Outside the US (literally any other country)"
      ? profileData.data.MainCountry
      : profileData.data?.MainState;

  const currentLocation = `${profileData.data?.MainCity}, ${stateOrCountry}`;
  const [editable, setCanEdit] = useState<boolean>(user_id === "me");

  return (
    <UserProfileLayout>
      <section className="relative flex justify-end mx-auto px-[4rem] bg-profile bg-no-repeat	bg-cover [&_h2]:mb-[1rem] [&_h2]:text-purple [&_h2]:text-[2rem] [&_p]:text-gray-gunmetal md:flex-col sm:px-[1rem]">
        <Image
          src={profileBg}
          alt="profile background"
          className="absolute left-0 w-full h-full blur-3xl -z-10 top-[-7rem]"
        />
        <UserInfo
          {...profileData.data}
          currentLocation={currentLocation}
          viewingTheirOwnProfile={user_id === "me"}
        />

        <section className="flex flex-wrap h-auto resize-y justify-center w-[75%] px-[1rem] py-[3rem] md:w-full md:px-0 relative">
          {/* left column */}
          <div className="flex flex-col gap-8 mr-[2rem] w-[45%] [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem] [&>*]:shadow-md md:w-full">
            <GeneralInfo
              title="About me"
              content={{
                descriptor: "AboutYourself",
                answer: profileData.data?.AboutYourself || "",
              }}
              editable={editable}
            />
            <GeneralInfo
              title="Interests"
              content={{
                descriptor: "Interests",
                answer: profileData.data?.Interests || "",
              }}
              editable={editable}
            />
            <GeneralInfo
              title="Passions"
              content={{
                descriptor: "Passion",
                answer: profileData.data?.Passion || "",
              }}
              editable={editable}
            />
            <GeneralInfo
              title="Role of islam"
              content={{
                descriptor: "IslamRole",
                answer: profileData.data?.IslamRole || "",
              }}
              editable={editable}
            />
            <GeneralInfo
              title="Five year plan"
              content={{
                descriptor: "FiveYearPlan",
                answer: profileData.data?.FiveYearPlan || "",
              }}
              editable={editable}
            />
          </div>

          {/* Right column */}
          <div className="w-[45%] flex flex-col [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem]  [&>*]:shadow-md [&_div]:flex [&_div]:justify-around [&_div]:gap-[1.5rem] [&_div]:border-b [&_div]:border-rose-200 [&_div]:p-[0.5rem] [&_div>*]:w-[50%] md:w-full">
            <Basics {...profileData.data} currentLocation={currentLocation} />
            <Scales {...profileData.data} />
          </div>
        </section>
      </section>
    </UserProfileLayout>
  );
}
