"use client";
import { NavbarLayout, MessageLayout } from "@/layouts";
import Image from "next/image";
import GreenCheck from "@/assets/GreenCheck.png";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Link } from "@/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EmailVerificationBody } from "@/api/types";
import { requestNewEmailVerification } from "@/api";
import { TextSkeleton } from "@/components/TextSkeleton";
import { twMerge } from "tailwind-merge";

export default function Verify() {
  const emailSearchParam = useQuery({
    queryKey: ["getEmailSearchParam"],
    queryFn: () => {
      return Object.fromEntries(new URLSearchParams(document.location.search))
        .email;
    },
  });
  const emailVerificationMutation = useMutation({
    mutationFn: async (data: EmailVerificationBody) => {
      return await requestNewEmailVerification(data);
    },
    onSuccess(response) {
      toast.success(response.message);
    },
  });

  return (
    <NavbarLayout>
      <MessageLayout>
        <div className="w-full flex justify-center flex-col items-center text-center">
          {emailSearchParam.data ? (
            <>
              <div className="mb-4">
                <h1>
                  Verification email has been sent to{" "}
                  <span className="bold">{emailSearchParam.data}</span>. <br />
                  Please check your email.
                </h1>
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
                  onClick={() =>
                    emailVerificationMutation.mutate({
                      email: emailSearchParam.data,
                    })
                  }
                  disabled={emailVerificationMutation.isPending}
                >
                  <TextSkeleton
                    as="span"
                    showText={!emailVerificationMutation.isPending}
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
