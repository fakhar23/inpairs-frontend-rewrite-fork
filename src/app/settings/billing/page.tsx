"use client";

import { SettingsLayout, UserProfileLayout } from "@/layouts";

const BillingSettings = () => {
  return (
    <UserProfileLayout>
      <SettingsLayout>
        <section className="w-[80%] p-5 py-[3rem] my-0 mx-auto">
          <h2 className="text-[2rem] text-purple font-bold mb-[4rem]">
            Billing Settings
          </h2>

          <div className="w-[100%] p-10 flex justify-center items-center shadow-xl">
            <p className="text-[20px]">
              This page is still under construction. If you’d like to modify any
              of your billing settings, send an email to
              <a
                href="mailto:zachariah@inpairs.io"
                rel="noreferrer"
                target="_blank"
                className="text-lg"
              >
                {" "}
                <i className="fa-solid fa-envelope text-purple mr-1"></i>
                zachariah@inpairs.io
              </a>{" "}
              !
            </p>
          </div>
        </section>
      </SettingsLayout>
    </UserProfileLayout>
  );
};

export default BillingSettings;
