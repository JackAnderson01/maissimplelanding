import React from 'react'
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";

const StepsCard = ({obj}) => {
  return (
    <motion.div variants={fadeIn("right", "tween", 0.5, 1)} className='w-full md:w-[10rem] lg:w-[33%] xl:w-[13%] flex flex-row md:flex-col items-center justify-center gap-6'>
        

        <div className='w-16 h-full md:h-[30%] rounded-full border border-dashed border-[#8cd790] flex items-center justify-center'>
            <span className='flex items-center justify-center w-14 h-14 bg-[#1c1c1c] rounded-full'>
                <h1 className='text-3xl text-[#8cd790] font-extrabold'>
                    {obj.no}
                </h1>
            </span>
        </div>

        <div className='w-auto h-[70%] flex flex-col gap-2 '>
            <h1 className='text-2xl text-left md:text-center font-semibold text-black'>
            {obj.title}
            </h1>

            <span className='text-lg text-left md:text-center font-medium text-gray-900'>
            {obj.desc}
            </span>
        </div>
    </motion.div>
  )
}

export default StepsCard