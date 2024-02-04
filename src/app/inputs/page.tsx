"use client";

import { Input } from "@/components";
import CustomInput from "@/components/CustomInput";
import React from "react";

const Page = () => {
  const [state1, setState1] = React.useState(true);
  const [state2, setState2] = React.useState(true);
  const [state3, setState3] = React.useState(true);
  const [state4, setState4] = React.useState(true);
  return (
    <>
      <div className="space-y-4">
        <label htmlFor="">
          Can you explain why you&apos;re saying no? It helps our matchmakers
          pick a better Pair for you next time!
        </label>

        <input
          name="reason"
          className="w-full bg-[#EFEFEF96] rounded-[10px] px-3 border-slate-400 leading-tight h-[3rem]   text-[#5B5B5B] focus:outline-[#EF3E37]"
          placeholder=""
        />
      </div>

      <div className="flex items-center">
        <input
          id="female"
          type="radio"
          value="FEMALE"
          className="w-4 h-4 text-red bg-neutral-100 border-neutral-500 focus:ring-red-500 focus:outline-none"
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
        />

        <label
          htmlFor="male"
          className="ml-2 text-sm font-bryantProMedium text-neutral-900 md:text-[12px]"
        >
          Male
        </label>
      </div>

      <input
        type="text"
        className={`outline-none flex-1 px-3 py-2 mt-1 w-full rounded-md border-gray-500 border focus:ring-red-600 ${
          state1 ? "border-red-500 shake" : ""
        }`}
        placeholder="Enter phone number"
      />

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-bryantProMedium"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          required
          className="shadow-sm border border-slate-400 text-neutral-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-slate-50"
          placeholder="name@flowbite.com"
        />
        {<p className="text-red">required</p>}
      </div>

      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-bryantProMedium text-neutral-900 dark:text-neutral-300"
        >
          name
        </label>
        <input
          type="text"
          id="name"
          className="shadow-sm border border-slate-400 text-neutral-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-slate-50"
          placeholder="Let us know how we can help you"
          required
        />
        {true && <p className="text-red">required</p>}
      </div>

      <CustomInput />
      <LoginForm />

      <div className="flex flex-col">
        <input className="cursor-pointer" type="radio" />
        <label className="cursor-pointer w-10 text-center">7</label>
      </div>
    </>
  );
};

export default Page;

import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", { required: "Email is required" })}
        id="email"
        label="Email"
        error={errors.email}
        variation="primary"
      />

      <Input
        {...register("password", { required: "Password is required" })}
        id="password"
        label="Password"
        type="password"
        error={errors.password}
        variation="primary"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
