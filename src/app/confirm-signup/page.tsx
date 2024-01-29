"use client";
import { verifyToken } from "@/api";
import { NavbarLayout, MessageLayout } from "@/layouts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/components";
import Image from "next/image";
import GreenCheck from "@/assets/GreenCheck.png";
import { SplashScreen } from "@/components";

export default function ConfirmSignUp() {
  // http://localhost:3001/confirm-signup#access_token=eyJhbGci&expires_at=1705613682&expires_in=21600&refresh_token=Bjg2nI&token_type=bearer&type=signup
  // http://localhost:3001/confirm-signup#error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired
  const confirmation = useQuery({
    queryKey: ["get-window-hash"],

    queryFn: async () => {
      const hashParams = Object.fromEntries(
        new URLSearchParams(window.location.hash.slice(1)).entries()
      );
      if ("error_description" in hashParams) {
        return { error: hashParams.error_description };
      } else {
        const accessToken =
          "access_token" in hashParams ? hashParams.access_token : "";
        return (await verifyToken({ jwt: accessToken })).data;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return confirmation.isLoading ? (
    <SplashScreen />
  ) : (
    <NavbarLayout>
      <MessageLayout>
        <div className="w-full flex justify-center flex-col items-center text-center">
          {confirmation.isError ||
          (confirmation.data && "error" in confirmation.data) ? (
            <div className="mb-4">
              <h1>
                {(confirmation.data &&
                  "error" in confirmation.data &&
                  confirmation.data.error) ||
                  confirmation.error?.message}
                . Please{" "}
                <Link
                  href="/request-verification-email"
                  className="text-blue-500 hover:underline"
                >
                  request a new verification email
                </Link>
                .
              </h1>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h1>
                  Congratulations{" "}
                  <span className="text-blue-500">
                    {confirmation.data?.email}
                  </span>
                  ! Your email has been successfully confirmed.
                </h1>
              </div>
              <div className="h-24 w-24 mb-4">
                <Image src={GreenCheck} alt="green check" />
              </div>
              <div>
                Please proceed to the{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  login
                </Link>{" "}
                page to start using our service
              </div>
            </>
          )}
        </div>
      </MessageLayout>
    </NavbarLayout>
  );
}
