"use client";

import { SettingsLayout, UserProfileLayout } from "@/layouts";

import EditProfile from "./editProfile";
import { Card, Toast } from "@/components";

import { useGetAnswer } from "@/hooks/useGetAnswer";
import { useAuthContext } from "@/hooks/useAuthContext";
import { usePathname, useSearchParams } from "next/navigation";

const ProfileSettings = () => {
  const answers = useGetAnswer();

  console.log({ answers });

  return (
    <UserProfileLayout>
      <SettingsLayout>
        <div></div>
        {/* <EditProfile answers={answersObject} />; */}
        {/* <section className="w-[100%] p-10 py-[3rem] my-0 mx-auto md:w-[100%]">
          <h2 className="text-[2.5rem] text-title font-bold mb-[2rem]">
            Profile Settings
          </h2>

          <Toast
            type="warn"
            message={
              <p className="text-2xl">
                We're preparing to launch this page soon. Please revisit in the
                upcoming days for the latest updates!
              </p>
            }
          />
        </section> */}
      </SettingsLayout>
    </UserProfileLayout>
  );
};

export default ProfileSettings;
