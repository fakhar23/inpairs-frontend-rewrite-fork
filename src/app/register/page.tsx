"use client";

import { Button, Link, ToggleButton, ToggleButtonGroup } from "@/components";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { Input, CountrySelect, LoadingCircle } from "@/components";
import { FormsLayout, NavbarLayout } from "@/layouts";

import { HOW_DID_YOU_HEAR_ABOUT_US } from "./constants";
import { SignUpBody } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api";
import { toast } from "react-toastify";
import { FaFemale, FaMale } from "react-icons/fa";

export default function Register() {
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpBody) => {
      return await signUp(data);
    },
    onSuccess(response, formData) {
      toast.success(response.data.message);
      if (response.status === 201) {
        router.push(`verify?email=${formData.email}`);
      }
    },
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<SignUpBody>();

  return (
    <NavbarLayout>
      <FormsLayout>
        <div className="font-poppins">
          <div className="text-lg px-[2rem] font-poppins mb-4 text-center">
            Create Your Account
          </div>

          <form
            onSubmit={handleSubmit((data) => signUpMutation.mutate(data))}
            className="flex flex-col items-start md:px-0 px-[2rem] gap-[1rem]"
          >
            <Input
              id="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              {...register("email", {
                required: "Email is required",
              })}
            />
            <div className="w-full mb-2 relative">
              <Input
                error={errors.password}
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "Valid passwords must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, and one number",
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

            <div className="flex gap-2 w-full md:w-full">
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                error={errors.firstName}
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />

              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                error={errors.lastName}
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
            </div>

            <div className="w-full mb-2 md:mt-[1rem] text-gray gap-1">
              <CountrySelect control={control} />

              <div className="border-b border-slate-400  w-full" />
              {errors.country && (
                <p className="text-red-500 text-[0.8rem]">
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
                    className="appearance-none border-b  border-slate-400 text-gray-gunmetal leading-tight fne h-[3rem] w-full focus:placeholder-transparent focus:outline-none focus:border-primary bg-transparent md:h-[4rem]  "
                    placeholder="Phone Number"
                    value={value}
                    onChange={onChange}
                    defaultCountry="US"
                    addInternationalOption={false}
                  />
                )}
              />

              {errors?.phoneNumber && (
                <p className="text-red-500 text-[0.8rem]">
                  Invalid Phone Number
                </p>
              )}
            </div>

            <div className="w-full mb-2 relative">
              <label className="mb-3   md:mb-[1rem] text-gray-gunmetal">
                Date of birth
              </label>

              <Input
                error={errors.dob}
                id="dob"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                placeholder="Date of Birth"
                {...register("dob", {
                  required: "Date of birth is required",
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
                })}
              />
            </div>

            <div className="border-b border-slate-400 text-gray-gunmetal leading-tight focus:outline-none py-[0.7rem] px-[0.5rem] w-full focus:placeholder-transparent focus:border-primary">
              <p className="mb-3   md:mb-[1rem]">Gender</p>
              <div className="flex gap-5">
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field: { onChange, value } }) => (
                    <ToggleButtonGroup
                      value={value}
                      exclusive
                      onChange={onChange}
                      aria-label="gender"
                    >
                      <ToggleButton value="MALE" aria-label="male">
                        Male
                        <span className="w-[30px] py-1 [&>svg]:h-auto [&>svg]:w-full">
                          <FaMale />
                        </span>
                      </ToggleButton>
                      <ToggleButton value="FEMALE" aria-label="female">
                        Female
                        <span className="w-[30px] py-1 [&>svg]:h-auto [&>svg]:w-full">
                          <FaFemale />
                        </span>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-[0.8rem]">Select a gender</p>
            )}

            <div className="flex w-full mb-2 md:mt-[1rem] text-neutral-500 gap-1">
              <div className="flex flex-col w-full">
                <select
                  className={`w-full h-10 border-b focus:outline-none border-neutral-100 text-gray-gunmetal   bg-white`}
                  id="howDidYouHearAboutUs"
                  {...register("howDidYouHearAboutUs", {
                    required: "How did you hear about us is required",
                  })}
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

                {getValues("howDidYouHearAboutUs") !== "Other" &&
                  errors.howDidYouHearAboutUs && (
                    <p className="text-red-500 text-[0.8rem]">
                      {errors?.howDidYouHearAboutUs?.message}
                    </p>
                  )}
              </div>
            </div>

            {getValues("howDidYouHearAboutUs") === "Other" && (
              <div className="flex w-full mb-2 md:mt-[1rem] text-neutral-500 gap-1">
                <div className="flex flex-col w-full">
                  <Input
                    id="howDidYouHearAboutUs"
                    type="text"
                    placeholder="Please specify"
                    error={errors.howDidYouHearAboutUs}
                    {...register("howDidYouHearAboutUs", {
                      required: "more details is required",
                    })}
                  />
                </div>
              </div>
            )}

            <div className="flex w-full justify-center mt-3">
              <Button
                type="submit"
                isDisabled={signUpMutation.isPending}
                isLoading={signUpMutation.isPending}
              >
                Sign up
              </Button>
            </div>
          </form>

          <p className="text-center mt-[2rem]  ">
            Already Have An Account ?{" "}
            <Link href="/login">
              <span className="text-primary  ">Sign in</span>
            </Link>
          </p>
        </div>
      </FormsLayout>
    </NavbarLayout>
  );
}
