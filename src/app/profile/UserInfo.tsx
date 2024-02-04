"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, CloudinaryImage } from "@/components";
import { UserOptions } from "./UserOptions";
import Pin from "@/assets/pin.svg";
import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";

const FALLBACK_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

export function UserInfo({
  images,
  age,
  first_name,
  last_name,
  currentLocation,
  viewingTheirOwnProfile,
  isLoading = true,
}: ProfileDataResponse & {
  viewingTheirOwnProfile: boolean;
  currentLocation: string;
  isLoading?: boolean;
}) {
  const router = useRouter();

  return (
    <section className="absolute left-[5rem] top-[-3rem] bg-white p-[2rem] w-[22%] rounded-xl shadow-md md:static flex flex-col md:flex-row md:w-full flex-wrap md:gap-[2rem]">
      <div className="md:w-full md:flex md:gap-[2rem] md:items-center md:border-b md:border-slate-300 space-y-4 mb-4">
        <Skeleton
          variant="rounded"
          animation="wave"
          height={"12rem"}
          width={"12rem"}
          style={{ margin: "auto" }}
          isLoading={isLoading}
        >
          <CloudinaryImage
            alt={`${first_name} ${last_name} gallery`}
            url={images?.[0]}
            width={240}
            height={240}
            fallback={FALLBACK_IMAGE_URL}
            loading="eager"
            className="w-[15rem] h-[15rem] object-cover rounded-xl mb-[2rem] md:w-[12rem] md:h-[12rem] m-auto"
          />
        </Skeleton>

        <Skeleton
          variant="rounded"
          animation="wave"
          className="mb-[1rem]"
          width={"100%"}
          height={30}
          isLoading={isLoading}
        >
          <div className="mb-[1rem]">
            <h2 className="font-bryantProBold text-xl text-center mb-2.5 leading-tight">
              {first_name} {last_name || ""}
            </h2>

            <div className="font-bryantProMedium flex item-center gap-2">
              <p>{age} Years</p>
              <div className="grow border-r-1 border-solid border-[#622466]" />{" "}
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
                <p>{currentLocation}</p>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>

      <section className="md:w-full md:flex md:justify-between md:items-center space-y-5">
        <div className="flex justify-center md:items-start gap-[1rem] w-full md:w-auto md:mb-auto">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={"7rem"}
            height={"7rem"}
            isLoading={isLoading}
          >
            <CloudinaryImage
              alt={`${first_name} ${last_name} gallery`}
              url={images?.[1]}
              width={112}
              height={112}
              fallback={FALLBACK_IMAGE_URL}
              className="w-[7rem] h-[7rem] object-cover rounded-xl md:w-[5rem] md:h-[5rem]"
            />
          </Skeleton>

          <Skeleton
            variant="rounded"
            animation="wave"
            width={"7rem"}
            height={"7rem"}
            isLoading={isLoading}
          >
            <CloudinaryImage
              alt={`${first_name} ${last_name} gallery`}
              url={images?.[2]}
              width={112}
              height={112}
              fallback={FALLBACK_IMAGE_URL}
              className="w-[7rem] h-[7rem] object-cover rounded-xl md:w-[5rem] md:h-[5rem]"
            />
          </Skeleton>
        </div>

        {viewingTheirOwnProfile && (
          <div className="flex justify-center items-center gap-[0.7rem] flex-col">
            <Button
              onClick={() => router.push("/settings")}
              content="Edit profile"
            />
            <div className="mt-5" />
          </div>
        )}
      </section>
    </section>
  );
}
