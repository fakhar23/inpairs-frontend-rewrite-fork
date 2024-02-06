"use client";
import { useState } from "react";

import Image from "next/image";
import { Link } from "@/components";

import background from "@/assets/flowers.png";
import circlesBG from "@/assets/Group-5.svg";
import headerBG from "@/assets/header.svg";
import heartsBG from "@/assets/hearts.png";
import heartsBG2 from "@/assets/hearts2.png";
import instagramFirstPost from "@/assets/instagram-post-1.jpg";
import instagramSecondPost from "@/assets/instagram-post-2.jpg";
import instagramThirdPost from "@/assets/instagram-post-3.jpg";
import instagramFourthPost from "@/assets/instagram-post-4.jpg";
import medal from "@/assets/medal.svg";
import pears from "@/assets/pears.svg";
import thumpsUp from "@/assets/thumbsUp.svg";
import web from "@/assets/web.png";
import { LinkButton } from "@/components";
import { Footer } from "@/components/Footer";
import { GateNavbar } from "@/components";

interface IModalProps {
  shown: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: string;
}

const FEATURES_CONTENT = {
  thoughtfulPairing: {
    title: "Thoughtful Pairing",
    description: `We use a combination of different factors to pair you with somebody. All you have to do is put your best foot forward. 
                  Some of these factors are your personality, religiousness, and other details that you provide. We ask legit questions (not “do you like pineapples on your pizza?”) to make sure we get it right.`,
    icon: pears,
  },
  onePair: {
    title: "One Pair",
    description: `Like having a million matches but no conversations? Try literally anything else but this. 
                  Swipe-based apps are ineffective for multiple reasons – people aren’t serious, there’s no incentive to follow up with a match, and all of the important parts of a relationship outside of the marriage timeline are ignored. 
                  Inpairs pairs (see what we did there) you with one person per month and both parties have to use their only pair on each other. 
                  So you can assume the person at the other end actually wants to talk to you versus matching with you just for an ego boost – no more matching with people that won’t talk to you.`,
    icon: medal,
  },
  confidential: {
    title: "Confidential",
    description: `Trying to find somebody isn’t weird, but the whole world doesn’t have to know you’re doing it.
                  Every other service like this floats your profile information around for everybody to see. 
                  With inpairs, only our team and the people you pair with and have given explicit consent to see your information will have access to it.`,
    icon: thumpsUp,
  },
  matchmakers: {
    title: "Matchmakers",
    description: `We have actual matchmakers who go review everybody’s profiles to match our pairs. 
                  Consider our team the ultimate wingman, They get to know you on a deeper level and handpick potential partners who truly align with your values. 
                  Our expert team of Muslim matchmakers help us do that. They go through each profile keeping in mind what you look for in a future spouse and what your dealbreakers are. 
                  They pair that with their knowledge and experience in order to find you your perfect match.`,
    icon: web,
  },
};

const INSTAGRAM_POSTS = [
  {
    url: "https://www.instagram.com/p/Cs10XKXrnGW/",
    alt: "inpairs meta phase",
    img: instagramFirstPost,
  },
  {
    url: "https://www.instagram.com/p/CsjWDmjgoPs/",
    alt: "match drop 3",
    img: instagramSecondPost,
  },
  {
    url: "https://www.instagram.com/p/CsREdtQgqtx/",
    alt: "sign up for match drop 3",
    img: instagramThirdPost,
  },
  {
    url: "https://www.instagram.com/p/CsKEvLTAGaj/",
    alt: "make sure to edit your profile",
    img: instagramFourthPost,
  },
];

