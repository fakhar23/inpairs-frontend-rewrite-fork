"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, CloudinaryImage } from "@/components";
import { UserOptions } from "./UserOptions";
import Pin from "@/assets/pin.svg";
import { ProfileDataResponse } from "@/api/types";
import { Skeleton } from "@/components";
import { Divider } from "@mui/material";

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
    <section className="absolute left-[5rem] top-[-3rem] bg-white p-[2rem] md:px-[1rem] w-[22%] rounded-xl shadow-md md:static flex flex-col md:flex-row md:w-full flex-wrap gap-[1rem]">
      <div className="md:w-full md:flex md:flex-col md:gap-[2rem] md:items-center   space-y-4 ">
        <div className="w-full flex flex-col items-center md:flex-row gap-[1rem]">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={"12rem"}
            width={"100%"}
            style={{ margin: "auto" }}
            isLoading={isLoading}
            className="max-w-[12rem]"
          >
            <CloudinaryImage
              alt={`${first_name} ${last_name} gallery`}
              url={images?.[0]}
              width={240}
              height={240}
              fallback={FALLBACK_IMAGE_URL}
              loading="eager"
              className="w-[15rem] h-[15rem] object-cover rounded-xl md:w-[12rem] md:h-[12rem] m-auto"
            />
          </Skeleton>

          <div className="w-full flex flex-col items-center md:items-start">
            <Skeleton
              variant="rounded"
              animation="wave"
              className="mb-[1rem] max-w-[12rem]"
              width={"100%"}
              height={30}
              isLoading={isLoading}
            >
              <h2 className="md:w-min font-bryant font-bold text-xl mb-2.5 leading-tight text-center md:text-left">
                {first_name} {last_name || ""}
              </h2>
            </Skeleton>

            <div className="w-full max-w-[14rem] md:flex-col-reverse items-start font-bryant font-medium  flex item-center gap-2">
              <Skeleton
                variant="rounded"
                animation="wave"
                className="mb-[1rem] max-w-[12rem] mx-auto"
                width={"100%"}
                height={30}
                isLoading={isLoading}
              >
                <p>{age} Years</p>
                <div className="grow border-r-1 border-solid border-secondary" />{" "}
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
              </Skeleton>
            </div>
          </div>
        </div>
      </div>

      <Divider className="w-full" orientation="horizontal" />

      <section className="w-full flex flex-col justify-between items-center space-y-5">
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
              className="w-[7rem] h-[7rem] object-cover rounded-xl "
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
              className="w-[7rem] h-[7rem] object-cover rounded-xl "
            />
          </Skeleton>
        </div>

        {viewingTheirOwnProfile && (
          <Button className="mx-auto" onClick={() => router.push("/settings")}>
            Edit profile
          </Button>
        )}
      </section>
    </section>
  );
}
