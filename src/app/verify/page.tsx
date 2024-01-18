"use client";
import { NavbarLayout, MessageLayout } from "@/layouts";
import Image from "next/image";
import GreenCheck from "@/assets/GreenCheck.png";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { EmailVerificationBody } from "@/api/interfaces";
import { requestNewEmailVerification } from "@/api";
import { AxiosError } from "axios";

export default function Verify() {
  const email = useSearchParams().get("email");
  const emailVerificationMutation = useMutation({
    mutationFn: async (data: EmailVerificationBody) => {
      return await requestNewEmailVerification(data);
    },
    onError(error) {
      toast(
        (error instanceof AxiosError && error.response?.data?.message) ||
          error.message
      );
    },
    onSuccess(response) {
      toast(response.data.message);
    },
  });
  // async function handleRequestNewVerificationEmail() {
  //   try {
  //     //   await APIHelper.requestVerificationEmail({ email })
  //     toast.success("Verification email sent successfully");
  //   } catch (error) {
  //     toast.error("Could not send verification email");
  //   }
  // }

  return (
    <NavbarLayout
      containerClassName="h-[100vh] justify-start"
      contentClassName="h-screen"
    >
      <MessageLayout>
        <div className="w-full flex justify-center flex-col items-center text-center">
          {email ? (
            <>
              <div className="mb-4">
                <h1>
                  Verification email has been sent to{" "}
                  <span className="bold">{email}</span>. <br />
                  Please check your email.
                </h1>
              </div>
              <div className="h-24 w-24 mb-4">
                <Image src={GreenCheck} alt="green check" />
              </div>
              <div>
                Haven&apos;t received it?{" "}
                <button
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => emailVerificationMutation.mutate({ email })}
                >
                  Request a new Verification email
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