function FeatureModal({
  shown,
  onClose,
  icon,
  title,
  description,
}: IModalProps) {
  return (
    <>
      {shown ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={onClose}
          >
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-2 border-rose-200 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-[1rem]">
                <div className="flex justify-center items-center">
                  <div className="w-[5rem] h-[5rem] bg-rose-200 rounded-full flex justify-center items-center">
                    <Image width="53" height="53" src={icon} alt="pears icon" />
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <h2 className="font-bryantProBold text-purple text-[2rem] text-center mb-[2rem]">
                    {title}
                  </h2>

                  <p className="font-bryantProMedium my-4 text-gray-gunmetal text-md leading-relaxed">
                    {description}
                  </p>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default function Home() {
  const [modal, setModal] = useState({
    shown: false,
    ...FEATURES_CONTENT.confidential,
  });

  return (
    <>
      <GateNavbar />
      <div className="relative">
        <div className="relative p-[4rem] flex items-center justify-between mb-[7rem] md:flex-col-reverse md:justify-center md:p-0 md:m-0 md:mb-[4rem]">
          <div className="w-[55%] flex flex-col	items-start gap-[2rem] pl-[4rem] md:w-screen md:p-0 md:m-0 md:justify-center md:items-center md:p-auto md:mt-[6rem] md:gap-[3rem] md:text-center md:px-7">
            <h1 className="font-bryantProBold text-[2.1rem] leading-[3.5rem] text-purple font-normal capitalize">
              Take the guesswork out of the most important decision you can make
            </h1>
            <p className="font-bryantProMedium text-[1.2rem] leading-[1.5rem] mb-[2rem] text-gray-gunmetal">
              Inpairs is a service that brings the 21st century to Muslim
              matchmaking, blending data science with human matchmakers for the
              best results. Our team pairs couples based on a combination of
              personality, religiousness, and all the other information that
              makes you, you.
            </p>
            <div className="">
              <LinkButton path="/login">Get Started</LinkButton>
            </div>
          </div>
          <div className="w-[35%] md:w-[70%]">
            <Image src={headerBG} alt="header texting image" priority />
          </div>
        </div>
        <section className="relative space-y-10 p-[7rem] text-left mb-[2rem] bg-gradient-to-r from-purple-900/20 to-red-500/20 shadow-custom-shadow">
          <div className="absolute bg-about bg-contain bg-no-repeat bg-right w-full h-full z-[-1] top-0 right-0"></div>
          <h2 className="font-bryantProBold text-[2.5rem] font-bold text-purple">
            The Problem
          </h2>
          <p className="font-bryantProMedium text-gray-gunmetal text-[1.5rem] sm:px-0">
            Let’s be honest, it’s tough finding somebody. As a practicing Muslim
            and, most likely, first-generation immigrant, you have to filter
            through so many layers before you can even entertain the idea of
            somebody. You start yet another talking stage and then find out the
            two of you have wildly different personalities.
          </p>
          <p className="font-bryantProMedium text-gray-gunmetal text-[1.5rem] sm:px-0">
            The issue with the apps is that they are designed to keep you coming
            back. We’re not here to profit off of you, we’re here to help you
            find your person.
          </p>
        </section>
        <div className="pt-[5rem]">
          <div className="px-[4rem] mb-[7rem]">
            <h2 className="font-bryantProBold text-[2.5rem] leading-[3rem] font-bold text-purple text-center mb-[2rem]">
              What Makes Us Different From Everything Else?
            </h2>
          </div>
          <FeatureModal
            shown={modal.shown}
            onClose={() => setModal((modal) => ({ ...modal, shown: false }))}
            icon={modal.icon}
            title={modal.title}
            description={modal.description}
          />
          <div className="relative w-[100%] px-[4rem]   backdrop-blur-md bg-no-repeat bg-cover pb-[7rem] grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2rem] [&>*]:w-full [&>*]:bg-white">
            <Image
              src={circlesBG}
              alt="circles background"
              className="absolute top-0 left-0 z-[-1] w-[100%] h-[100vh] object-contain object-top"
              style={{ filter: "blur(30px)" }}
            />
            <Image
              src={heartsBG}
              className=" absolute right-14 top-[-40px]"
              alt=""
              style={{ width: "64px" }}
            />
            <Image
              src={heartsBG2}
              className=" absolute left-14 bottom-[40px]"
              alt=""
              style={{ width: "64px" }}
            />

            {Object.entries(FEATURES_CONTENT).map(
              ([key, { icon, title, description }]) => (
                <div
                  key={key}
                  className='relative rounded-lg	p-[1rem] 
            flex flex-col items-center gap-[2rem] 
            text-center 
            before:content-[""] before:top-[-3px] 
            before:left-1/8 before:w-[92%] 
            before:h-[3px] before:bg-red-500 
            before:absolute before:rounded-lg 
            drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]
            w-full'
                >
                  <div className="w-[5rem] h-[5rem] bg-rose-200 rounded-full flex justify-center items-center">
                    <Image
                      src={icon}
                      alt="pears icon"
                      className="w-2/3 h-2/3 object-contain	"
                    />
                  </div>
                  <h2 className="font-bryantProBold text-purple text-[1.2rem] md:text-regular md:font-bold">
                    {title}
                  </h2>
                  <p className="font-bryantProMedium text-gray-gunmetal md:text-[12px]">
                    {description.substring(0, 85)} ...
                  </p>
                  <button
                    className="py-[0.2rem] px-[1rem] rounded-md hover:shadow-md text-purple md:text-[12px] md:hover:text-purple"
                    onClick={() =>
                      setModal({ shown: true, icon, title, description })
                    }
                  >
                    See more{" "}
                    <i className="fa-solid fa-arrow-right text-purple"></i>
                  </button>
                </div>
              )
            )}
          </div>
        </div>
        <div className="relative p-[4rem] bg-gradient-to-r from-purple-900/50 to-red-500/50 md:p-[2rem] md:m-0 md:justify-center md:items-center md:flex">
          <Image
            src={background}
            alt="guy with flowers"
            className="absolute top-0 left-0 w-[100%] h-[100%] object-cover z-[-1] object-top"
          />
          <div className="text-white md:w-full md:flex md:justify-center md:flex-col md:items-center relative md:mt-[4rem]">
            <h2 className="font-bryantProBold text-[2.5rem] mb-[2rem] uppercase font-bold">
              our instagram
            </h2>
            <div className="grid grid-cols-4 gap-[3rem] lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full">
              {INSTAGRAM_POSTS.map(({ url, img, alt }) => (
                <div
                  className="bg-slate-200 h-[20rem] rounded-xl md:h-[30rem]"
                  key={url}
                >
                  <Link href={url} target="_blank">
                    <Image
                      width={350}
                      height={320}
                      src={img}
                      alt={alt}
                      className="object-cover h-full w-full rounded-xl backdrop-brightness-1 hover:scale-105 filter brightness-75"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
