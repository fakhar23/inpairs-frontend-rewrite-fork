"use client";
import { Button } from "@/components";
import { Input } from "@/components";
import { FormsLayout, NavbarLayout } from "@/layouts";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ResetPassword } from "@/api/types";
import { requestNewEmailVerification, resetPassword } from "@/api";
import { useParams } from "next/navigation";

type FormValues = {
  email: string;
};

export default function ResetPassword() {
  const params = useParams<{
    for: "reset-password" | "request-verification-email";
  }>();
  const action = params["for"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: async (payload: ResetPassword) => {
      if (action === "reset-password") {
        return await resetPassword(payload);
      } else if (action === "request-verification-email") {
        return await requestNewEmailVerification(payload);
      } else throw new Error("Un supported action: " + action);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  const buttonContent =
    action === "request-verification-email"
      ? "Confirm Email"
      : "Reset password";

  return (
    <NavbarLayout>
      <FormsLayout>
        <form
          onSubmit={handleSubmit((payload) => mutation.mutate(payload))}
          className="w-[300px] flex flex-col items-start gap-[1rem] md:[&>*]:w-full md:p-[1rem]"
        >
          <p className="font-bold mb-4">Enter your email</p>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
            })}
          />

          <div className="flex w-full justify-center mt-3">
            <Button
              isDisabled={mutation.isPending}
              isLoading={mutation.isPending}
            >
              {buttonContent}
            </Button>
          </div>
        </form>

        <p className="text-center text-xsmall mt-4">
          You don&apos;t have an account?{" "}
          <Link href="/register">
            <span className="text-red-500">Create an account</span>
          </Link>
        </p>
      </FormsLayout>
    </NavbarLayout>
  );
}
