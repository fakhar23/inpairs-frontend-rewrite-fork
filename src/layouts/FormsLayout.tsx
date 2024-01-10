import { ReactNode } from "react";

import Image from "next/image";

import bg from "../../public/circles-bg.svg";
import couple from "../../public/couple.svg";

interface IFromsLayoutProps {
  children: ReactNode;
}

const FormsLayout = ({ children }: IFromsLayoutProps) => {
  return (
    <div className="flex w-[80%] my-[5%] bg-white md:flex-col md:flex-reverse-col md:items-center md:rounded-xl md:w-[90%] md:h-fit md:mt-[2rem] md:shadow md:justify-center md:pt-[3rem] md:pb-[3rem]">
      <Image
        src={bg}
        alt="circles background"
        className="absolute top-0 left-0 z-[-1] w-[100%] h-[100vh] object-cover object-top md:hidden blur-3xl"
      />
      <div className="w-1/2 p-12 md:w-full md:p-0 md:m-0 md:flex md:justify-center md:items-center md:flex-col">
        <h2 className={`font-funky text-center text-[2.6rem] mb-[0.5rem]`}>
          Welcome To <span className="text-red">Inpairs</span>
        </h2>
        <div className="relative md:w-full">{children}</div>
      </div>
      <div className="bg-[#F8F8F8] w-[50%] md:w-full md:rounded-xl md:hidden">
        <Image src={couple} alt="couple image" />
      </div>
    </div>
  );
};

export default FormsLayout;
