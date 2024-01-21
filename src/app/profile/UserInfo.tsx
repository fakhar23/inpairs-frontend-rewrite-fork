"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { RankingList } from "./RankingList";
import { CloudinaryImage } from "@/components";
import Pin from "@/assets/pin.svg";

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

export function UserInfo({
  ranking,
  hideEdit,
  questionsModal,
  onlyShowFirstName = false,
}: {
  ranking: boolean;
  user_id?: string;
  hideEdit?: boolean;
  questionsModal?: object;
  onlyShowFirstName?: boolean;
}) {
  const router = useRouter();

  return (
    <section className="absolute left-[5rem] top-[-3rem] bg-white p-[2rem] w-[22%] rounded-xl shadow-md md:static flex flex-col md:flex-row md:w-full flex-wrap md:gap-[2rem]">
      <div className="md:w-full md:flex md:gap-[2rem] md:items-center md:border-b md:border-slate-300 space-y-4 mb-4">
        <CloudinaryImage
          alt=""
          url={""}
          width={240}
          height={240}
          fallback={FALLBACK_IMAGE_URL}
          loading="eager"
          className="w-[15rem] h-[15rem] object-cover rounded-xl mb-[2rem] md:w-[12rem] md:h-[12rem] m-auto"
        />

        <div className="mb-[1rem]">
          <h2 className="font-bryantProBold text-xl text-center mb-2.5 leading-tight">
            firstName lastName if user role is user
            {true && (
              <div className="text-sm text-neutral-500">
                Matched totalMatch time in number months
              </div>
            )}
          </h2>

          <div className="font-bryantProMedium flex item-center gap-2">
            <p>1 Years</p>
            <div className="grow border-r-1 border-solid border-primaryPurple" />{" "}
            <div className="grow flex gap-1 items-center justify-between">
              <Image
                src={Pin}
                alt="location"
                className="grow object-contain"
                style={{
                  width: "1rem",
                  height: "1.25rem",
                }}
              />

              <p>currentLocation</p>
            </div>
          </div>
        </div>
        {!hideEdit ? (
          <button
            className="font-bryantProMedium bg-red-500 text-white px-[2rem] py-[0.3rem] rounded-3xl text-[1.3rem] shadow-[0_12px_10px_rgba(0,0,0,0.16)] focus:outline-none focus:shadow-outline hover:bg-lightRed hidden md:inline md:ml-auto"
            onClick={() => router.push("/settings")}
          >
            Edit profile
          </button>
        ) : null}
      </div>

      <section className="md:w-full md:flex md:justify-between md:items-center space-y-5">
        <div className="flex justify-center md:items-start gap-[1rem] w-full md:w-auto md:mb-auto">
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

        <div className="flex justify-center items-center gap-[0.7rem] flex-col">
          {ranking ? (
            <RankingList />
          ) : !hideEdit ? (
            <button
              className="bg-red-500 text-white px-[2rem] py-[0.3rem] rounded-3xl text-[1.3rem] shadow-[0_12px_10px_rgba(0,0,0,0.16)] focus:outline-none focus:shadow-outline hover:bg-lightRed md:hidden"
              onClick={() => router.push("/settings")}
            >
              Edit Profile
            </button>
          ) : null}
          <div className="mt-5" />
        </div>
      </section>
    </section>
  );
}
