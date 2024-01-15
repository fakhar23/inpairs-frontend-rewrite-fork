"use client";
import { useState } from "react";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { InputField, CountrySelect, LoadingButton } from "@/components";
import { FormsLayout, NavbarLayout } from "@/layouts";

import { HOW_DID_YOU_HEAR_ABOUT_US } from "./constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export interface SignUpBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  country: string;
  phoneNumber: string;
  howDidYouHearAboutUs: string;
  confirmPassword: string;
}

const Register = () => {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const [whereDidYouHearAboutUs, setWhereDidYouHearAboutUs] =
    useState<string>();

  //ToDO: validate data
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpBody>();

  const onSubmit = async (data: SignUpBody) => {
    // try {
    //   setLoad(true);
    //   const { confirmPassword, ...formData } = data;
    //   const result = await APIHelper.signUp({
    //     ...formData,
    //     email: formData.email.toLowerCase(),
    //   });
    //   if (result.status === 201) {
    //     router.push(`verify?email=${formData.email}`);
    //   }
    // } catch (error: unknown) {
    //   Sentry.captureException(error);
    //   if (error instanceof AxiosError) {
    //     if (error.code === "ERR_NETWORK") {
    //       toast.error("Something went wrong.");
    //       return;
    //     }
    //     const errorMessage = error?.response?.data.message;
    //     toast.error(errorMessage);
    //   }
    // } finally {
    //   setLoad(false);
    // }
  };

  return (
    <NavbarLayout>
      <FormsLayout>
        <div className={poppins.className}>
          <div className={`text-lg px-[2rem] ${poppins.className}`}>
            Create Your Account
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start  px-[2rem] gap-[1rem]"
          >
            <InputField
              register={register}
              id="email"
              type="email"
              placeholder="Email"
              errorMessage="Email is required"
              errors={errors}
            />
            <div className="w-full mb-2 relative">
              <InputField
                register={register}
                errorMessage="Password is required"
                errors={errors}
                pattern={{
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                }}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="w-full mb-2 relative">
              <InputField
                register={register}
                validate={(value) =>
                  value === watch("password") || "Passwords do not match"
                }
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                errorMessage="Confirm Password is required"
                errors={errors}
              />
            </div>

            <div className="flex gap-2 w-full md:w-full">
              <InputField
                register={register}
                id="firstName"
                type="text"
                placeholder="First Name"
                errorMessage="First Name is required"
                errors={errors}
              />

              <InputField
                register={register}
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

              <InputField
                register={register}
                errors={errors}
                errorMessage="Date of birth is required"
                validate={(value) => {
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
                }}
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
                  <InputField
                    register={register}
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
                disabled={load}
              >
                {load && <LoadingButton />}
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
