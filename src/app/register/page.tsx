"use client";
import { useState } from "react";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { Input, CountrySelect, LoadingButton } from "@/components";
import { FormsLayout, NavbarLayout } from "@/layouts";

import { HOW_DID_YOU_HEAR_ABOUT_US } from "./constants";
import { SignUpBody } from "@/api/interfaces";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const Register = () => {
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpBody) => {
      return await signUp(data);
    },
    onError(error) {
      toast(
        (error instanceof AxiosError && error.response?.data?.message) ||
          error.message
      );
    },
    onSuccess(response, formData) {
      toast(response.data.message);
      if (response.status === 201) {
        router.push(`verify?email=${formData.email}`);
      }
    },
  });
  const router = useRouter();
  const [whereDidYouHearAboutUs, setWhereDidYouHearAboutUs] =
    useState<string>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpBody>();

  return (
    <NavbarLayout>
      <FormsLayout>
        <div className={poppins.className}>
          <div className={`text-lg px-[2rem] ${poppins.className}`}>
            Create Your Account
          </div>

          <form
            onSubmit={handleSubmit((data) => signUpMutation.mutate(data))}
            className="flex flex-col items-start  px-[2rem] gap-[1rem]"
          >
            <Input
              formConfig={{ register }}
              id="email"
              type="email"
              placeholder="Email"
              errorMessage="Email is required"
              errors={errors}
            />
            <div className="w-full mb-2 relative">
              <Input
                formConfig={{
                  register,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                  },
                }}
                errorMessage="Password is required"
                errors={errors}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="w-full mb-2 relative">
              <Input
                formConfig={{
                  register,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                errorMessage="Confirm Password is required"
                errors={errors}
              />
            </div>

            <div className="flex gap-2 w-full md:w-full">
              <Input
                formConfig={{ register }}
                id="firstName"
                type="text"
                placeholder="First Name"
                errorMessage="First Name is required"
                errors={errors}
              />

              <Input
                formConfig={{ register }}
                id="lastName"
                type="text"
                placeholder="Last Name"
                errorMessage="Last Name is required"
                errors={errors}
              />
            </div>

            <div className="w-full mb-2 md:mt-[1rem] text-gray gap-1">
              <CountrySelect control={control} />

              <div className="border-b border-slate-400  w-full" />
              {errors.country && (
                <p className="text-red text-[0.8rem]">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="w-full mb-2 relative">
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Phone number is required", minLength: 11 }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className="appearance-none border-b  border-slate-400 text-gray-gunmetal leading-tight fne h-[3rem] w-full focus:placeholder-transparent focus:outline-none focus:border-red-500 bg-transparent md:h-[4rem] md:text-[12px]"
                    placeholder="Phone Number"
                    value={value}
                    onChange={onChange}
                    defaultCountry="US"
                    addInternationalOption={false}
                  />
                )}
              />

              {errors?.phoneNumber && (
                <p className="text-red text-[0.8rem]">
                  &quot;Invalid Phone Number&quot;
                </p>
              )}
            </div>

            <div className="w-full mb-2 relative">
              <label className="mb-3 md:text-[12px] md:mb-[1rem] text-gray-gunmetal">
                Date of birth
              </label>

              <Input
                formConfig={{
                  register,
                  validate: (value) => {
                    const today = new Date();
                    const birthDate = new Date(value);
                    const age = today.getFullYear() - birthDate.getFullYear();
                    const month = today.getMonth() - birthDate.getMonth();
                    if (
                      month < 0 ||
                      (month === 0 && today.getDate() < birthDate.getDate())
                    ) {
                      return age - 1 > 18 || "You must be 18 years and above";
                    }
                    return age > 18 || "You must be 18 years and above";
                  },
                }}
                errors={errors}
                errorMessage="Date of birth is required"
                id="dob"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                placeholder="Date of Birth"
              />
            </div>

            <div className="border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none py-[0.7rem] px-[0.5rem] w-full focus:placeholder-transparent focus:border-red-500">
              <p className="mb-3 md:text-[12px] md:mb-[1rem]">Gender</p>
              <div className="flex gap-5">
                <div className="flex items-center">
                  <input
                    id="female"
                    type="radio"
                    value="FEMALE"
                    className="w-4 h-4 text-red bg-neutral-100 border-neutral-500 focus:ring-red-500 focus:outline-none"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 text-sm font-bryantProMedium text-neutral-900 md:text-[12px]"
                  >
                    Female
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="male"
                    type="radio"
                    value="MALE"
                    className="w-4 h-4 text-red bg-neutral-100 border-neutral-500 focus:ring-red-500 focus:outline-none"
                    {...register("gender", { required: "Gender is required" })}
                  />

                  <label
                    htmlFor="male"
                    className="ml-2 text-sm font-bryantProMedium text-neutral-900 md:text-[12px]"
                  >
                    Male
                  </label>
                </div>
              </div>
            </div>

            {errors.gender && (
              <p className="text-red text-[0.8rem]">Select a gender</p>
            )}

            <div className="flex w-full mb-2 md:mt-[1rem] text-neutral-500 gap-1">
              <div className="flex flex-col w-full">
                <select
                  {...register("howDidYouHearAboutUs", {
                    required: "How did you hear about us is required",
                  })}
                  className={`w-full h-10 border-b focus:outline-none border-neutral-100 text-gray-gunmetal md:text-[12px] bg-white`}
                  id="howDidYouHearAboutUs"
                  onChange={(e) => setWhereDidYouHearAboutUs(e.target.value)}
                >
                  <option value="">Where did you hear about us?</option>
                  {HOW_DID_YOU_HEAR_ABOUT_US.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>

                {whereDidYouHearAboutUs !== "Other" &&
                  errors.howDidYouHearAboutUs && (
                    <p className="text-red text-[0.8rem]">
                      {errors?.howDidYouHearAboutUs?.message}
                    </p>
                  )}
              </div>
            </div>

            {whereDidYouHearAboutUs === "Other" && (
              <div className="flex w-full mb-2 md:mt-[1rem] text-neutral-500 gap-1">
                <div className="flex flex-col w-full">
                  <Input
                    formConfig={{ register }}
                    id="howDidYouHearAboutUs"
                    type="text"
                    placeholder="Please specify"
                    errorMessage="more details is required"
                    errors={errors}
                  />
                </div>
              </div>
            )}

            <div className="flex w-full justify-center mt-3">
              <button
                className="bg-red-500 text-white px-[2rem] py-[0.3rem] rounded-3xl text-[1.3rem] shadow-[0_12px_10px_rgba(0,0,0,0.16)] md:w-full md:mt-[2rem] md:text-regular"
                type="submit"
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending && <LoadingButton />}
                Sign up
              </button>
            </div>
          </form>

          <p className="text-center mt-[2rem] md:text-[12px]">
            Already Have An Account ?{" "}
            <Link href="/login">
              <span className="text-red md:text-[12px]">Sign in</span>
            </Link>
          </p>
        </div>
      </FormsLayout>
    </NavbarLayout>
  );
};

export default Register;
