import React from "react";

const Reviewcard = ({ text, name, image }) => {
  return (
    <div className="w-auto lg:w-[240px] xl:w-auto  h-[450px] flex flex-col justify-center gap-2 items-center p-6 shadow-md bg-white">
      <div className="w-full h-[30%] flex items-center justify-center">
        <img src={image} className="w-40 h-40" alt="user_img" />
      </div>
      <div className="flex w-full h-[70%] p-2 flex-col justify-start items-start gap-3">
        <div className="w-full h-[80%] flex flex-col gap-2 justify-start items-start">
          <img src="/assets/quotes.svg" alt="quotes" className="w-12 h-12" />

          <span className="text-md font-medium text-gray-900">{text.slice(0,200)}</span>
        </div>

        <div className="w-full h-[20%] flex justify-start items-end">
          <span className="text-2xl font-bold text-black">~ {name}</span>
        </div>
      </div>
    </div>
  );
};

export default Reviewcard;
