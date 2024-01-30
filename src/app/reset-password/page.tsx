"use client";
import { Button } from "@/components";
import { Input } from "@/components";
import { FormsLayout, NavbarLayout } from "@/layouts";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ResetPassword } from "@/api/types";
import { resetPassword } from "@/api";

type FormValues = {
  email: string;
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const resetMutation = useMutation({
    mutationFn: async (payload: ResetPassword) => {
      return await resetPassword(payload);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  return (
    <NavbarLayout>
      <FormsLayout>
        <form
          onSubmit={handleSubmit((payload) => resetMutation.mutate(payload))}
          className="flex flex-col items-start p-[2rem] gap-[1rem] md:[&>*]:w-full md:p-[1rem]"
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
              isDisabled={resetMutation.isPending}
              isLoading={resetMutation.isPending}
              content="Reset Password"
            />
          </div>
        </form>

        <p className="text-start m-2">
          You don&apos;t have an account?{" "}
          <Link href="/register">
            <span className="text-red">Create an account</span>
          </Link>
        </p>
      </FormsLayout>
    </NavbarLayout>
  );
}
