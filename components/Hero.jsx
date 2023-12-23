import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full h-auto lg:h-[700px] px-6 py-6 md:px-8 lg:px-28 lg:py-8 mt-4 flex flex-col md:flex-row justify-between items-center"
    >
      <div className="w-full lg:w-1/2 h-full flex   justify-center items-center">
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="w-full lg:w-[70%] flex flex-col gap-8 items-start justify-start"
        >
          <div className="w-full h-auto flex flex-col justify-center md:items-start  text-center items-center">
            <h1 className="text-2xl lg:text-5xl md:uppercase text-center md:text-left font-extrabold text-black">
              A Cleaner Home,
            </h1>
            <span className="text-5xl lg:text-7xl  w-auto border-b-4 border-[#8cd790] uppercase text-center md:text-left  font-extrabold ">
              MaidSimpl
            </span>
          </div>

          <span className="text-xl   text-center md:text-left font-bold text-black">
            Book, Manage, and Relax, all at your Fingertips.
          </span>

          <Link
            href="/"
            className="hidden md:flex  w-40 h-12 rounded-xl  items-center text-lg font-semibold text-white transition-all duration-300 hover:bg-[#8cd790] justify-center bg-black shadow-sm shadow-[#1c1c1c]"
          >
            Book Now
          </Link>
        </motion.div>
      </div>

      <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className="w-full lg:w-1/2 h-full flex items-center  justify-center">
        <img src="/assets/hero_banner.png" alt="hero_banner" className=" " />
      </motion.div>

      <Link
        href="https://app.maidsimpl.com/login"
        className="md:hidden  w-40 h-12 rounded-xl flex items-center text-lg font-semibold text-white transition-all duration-300 hover:bg-[#8cd790] justify-center bg-black shadow-sm shadow-[#1c1c1c]"
      >
        Book Now
      </Link>
    </motion.div>
  );
};

export default Hero;
