import { ReactNode, useEffect, useState } from "react";
import { Link } from "@/components";
import { usePathname } from "next/navigation";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (pathname.includes("account")) {
      setTab(2);
    } else if (pathname.includes("billing")) {
      setTab(3);
    } else {
      setTab(1);
    }
  }, [pathname]);

  return (
    <div>
      <ul className="flex justify-center px-[20%] gap-[3rem] text-[1.2rem] text-slate-600 w-[100%] border-b border-slate-300">
        <Link
          href={"/settings"}
          className={
            "py-2 " +
            (tab === 1 ? "text-red-500 font-bold border-b border-red-500" : "")
          }
          onClick={() => setTab(1)}
        >
          <li>Profile</li>
        </Link>

        <Link
          href={"/settings/billing"}
          className={
            "py-2 " +
            (tab === 3 ? "text-red-500 font-bold border-b border-red-500" : "")
          }
          onClick={() => setTab(3)}
        >
          <li>Billing</li>
        </Link>
      </ul>
      {children}
    </div>
  );
};

export default SettingsLayout;
