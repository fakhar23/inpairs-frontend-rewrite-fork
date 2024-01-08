"use client";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="h-[20rem] md:h-[50vh] w-screen flex justify-center">
        <div className="w-[90%] shadow-xl flex justify-center flex-col items-center gap-10">
          <p className={`text-large font-funky md:text-[30px]`}>
            Page is not found 404
          </p>
          <Button content={"Home"} path="/" />{" "}
        </div>
      </div>
    </div>
  );
}
