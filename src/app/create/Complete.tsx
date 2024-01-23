"use client";
import { useRouter } from "next/navigation";

const Complete = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-[5rem] w-[5rem] rounded-full text-white bg-red500 text-3xl flex justify-center items-center mb-[2rem]">
        &#x2713;
      </div>
      <h3 className="text-red uppercase text-2xl font-semibold">
        Congratulations!
      </h3>
      <p className="text-gray-gunmetal mb-[2rem] text-xl">
        Your profile has been created
      </p>
      <button
        className="bg-white text-gray-gunmetal py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-rose200 hover:bg-slate500 hover:text-white transition duration-200 ease-in-out"
        onClick={() => router.push(`/profile/me`)}
      >
        Go to your profile
      </button>
    </div>
  );
};

export default Complete;
