import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Reviewcard from "./Reviewcard";

import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";


const ReviewContainer = () => {
  const dummyArr = [
    {
      text: "I've tried multiple cleaning services before, but MaidSimpl has truly made the process so effortless. The 'Deep Clean' option left my home feeling brand new!",
      name: "Sarah T",
    },
    {
      text: "The MaidSimpl app is a game-changer! Booking a cleaning session was a breeze, and the results? Impeccable. I highly recommend the 'Base Clean' for regular touch-ups.",
      name: "Alex R.",
    },
    {
      text: "Quality and simplicity at its finest. With MaidSimpl, I've finally found a service that meets my standards. Their professionals are courteous and thorough.",
      name: "Linda M.",
    },
    {
      text: "Quality and simplicity at its finest. With MaidSimpl, I've finally found a service that meets my standards. Their professionals are courteous and thorough.",
      name: "Linda M.",
    },
    
  ];
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show"
      id="review-container"
      className="relative w-full h-auto px-6 py-6 md:px-8 md:py-14 lg:px-28 lg:py-14 mt-10 flex flex-col justify-center items-center gap-12 bg-[#EEFEF4]"
    >
      <img src="/assets/quotes.svg" alt="quotes" className="absolute -top-10 left-10" />
      <h1 className="text-5xl mt-4 md:mt-2 lg:mt-0 text-center font-extrabold text-black">
        Head from our clients
      </h1>

      <div className="w-full h-auto flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12">
        <motion.div  variants={fadeIn("right", "tween", 0.5, 1)} className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] flex flex-col gap-6 justify-center items-center ">
          <h1 className="text-4xl  text-center md:text-left font-extrabold text-black">
          Clean Impressions:
Our Clients 
            <span className="w-auto border-b-4 border-[#8cd790]"> Speak</span>
          </h1>
          <p className="text-xl text-center md:text-left font-medium text-gray-900">
          At MaidSimpl, every client's voice matters. We've built more than just a cleaning service; we've built a community of satisfied homeowners who trust our platform's promise of quality and simplicity. But don't just take our word for it.
          </p>
        </motion.div>

        <div className="w-full md:w-[50%] lg:w-[60%] xl:w-[68%] h-auto flex gap-4 relative">

        <Swiper
          spaceBetween={20}
          modules={[Pagination]}
          slidesPerView={
          3
          }
          className=" mySwiper swiper-h relative"
          pagination={{
            clickable: true,
          }}
        >
          {dummyArr.map((item, key) => {
            return (
              <SwiperSlide key={key} className="w-full">
                <Reviewcard text={item.text} name={item.name} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        </div>

      </div>
    </motion.div>
  );
};

export default ReviewContainer;
