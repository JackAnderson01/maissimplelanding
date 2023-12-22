import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";
import Link from "next/link";

const OptionsCard = ({obj}) => {
  return (
    <div  className="w-full  h-[350px] md:w-[380px] border border-gray-700 rounded-2xl group shadow-lg hover:shadow-lg hover:shadow-[#8cd790]/[0.4] flex flex-col gap-6 justify-center items-center z-30 bg-white ">
      <h1 className="text-4xl font-bold text-[#8cd790] capitalize">{obj.name} Clean</h1>
      <span className="text-xl font-medium text-[#8cd790]">Starting at</span>

      <span className="text-6xl font-extrabold text-[#8cd790]">${obj.price}</span>

      <Link href="/" className="w-32 h-12 flex items-center justify-center rounded-md group-hover:bg-[#8cd790] group-hover:text-white bg-black text-white font-semibold shadow-sm  text-md">
        Book Now
      </Link>
    </div>
  );
};

export default OptionsCard;
