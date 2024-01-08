import React from "react";

const Gate = () => {
  const user = {
    firstName: "john",
  };

  return (
    <div className="h-fit md:mt-[1rem] md:p-[2rem] w-screen flex justify-center">
      <div className="w-[90%] pb-[4rem] shadow-xl flex justify-center flex-col items-center gap-10 md:p-[1rem] md:pb-[10rem]">
        <p className={`text-large text-red font-funky md:text-[30px]`}>
          inpairs
        </p>
        <p className="md:text-[15px] text-center">
          Hi {user.firstName}, Thank you for your interest in inpairs! Right
          now, we only operate in the US and Canada. We’re doing our best to get
          to your country soon.
        </p>
      </div>
    </div>
  );
};

export default Gate;
