"use client";
import Image from "next/image";
import { useState } from "react";

export interface IHowStepCardProps {
  id: number;
  title: string;
  primary: string;
  secondary: string;
  image: string;
}

const replaceWithBr = (text: string) => text.replace(/[\r\n]+/g, "<br />");

const HowStepCard = ({
  data: { image, title, id, primary, secondary },
}: {
  data: IHowStepCardProps;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div
      key={id}
      className=" mb-[1rem] flex justify-around mb-[3rem] items-center md:shadow-md md:p-5"
    >
      <div className="w-[30%] md:w-full flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="md:w-[40%] sm:w-[60%] object-cover"
          priority={id === 1}
        />
      </div>
      <div className="w-[60%] md:w-full md:mb-[3rem]">
        <h3 className="font-bryantProBold text-[2rem] font-semibold text-purple mb-[1rem]">
          <span className="text-red">{id}-</span> {title}
        </h3>
        <p className="font-bryantProMedium text-gray-gunmetal text-[1.5rem] leading-8 mb-3">
          {primary}
        </p>
        <p
          className={`text-gray-gunmetal text-[1.2rem] leading-8 pl-5 overflow-hidden transition-[max-height] duration-200 ease-in ${
            expanded ? "max-h-[500px]" : "max-h-0"
          }`}
          dangerouslySetInnerHTML={{
            __html: replaceWithBr(secondary),
          }}
        />
        {/* {secondary}
        </p> */}

        <button
          className="font-bryantProMedium mt-6 text-[1.2rem] text-red font-semibold"
          onClick={toggleExpanded}
        >
          {expanded ? "Show Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default HowStepCard;
