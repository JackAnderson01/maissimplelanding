import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show"
      id="about-us"
      className="relative w-full h-auto px-6 py-6 md:px-8 lg:px-20 lg:py-8 mt-14 flex flex-col justify-center items-center gap-12 bg-white"
    >
      <img
        src="/assets/flowerfull.svg"
        alt="flower"
        className="absolute -top-36 lg:-top-36 right-6 z-30"
      />

      <h1 className="text-5xl font-extrabold text-black">About Us</h1>

      <div className="w-full h-auto flex flex-col gap-6 md:gap-4 lg:flex-row justify-center items-center lg:items-start">
        <motion.div variants={fadeIn("right", "tween", 0.5, 1)} className="relative w-full lg:w-1/2 xl:w-1/3 h-auto flex items-center justify-center">
          {/* <img
            src={SemiCircle}
            alt="semi_circle"
            className="hidden lg:block absolute -top-32 -left-36 md:-top-24 md:left-0 w-60"
          /> */}
          <span className="bg-[#8cd790]/[0.30] w-96 h-96 rounded-full blur-xl absolute -top-24 -left-8"/>

          <img
            src="/assets/aboutbanner.jpg"
            alt="about_banner"
            className="w-full h-auto md:w-[400px] md:h-auto z-30"
          />
        </motion.div>

        <motion.div variants={fadeIn("left", "tween", 0.5, 1)} className="w-[90%] lg:w-1/2 xl:w-1/3 h-auto flex item-center justify-start ">
          <span className="text-black text-lg text-justify font-medium">
            At MaidSimpl, we believe in a cleaner, more organized world. Amidst
            the chaos of modern life, everyone yearns for simplicity,
            reliability, and peace of mind. Our platform is tailored to deliver
            just that. By bridging the gap between homeowners and our community
            of carefully vetted, eco-conscious cleaning professionals, we ensure
            every space we touch radiates perfection. Our commitment goes beyond
            surface shine; we stand by the principles of Quality, Ease, and
            Sustainability in every task. For those seeking the comfort of a
            perfectly maintained home. MaidSimpl isn't just our name, it's our
            promise - ushering in an era where modern convenience aligns with a
            clean living space.
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
