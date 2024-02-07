"use client";

import { MdEmail } from "react-icons/md";
import { Toast } from "@/components";
import { SettingsLayout, UserProfileLayout } from "@/layouts";

const BillingSettings = () => {
  return (
    <UserProfileLayout>
      <SettingsLayout>
        <section className="w-[100%] p-10 py-[3rem] my-0 mx-auto md:w-[100%]">
          <h2 className="text-[2.5rem] text-title font-bold mb-[2rem]">
            Billing Settings
          </h2>

          <Toast
            type="warn"
            icon
            message={
              <p className="text-2xl">
                This page is still under construction. If you’d like to modify
                any of your billing settings, send an email to
                <a
                  href="mailto:zachariah@inpairs.io"
                  rel="noreferrer"
                  target="_blank"
                  className="underline text-blue-500  inline-flex items-end gap-1"
                >
                  <span className="ml-1">
                    <MdEmail />
                  </span>
                  zachariah@inpairs.io
                </a>{" "}
                !
              </p>
            }
          />
        </section>
      </SettingsLayout>
    </UserProfileLayout>
  );
};

export default BillingSettings;
