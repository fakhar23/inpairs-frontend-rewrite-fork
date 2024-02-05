"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormsLayout, NavbarLayout } from "@/layouts";
import { Button, Input } from "@/components";
import { SetPassword } from "@/api/types";
import { setPassword } from "@/api";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const SetNewPassword = () => {
  const router = useRouter();

  const getAccessToken = useQuery({
    queryKey: ["get-window-hash"],
    queryFn: async () => {
      const hashParams = Object.fromEntries(
        new URLSearchParams(window.location.hash.slice(1)).entries()
      );
      if ("error_description" in hashParams) {
        toast.error(hashParams.error_description);
        setTimeout(() => {
          router.push("/reset-password");
        }, 2000);
        return { error: hashParams.error_description };
      } else {
        const accessToken =
          "access_token" in hashParams ? hashParams.access_token : "";
        return { accessToken };
      }
    },
  });

  const setPasswordMutation = useMutation({
    mutationFn: async (payload: SetPassword) => {
      return await setPassword(payload);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  return (
    <NavbarLayout>
      <FormsLayout>
        <form
          onSubmit={handleSubmit((payload) => {
            if (getAccessToken.data?.accessToken)
              setPasswordMutation.mutate({
                token: getAccessToken.data.accessToken,
                password: payload.password,
              });
          })}
          className="flex flex-col items-start gap-[1rem] md:[&>*]:w-full md:p-[1rem]"
        >
          <p className="font-bold mb-4">Enter your new password</p>
          <div className="w-full mb-2 relative">
            <Input
              error={errors.password}
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                },
              })}
            />
          </div>

          <div className="w-full mb-2 relative">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
          </div>
          <div className="flex w-full justify-center mt-3">
            <Button
              isDisabled={setPasswordMutation.isPending}
              isLoading={setPasswordMutation.isPending}
            >
              Update Password
            </Button>
          </div>
        </form>

        <p className="text-start mt-4">
          You don&quot;t have an account?{" "}
          <Link href="/register">
            <span className="text-red-500">Create an account</span>
          </Link>
        </p>
      </FormsLayout>
    </NavbarLayout>
  );
};

export default SetNewPassword;
