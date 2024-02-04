"use client";
import { LoadingCircle } from "@/components";
// import {Skeleton} from "@/components";
import Image from "next/image";
import React, { useState } from "react";
import { Pencil } from "../matchmaking/history/pencil";
import { IoAddOutline, IoChatbox } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import hidePasswordIcon from "@/assets/hidePassword.svg";
import passwordIcon from "@/assets/showPassword.svg";
import { CloseIcon, MenuIcon } from "@/Icons";
import profileImg from "@/assets/prof-pic.png";
import { twMerge } from "tailwind-merge";

const Page = () => {
  // button 2
  const [button2State, setButton2State] = useState(true);
  // button 3
  const [button3State, setButton3State] = useState(true);
  // button 4
  const [button4State, setButton4State] = useState(true);
  // button 6
  const [button6State, setButton6State] = useState(true);
  // button 5
  const [button5State, setButton5State] = useState(true);
  // button 10
  const [button10State, setButton10State] = useState(true);
  // button 12
  const [button12State, setButton12State] = useState(true);
  // button 13
  const [button13State, setButton13State] = useState(true);
  // button 15
  const [button15State, setButton15State] = useState(true);
  // button 17
  const [button17State, setButton17State] = useState(true);
  // button 22
  const [button22State, setButton22State] = useState(true);

  return (
    <>
      <div className="my-10" />
      <button className="py-[0.2rem] px-[1rem] rounded-md hover:shadow-md text-purple md:text-[12px] md:hover:text-purple">
        See more <i className="fa-solid fa-arrow-right text-purple"></i>
      </button>

      <button className="bg-white text-gray-gunmetal py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-rose-200 hover:bg-slate-500 hover:text-white transition duration-200 ease-in-out">
        Go to your profile
      </button>

      {/* <button
        type="button"
        className="absolute z-10 -top-[11px] left-0 flex flex-col items-center justify-center bg-white hover:bg-red-500 text-red-500 hover:text-white"
        style={{
          fontSize: "1.25rem",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        &times;
      </button> */}
      <section className="flex w-[100%]">
        {/* button 2 */}
        <button
          className="bg-white text-slate-800 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-slate-300 disabled:pointer-events-none disabled:text-white bottom-20  md:text-regular"
          onClick={() => {}}
          disabled={button2State}
        >
          Back
        </button>

        {/* button 3 */}
        <button
          className="bg-red-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-slate-300 disabled:pointer-events-none md:text-regular"
          onClick={() => {}}
          disabled={button3State}
        >
          Next
        </button>
      </section>
      {/* button 4 */}
      <button className="font-bryantProMedium mt-6 text-[1.2rem] text-red font-semibold">
        {button4State ? "Show Less" : "See More"}
      </button>
      {/* button 5 */}
      <button
        className=" bg-red-500 text-white px-[2.5rem] py-[0.3rem] rounded-3xl shadow-[0_12px_10px_rgba(0,0,0,0.16)] md:px-[3.5rem] md:py-[0.6rem] md:mt-[3rem]"
        type="submit"
        disabled={button5State}
      >
        {button5State && <LoadingCircle />}
        Sign In
      </button>
      <button className="bg-red-500 hover:bg-red-700 ml-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Rank
      </button>
      {/* button 5 */}
      <button
        title={button6State ? "already read" : `Edit`}
        disabled={button6State}
        className="flex justify-end w-full disabled:grayscale group "
      >
        <Pencil className=" hover:opacity-75 zoom-scale-125 cursor-pointer w-4 h-4 group-disabled:cursor-not-allowed" />
      </button>
      <button title="Add" className="flex justify-end w-full">
        <IoChatbox className="text-purple-900 hover:opacity-75 zoom-scale-125 cursor-pointer   " />
      </button>
      <button className="bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300">
        Rejection Reasons
      </button>
      <button className="bg-white text-secondary font-semibold w-5/12 py-5 rounded-lg mr-4 border-primary border border-solid">
        Go Back
      </button>
      {/* button 10 */}
      <button
        className={`capitalize text-white font-semibold w-5/12 py-2 rounded-lg flex items-center justify-center gap-5
               bg-green-500 `}
      >
        {button10State && (
          <ClipLoader color="#EF3E37" size={20} aria-label="Loading..." />
        )}
        Accept
      </button>

      <button className="bg-white text-secondary font-semibold w-5/12 py-5 rounded-lg mr-4 border-primary border border-solid">
        Go Back
      </button>

      {/* button 12 */}
      <button
        disabled={button12State}
        className={`capitalize text-white font-semibold w-5/12 py-2 rounded-lg flex items-center justify-center gap-5
              ${button12State ? "bg-neutral-500" : "bg-red-500"} `}
      >
        {!button12State && (
          <ClipLoader color="#EF3E37" size={20} aria-label="Loading..." />
        )}{" "}
        Reject
      </button>
      {/* button 13 */}
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline ml-2 text-sm"
      >
        {button13State ? "hide" : "show"}
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2">
        Hide
      </button>
      <button className="bg-red-500 text-white px-[2rem] py-[0.3rem] rounded-3xl text-[1.3rem] shadow-[0_12px_10px_rgba(0,0,0,0.16)] focus:outline-none focus:shadow-outline hover:bg-[#f87171] md:hidden">
        Edit Profile
      </button>
      {/* button 15 */}

      <button
        className="bg-red-500 text-white px-[2rem] py-[0.3rem] rounded-3xl text-[1.3rem] shadow-[0_12px_10px_rgba(0,0,0,0.16)] md:w-full md:mt-[2rem] md:text-regular"
        type="submit"
        disabled={button15State}
      >
        {button15State && <LoadingCircle />}
        Sign up
      </button>
      <button className="bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300 ">
        Blocked Users
      </button>
      {/* button 17 */}
      <button
        className={twMerge(
          "text-blue-500 hover:underline",
          button17State ? "" : "cursor-pointer"
        )}
        disabled={button17State}
      >
        Request a new Verification email
      </button>
      <button
        className="my-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        aria-label="Delete"
      >
        &times;
      </button>
      <button className="flex  gap-2 items-center w-fit mx-auto border-red-500 border-2 px-[1rem] py-[0.3rem] rounded-3xl text-[1rem] shadow-xl  disabled:cursor-not-allowed disabled:bg-slate-300">
        <IoAddOutline /> <p>Add more</p>
      </button>

      <button
        className="bg-while text-black px-[4rem] py-[0.3rem] md:px-[10rem] md:py-[1rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl border border-black disabled:cursor-not-allowed disabled:bg-slate-300"
        type="button"
      >
        Cancel
      </button>
      {/* <button
        type={type}
        className={twMerge(
          "bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300",
          className
        )}
        onClick={onClick}
        disabled={isDisabled || isLoading || false}
      >
        {isLoading && <LoadingCircle />}
        {content}
      </button> */}
      {/* button 22 */}
      <button
        type="submit"
        className="py-3 px-5 text-sm  font-bryantProMedium text-center text-white rounded-3xl bg-red-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
      >
        User Feedback/User Reporting Form
      </button>
      <button
        type="button"
        dangerouslySetInnerHTML={{ __html: "&times;" }}
        className="flex flex-col items-center justify-center"
        style={{
          position: "absolute",
          top: "3px",
          right: "3px",
          zIndex: 100,
          color: "red",
          fontSize: "1.25rem",
          backgroundColor: "white",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      />
      <button className="text-sm" type="button">
        {button22State ? (
          <Image className="md:w-7" src={passwordIcon} alt="password icon" />
        ) : (
          <Image
            className="md:w-7"
            src={hidePasswordIcon}
            alt="hide password"
          />
        )}
      </button>
      {/* <button
        type={type}
        className={twMerge(
          "bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300",
          className
        )}
        disabled={isDisabled || isLoading || false}
      >
        {isLoading && <LoadingCircle />}
        {content}
      </button> */}
      <button
        className="absolute z-1 flex items-center justify-center cursor-pointer right-1 top-1"
        type="button"
        title="close"
      >
        <CloseIcon size="2rem" />
      </button>
      <button className="cursor-pointer px-12" title="closing button">
        <CloseIcon size={"2.5em"} />
      </button>
      <button
        type="button"
        title="menu"
        className="items-center p-2 text-neutral-500 rounded-lg hidden md:inline-flex hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-gray-600"
      >
        <MenuIcon />
      </button>
      <button
        type="button"
        dangerouslySetInnerHTML={{ __html: "&times;" }}
        className="flex flex-col items-center justify-center bg-white text-red-500 hover:bg-red-500 hover:text-white"
        style={{
          position: "absolute",
          top: "3px",
          right: "3px",
          zIndex: 10,
          fontSize: "1.25rem",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      />
      {/* button 25 */}
      {/* <button className="cursor-pointer flex items-center gap-[1rem]">
        <Skeleton isLoading={button22State} width={150} height={24}>
          <p
            className={twMerge(
              "whitespace-nowrap",
              button22State ? "w-40" : ""
            )}
          >
            Muhammad Fakhar
          </p>
        </Skeleton>

        <div className="h-[2rem] w-[2rem] rounded-full">
          <Image
            src={profileImg}
            alt="profile image"
            className="h-[100%] w-[100%] object-cover rounded-full"
          />
        </div>
      </button> */}
      <button className="bg-white text-gray-700 py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-rose-200 hover:bg-slate-500 hover:text-white transition duration-200 ease-in-out">
        Go to your profile
      </button>
    </>
  );
};

export default Page;
