import React from "react";
import StepsCard from "./StepsCard";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";

const StepsContainer = () => {
  const dummyArr = [
    {
      no: 1,
      title: "Download the MaidSimpl App",
      desc: "Available on iOS and Android platforms.",
    },
    {
      no: 2,
      title: "Quick Profile Setup",
      desc: "Share a few details to customize your experience.",
    },
    {
      no: 3,
      title: "Choose Your Cleaning Expert",
      desc: "View profiles of our vetted, top-tier cleaners.",
    },
    {
      no: 4,
      title: "Schdeule a Cleaning",
      desc: "Pick a time that works best for you.",
    },
    {
      no: 5,
      title: "Relax & Enjoy",
      desc: "Let our specialist handle the cleaning.",
    },
    {
      no: 6,
      title: "Share your thiughts",
      desc: "Give us a quick review, ensuring top-notch services",
    },
  ];
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      className="relative w-full h-auto px-6 py-8 md:px-8 lg:px-20 lg:py-8 mt-20  flex flex-col  justify-center items-center gap-12 bg-[#EEFEF4]"
    >
      <img
        src="/assets/flower.svg"
        alt="flower"
        className="absolute -top-28 md:-top-20 rotate-180 left-0 z-30"
      />

      <h1 className="text-3xl font-bold text-black">
        Get Started in{" "}
        <span className="text-2xl lg:text-3xl  w-auto border-b-4 border-[#8cd790] uppercase text-center md:text-left  font-extrabold ">
          6 Simple Steps
        </span>
      </h1>

      <div className=" w-full h-auto  flex flex-col md:flex-row flex-wrap gap-6 md:gap-8 justify-center  lg:gap-12 py-8 ">
        {dummyArr.map((obj) => {
          return <StepsCard key={obj.no} obj={obj} />;
        })}
      </div>
    </motion.div>
  );
};

export default StepsContainer;
