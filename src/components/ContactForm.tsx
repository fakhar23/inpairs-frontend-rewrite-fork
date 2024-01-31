"use client";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button } from "@/components";
import { contactUsSchema } from "@/validation/index";

interface FormValues {
  email: string;
  name: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(contactUsSchema),
  });

  const onSubmit = () => {};

  return (
    <section className="px-10 py-9">
      <h2 className="font-bryantProBold mb-[2rem] text-5xl tracking-tight font-extrabold text-purple">
        Contact Us
      </h2>
      <div className="flex items-center flex-wrap gap-5">
        <div className="basis-auto mb-6 md:mb-0 md:w-full w-2/5 space-y-[3rem] md:mb-[4rem]">
          <div className="border-b border-mediumSlate">
            <p className="md:mb-8 mb-10 font-light text-mediumSlate text-xl">
              Got a technical issue? Want to send feedback about a feature? Need
              details about our Business plan? Let us know.
            </p>
            <a
              href="mailto:zachariah@inpairs.io"
              className="block text-lg mb-3 flex items-baseline"
            >
              <i className="fa-solid fa-envelope text-purple mr-2"></i>
              zachariah@inpairs.io
            </a>
          </div>

          <div>
            <p className="md:mb-8 mb-10 font-light text-mediumSlate text-xl">
              Any feedback you want to give or a user you want to report? Use
              our user feedback form. If you still want to reach out to us, send
              us an email!
            </p>

            <Link
              href={process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL || ""}
              target="_blank"
            >
              <button
                type="submit"
                className="py-3 px-5 text-sm  font-bryantProMedium text-center text-white rounded-3xl bg-red500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              >
                User Feedback/User Reporting Form
              </button>
            </Link>
          </div>
        </div>
        <div className="py-8 px-4 mx-auto w-1/2 md:w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                className="shadow-sm border border-inputMediumSlate text-inputNeutralMedium text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-inputLightSlate"
                placeholder="name@flowbite.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bryantProMedium text-inputNeutralDark dark:text-inputNeutralMedium"
              >
                name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm border border-inputMediumSlate text-inputNeutralMedium text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-inputLightSlate"
                placeholder="Let us know how we can help you"
                required
                {...register("name", {
                  required: "Name is required",
                  minLength: 2,
                })}
              />
              {errors.name?.message && (
                <p className="text-red">{errors.name.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                id="message"
                htmlFor="message"
                className="block mb-2 text-sm font-bryantProMedium text-inputNeutralDark dark:text-inputNeutralMedium"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                className="shadow-sm border border-inputMediumSlate text-inputNeutralMedium text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-inputLightSlate"
                placeholder="Leave a comment..."
                {...register("message", { required: true, minLength: 2 })}
              ></textarea>
              {errors.message && (
                <p className="text-red">{errors.message.message}</p>
              )}
            </div>
          </form>
          <Button
            type="button"
            className="mt-4"
            onClick={handleSubmit(onSubmit)}
            disable={isSubmitting}
            loading={isSubmitting}
            content="Send Message"
          />
        </div>
      </div>
    </section>
  );
}
