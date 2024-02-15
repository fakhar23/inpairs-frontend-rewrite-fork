"use client";
import { Input, Link } from "@/components";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button } from "@/components";
import { contactUsSchema } from "@/validation/index";
import { TextArea } from "./Input";
import { SupportEmailBody } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendSupportEmail } from "@/api";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupportEmailBody>({
    resolver: yupResolver(contactUsSchema),
  });

  const supportEmailMutation = useMutation({
    mutationFn: async (payload: SupportEmailBody) => {
      return await sendSupportEmail(payload);
    },
    onSuccess(response) {
      toast.success(response.message);
    },
  });

  return (
    <section className="px-10 py-9">
      <h2 className="font-bryant mb-[2rem] text-5xl tracking-tight font-extrabold text-title">
        Contact Us
      </h2>
      <div className="flex items-center flex-wrap gap-5">
        <div className="basis-auto mb-6 md:w-full w-2/5 space-y-[3rem] md:mb-[4rem]">
          <div className="border-b border-gray">
            <p className="md:mb-8 mb-10 font-light text-xl">
              Got a technical issue? Want to send feedback about a feature? Need
              details about our Business plan? Let us know.
            </p>
            <a
              href="mailto:zachariah@inpairs.io"
              className="text-lg mb-3 flex items-baseline"
            >
              <i className="fa-solid fa-envelope text-secondary mr-2"></i>
              zachariah@inpairs.io
            </a>
          </div>

          <div>
            <p className="md:mb-8 mb-10 font-light text-xl">
              Any feedback you want to give or a user you want to report? Use
              our user feedback form. If you still want to reach out to us, send
              us an email!
            </p>

            <Link
              href={process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL || ""}
              target="_blank"
            >
              <Button type="submit">User Feedback/User Reporting Form</Button>
            </Link>
          </div>
        </div>
        <div className="py-8 px-4 mx-auto w-1/2 md:w-full">
          <form
            onSubmit={handleSubmit((payload) =>
              supportEmailMutation.mutate(payload)
            )}
            className="space-y-8"
          >
            <Input
              label="Your email"
              type="email"
              id="email"
              variation="secondary"
              placeholder="example@gmail.com"
              error={errors.email}
              {...register("email")}
            />

            <Input
              label="Your name"
              type="text"
              id="name"
              variation="secondary"
              placeholder="Mohammad Mahdi"
              error={errors.name}
              {...register("name")}
            />

            <Input
              label="Subject"
              type="text"
              id="subject"
              variation="secondary"
              placeholder="Assistance Needed: Issue with ..."
              error={errors.subject}
              {...register("subject")}
            />

            <TextArea
              id="message"
              variation="secondary"
              label="Your message"
              placeholder="let us know how we can help you ..."
              error={errors.message}
              rows={6}
              {...register("message")}
            />
            <Button
              type="submit"
              className="mt-4"
              isDisabled={supportEmailMutation.isPending}
              isLoading={supportEmailMutation.isPending}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
