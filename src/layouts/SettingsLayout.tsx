import { ReactNode, useEffect, useState } from "react";
import { Link } from "@/components";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (pathname.includes("forms")) {
      setTab(3);
    } else if (pathname.includes("billing")) {
      setTab(2);
    } else {
      setTab(1);
    }
  }, [pathname]);

  return (
    <div className="w-full flex flex-col gap-[1rem] px-[4rem] md:px-[1rem] mt-[2rem]">
      <div className="text-[2rem]  text-title font-bold">Settings</div>

      <div className="grid md:grid-cols-[100px_minmax(0,_1fr)] grid-cols-[150px_minmax(0,_1fr)] gap-8 md:gap-2">
        <div className="w-full bg-white md:min-w-[6.25rem]  self-start sticky top-8 border-r">
          <nav className="min-h-[320px] flex flex-col gap-2 py-4 font-medium font-bryant md:text-lg text-xl">
            <Link
              href={"/settings"}
              className={twMerge(
                "",
                tab === 1
                  ? "text-primary font-bold border-r border-primary"
                  : ""
              )}
              onClick={() => setTab(1)}
            >
              <>Profile</>
            </Link>

            <Link
              href={"/settings/billing"}
              className={
                tab === 2
                  ? "text-primary font-bold border-r border-primary"
                  : ""
              }
              onClick={() => setTab(2)}
            >
              <>Billing</>
            </Link>

            <Link
              href={"/settings/forms"}
              className={
                tab === 3
                  ? "text-primary font-bold border-r border-primary"
                  : ""
              }
              onClick={() => setTab(3)}
            >
              <>Forms</>
            </Link>

            {tab === 3 && (
              <nav className="flex flex-col gap-1 mt-[-5px] pl-2 md:text-sm text-base font-normal text-slate-400 [&>a:hover]:text-neutral-500">
                <a className="" href="#GeneralInformation">
                  General Information
                </a>
                <a href="#Ethnic">Ethnic</a>
                <a href="#Location">Location</a>
                <a href="#Religion">Religion</a>
                <a href="#AboutThem">About Them</a>
              </nav>
            )}
          </nav>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
