"use client";
import { useState } from "react";
import Image from "next/image";
import fillForm from "@/assets/fillForm.svg";
import theMatch from "@/assets/fillForm.svg";
import getToKnowEachOther from "@/assets/getToKnowEachOther.svg";
import pairing from "@/assets/pairing.svg";
import waitMatching from "@/assets/waitMatching.svg";
import { GateNavbar, Button, Footer } from "@/components";

interface IHowStepCardProps {
  id: number;
  title: string;
  primary: string;
  secondary: string | string[];
  image: string;
}

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
      className="flex justify-around mb-[3rem] items-center md:shadow-md md:p-5"
    >
      <div className="w-[30%] md:w-full flex justify-center items-center">
        <Image
          src={image}
          alt={title}
          className="md:w-[40%] sm:w-[60%] object-cover"
          priority={id === 1}
        />
      </div>
      <div className="w-[60%] md:w-full md:mb-[3rem]">
        <h3 className="font-bryant font-bold  text-[2rem] font-semibold text-purple mb-[1rem]">
          <span className="text-red-500">{id}-</span> {title}
        </h3>
        <p className="font-bryant font-medium  text-gray-gunmetal text-[1.5rem] leading-8 mb-3">
          {primary}
        </p>
        {[secondary].flat().map((text) => (
          <p
            key={text.slice(10)}
            className={`text-gray-gunmetal text-[1.2rem] leading-8 pl-5 overflow-hidden transition-[max-height] duration-200 ease-in ${
              expanded ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            {text}
          </p>
        ))}

        <Button
          className="font-bryant font-medium  "
          onClick={toggleExpanded}
          variant="outlined"
        >
          {expanded ? "Show Less" : "See More"}
        </Button>
      </div>
    </div>
  );
};

const data: IHowStepCardProps[] = [
  {
    id: 1,
    title: "The Form",
    primary: `Firstly you need to fill out the matchmaking forms (duh). We will send you a confirmation email once you’ve submitted everything and you’ve been entered in the pairing pool.`,
    secondary: `We have three parts to the matchmaking intake: A multiple choice form, a short answer form, and picture uploads. Everything here is absolutely confidential! Only our team will see your responses at this point in the process. Once you’re finished, you’ll get an email with your responses. This is how we’ll communicate with you.`,
    image: fillForm,
  },
  {
    id: 2,
    title: "Wait",
    primary: `Not much to do here but vibe out until we drop the pairs. Double-check your profile to make sure you have everything filled out.`,
    secondary: `Not really much to do here at this point. Make sure your profile is up to date by editing it, things are looking nice, and you haven’t said anything too wild in your profile.`,
    image: waitMatching,
  },
  {
    id: 3,
    primary: `This is the fun part for us. Our matchmakers go through your profile and your potential pair's profile to make sure you both are on the same wavelength.`,
    secondary: [
      `Our proprietary (fancy) algorithm cross-references through everybody’s deal breakers, personalities, and religiousness. Then, our matchmakers go in and read each profile to find your best pair!`,
      `Ex. Mohamed fills out the form. After running our algorithm to generate the best possible pairings, he now has eight potential pairs. Our matchmakers will read through the eight women and pick the best pair of those eight.`,
    ],
    title: "Pairing",
    image: pairing,
  },
  {
    id: 4,
    title: "The Match",
    primary: `If you were paired, congrats! Y’all will have 24 hours to approve or reject the pair. There will be three waves so make sure you check every 24 hours.`,

    secondary: [
      `You’ll get a text saying whether or not we found a pair for you. If we have not found a good pair for you, don’t worry, with more time and users we will try again and potentially find you a pair the following month! Our goal for now is to have pairs for 75% of users in our database.`,
      `If you both approve, you will have to respond by saying yes. If that happens, we will give y’all each other's phone numbers to get in touch! You both only get one pair per month, so you know the other person is giving you their full attention.`,
      `If one party declines, we will present you both with a second pair if we have one for you. The same process will happen if one party declines the second pair. If the third pair is rejected, we will try again the following month!`,
    ],
    image: theMatch,
  },
  {
    id: 5,
    primary: `We want this to work, so let us know if it is! We wouldn’t pair you if we didn’t think it was a good fit. `,
    secondary: `We hope that the first person you are connected with works out, but we get this isn’t a surefire process. If it doesn’t work out, we’re here for you next month.`,
    title: "Get to know each other!",
    image: getToKnowEachOther,
  },
];

const HowItWorks = () => {
  return (
    <div>
      <GateNavbar />
      <div className="text-center w-[60%] mx-auto my-[4rem] md:w-[80%]">
        <h2 className="font-bryant font-bold  text-[2rem] mb-[1rem] font-semibold text-purple">
          Is your thumb tired of swiping? Try something that works.{" "}
        </h2>
        <p className="font-bryant font-medium  text-[1.2rem] px-[5rem] text-gray-gunmetal md:px-[3rem]">
          Our Muslim matchmakers are here to take the pressure off, get to know
          you on a deeper level, and find you your perfect match.
        </p>
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
