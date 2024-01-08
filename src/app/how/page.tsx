import { PublicNavbar } from "@/components/PublicNav";
import HowStepCard from "./components/HowStepCard";
import data from "./howStepData";
import { Footer } from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div>
      <PublicNavbar />
      <div className="text-center w-[60%] mx-auto my-0 my-[4rem] md:w-[80%]">
        <h2 className="font-bryantProBold text-[2rem] mb-[1rem] font-semibold text-purple">
          Is your thumb tired of swiping? Try something that works.{" "}
        </h2>
        <p className="font-bryantProMedium text-[1.2rem] px-[5rem] text-gray-gunmetal md:px-[3rem]">
          Our Muslim matchmakers are here to take the pressure off, get to know
          you on a deeper level, and find you your perfect match.
        </p>
        P
      </div>
      <div className="py-[2rem] px-[6rem] md:px-[2rem] [&>*:nth-child(even)]:flex-row-reverse md:[&>*]:flex-col-reverse md:[&>*:nth-child(even)]:flex-col-reverse">
        {data.map((e, index) => (
          <HowStepCard key={e.id} data={e} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
