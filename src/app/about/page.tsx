"use client";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { GateNavbar } from "@/components";

const About = () => {
  return (
    <>
      <GateNavbar />
      <div className="py-[4rem] px-[6rem] md:px-[2rem] bg-about space-y-[3rem]">
        <section className=" space-y-10 p-[5rem] bg-white shadow-custom-shadow text-center rounded-xl">
          <h2 className="font-bryantProBold text-5xl font-bold text-title">
            What is <span className="font-funky text-primary">Inpairs?</span>
          </h2>
          <p className="font-bryantProMedium text-lg text-light-black">
            inpairs is a Muslim matchmaking service that aims to help you find
            your perfect match on the first try. Our innovative approach to
            matchmaking combines the best of technology and human expertise to
            deliver exceptional results. With a focus on compatibility and
            personal background, we strive to create lasting connections. Join
            us in the search for your perfect match.
          </p>
        </section>
        <section className="space-y-10 p-[5rem] bg-white shadow-custom-shadow text-center rounded-xl">
          <h2 className="font-bryantProBold text-5xl font-bold text-title">
            The Problem
          </h2>
          <p className="font-bryantProMedium text-lg text-light-black">
            Let’s be honest, it’s tough finding somebody. As a practicing Muslim
            and [most likely] first-generation immigrant, you have to filter
            through so many layers before you can even entertain the idea of
            somebody. You start yet another talking stage and then find out the
            two of you have wildly different personalities.
          </p>
          <p className="font-bryantProMedium  text-lg text-light-black">
            The issue with the apps is that they are designed to keep you coming
            back. We’re not here to profit off of you, we’re here to help you
            find your person.
          </p>
        </section>
        <section className="space-y-10 p-[3rem] bg-white shadow-custom-shadow text-center rounded-xl">
          <h2 className="font-bryantProBold text-5xl font-bold text-title">
            Our Team
          </h2>
          <div className="grid grid-cols-3 gap-[2rem] md:grid-cols-1">
            <div className="text-center text-gray-gunmetal w-[100%] my-0 mx-auto flex flex-col items-center gap-5 p-5 shadow-xl rounded-xl ease-in-out col-start-2 col-end-3 ">
              <Image
                className="mx-auto mb-4 w-[15rem] h-[15rem] rounded-full object-cover"
                src="https://img1.wsimg.com/isteam/ip/f0daba97-c449-4e58-8b09-927db84f45d4/Screen%20Shot%202022-12-08%20at%202.06.38%20PM.png/:/cr=t:5.9%25,l:15.25%25,w:64.55%25,h:84.75%25/rs=w:365,h:365,cg:true,m/qt=q:12"
                alt="Bonnie Avatar"
                width={365}
                height={365}
              />
              <h3 className="font-bryant  mb-1 text-2xl font-bold tracking-tight text-gray">
                Zachariah Elkordy
              </h3>
              <p className="font-bryant font-medium  text-slate-600 ">
                Founder
              </p>
              <p className="text-gray">
                Zachariah is a third-year medical student at Georgetown
                University. Recognizing a lack of adequate solutions to Muslim
                matchmaking, he started working on inpairs. Starting June
                &apos;23, he is taking a year off to pursue more entrepreneurial
                ventures.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
