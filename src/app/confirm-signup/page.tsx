"use client";
import { requestNewEmailVerification } from "@/api";
import { EmailVerificationBody } from "@/api/interfaces";
import { TextSkeleton } from "@/components/TextSkeleton";
import { NavbarLayout, MessageLayout } from "@/layouts";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import GreenCheck from "@/assets/GreenCheck.png";

export default function ConfirmSignUp() {
  const error = "";

  console.log({ x: useParams() });
  const emailVerificationMutation = useMutation({
    mutationFn: async (data: EmailVerificationBody) => {
      return await requestNewEmailVerification(data);
    },
    onSuccess(response) {
      toast.success(response.data.message);
    },
  });

  return (
    <NavbarLayout>
      <MessageLayout>
        <div className="w-full flex justify-center flex-col items-center text-center">
          {error ? (
            <>
              <div className="mb-4">
                <h1>{error}</h1>
              </div>
              <div className="h-24 w-24 mb-4">
                <Image src={GreenCheck} alt="green check" />
              </div>
              <div>
                Haven&apos;t received it?{" "}
                <button
                  className={twMerge(
                    "text-blue-500 hover:underline",
                    emailVerificationMutation.isPending ? "" : "cursor-pointer"
                  )}
                  //   onClick={() => emailVerificationMutation.mutate({ email })}
                  //   disabled={emailVerificationMutation.isPending}
                >
                  <TextSkeleton
                    as="span"
                    showText
                    // showText={!emailVerificationMutation.isPending}
                  >
                    Request a new Verification email
                  </TextSkeleton>
                </button>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <h1 className="bold">You're not authorized to view this page</h1>
              <Link href="/" className="text-red">
                Visit Home
              </Link>
            </div>
          )}
        </div>
      </MessageLayout>
    </NavbarLayout>
  );
}
