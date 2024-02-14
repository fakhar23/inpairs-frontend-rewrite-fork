import { ReactNode, useEffect, useState } from "react";
import { Card, Link } from "@/components";
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

  const linkClassName = "";

  return (
    // <div>
    //   <ul className="flex justify-center px-[20%] gap-[3rem] text-[1.2rem] text-slate-600 w-[100%] border-b border-slate-300">
    //     <Link
    //       href={"/settings"}
    //       className={
    //         "py-2 " +
    //         (tab === 1 ? "text-primary font-bold border-b border-primary" : "")
    //       }
    //       onClick={() => setTab(1)}
    //     >
    //       <li>Profile</li>
    //     </Link>

    //     <Link
    //       href={"/settings/billing"}
    //       className={
    //         "py-2 " +
    //         (tab === 3 ? "text-primary font-bold border-b border-primary" : "")
    //       }
    //       onClick={() => setTab(3)}
    //     >
    //       <li>Billing</li>
    //     </Link>
    //   </ul>
    //   {children}
    // </div>

    <div className="w-full flex flex-col gap-[1rem] px-[1rem] mt-[2rem]">
      <div className="text-[2rem]  text-title font-bold">Settings</div>

      <div className="grid grid-cols-[100px_minmax(0,_1fr)] gap-2">
        <div className="w-full bg-white min-w-[6.25rem] self-start sticky top-8 border-r">
          <nav className="min-h-[320px] flex flex-col gap-2 py-4 font-medium font-bryant text-lg">
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
              <nav className="flex flex-col gap-1 mt-[-5px] pl-2 text-sm font-normal text-slate-400 [&>a:hover]:text-neutral-500">
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
