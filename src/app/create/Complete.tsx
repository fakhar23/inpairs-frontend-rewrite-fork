"use client";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

const Complete = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-[5rem] w-[5rem] rounded-full text-white bg-red-500 text-3xl flex justify-center items-center mb-[2rem]">
        &#x2713;
      </div>
      <h3 className="text-red-500 uppercase text-2xl font-semibold">
        Congratulations!
      </h3>
      <p className="text-gray-gunmetal mb-[2rem] text-xl">
        Your profile has been created
      </p>
      <Button
        className="rounded-md"
        onClick={() => router.push(`/profile/me`)}
        variant="outlined"
      >
        Go to your profile
      </Button>
    </div>
  );
};

export default Complete;
