"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { Basics, GeneralInfo, Scales, UserInfo } from "..";
import profileBg from "@/assets/profileBgC.png";
import { useProfile } from "@/hooks/useProfile";
import { MessageLayout } from "@/layouts";

export default function Profile() {
  const params = useParams<{ id: string }>();
  const userId = params["id"] || "";

  const { profileData, currentLocation } = useProfile(userId);

  if (profileData.isError)
    return (
      <UserProfileLayout>
        <MessageLayout>
          <p className="text-center">
            Sorry but you're not authorized to view this profile
          </p>
        </MessageLayout>
      </UserProfileLayout>
    );

  return (
    <UserProfileLayout>
      <section className="relative flex justify-end mx-auto px-[2rem] bg-profile bg-no-repeat	bg-cover [&_h2]:mb-[1rem] [&_h2]:text-secondary [&_h2]:text-[2rem] [&_p]:text-gray-gunmetal md:flex-col sm:px-[1rem]">
        <Image
          src={profileBg}
          alt="profile background"
          className="absolute left-0 w-full h-full blur-3xl -z-10 top-[-7rem]"
        />
        <UserInfo
          {...profileData.data}
          isLoading={profileData.isLoading}
          currentLocation={currentLocation}
          viewingTheirOwnProfile={userId === "me"}
        />

        <section className="flex flex-wrap h-auto resize-y justify-center w-[75%] px-[1rem] py-[3rem] md:w-full md:px-0 relative">
          {/* left column */}
          <div className="flex flex-col gap-8 mr-[2rem] md:mr-0 md:mb-[3rem] w-[45%] [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem] [&>*]:shadow-md md:w-full">
            <GeneralInfo
              title="About me"
              content={{
                descriptor: "AboutYourself",
                answer: profileData.data?.AboutYourself || "",
              }}
              isLoading={profileData.isLoading}
            />
            <GeneralInfo
              title="Interests"
              content={{
                descriptor: "Interests",
                answer: profileData.data?.Interests || "",
              }}
              isLoading={profileData.isLoading}
            />
            <GeneralInfo
              title="Passions"
              content={{
                descriptor: "Passion",
                answer: profileData.data?.Passion || "",
              }}
              isLoading={profileData.isLoading}
            />
            <GeneralInfo
              title="Role of islam"
              content={{
                descriptor: "IslamRole",
                answer: profileData.data?.IslamRole || "",
              }}
              isLoading={profileData.isLoading}
            />
            <GeneralInfo
              title="Five year plan"
              content={{
                descriptor: "FiveYearPlan",
                answer: profileData.data?.FiveYearPlan || "",
              }}
              isLoading={profileData.isLoading}
            />
          </div>

          {/* Right column */}
          <div className="w-[45%] flex flex-col [&>*]:bg-white [&>*]:rounded-xl [&>*]:p-[1rem]  [&>*]:shadow-md [&_div]:flex [&_div]:justify-around [&_div]:gap-[1.5rem] [&_div]:border-b [&_div]:border-rose-200 [&_div]:p-[0.5rem] [&_div>*]:w-[50%] md:w-full">
            <Basics
              isLoading={profileData.isLoading}
              {...profileData.data}
              currentLocation={currentLocation}
            />
            <Scales isLoading={profileData.isLoading} {...profileData.data} />
          </div>
        </section>
      </section>
    </UserProfileLayout>
  );
}
