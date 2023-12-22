import React from "react";
import { IoIosMail, IoMdMail } from "react-icons/io";
import { HiPhone } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative w-full h-auto md:h-96 flex flex-col px-4 pt-12 md:px-6 md:py-4 lg:px-16 lg:py-10 items-center justify-center rounded-t-3xl bg-white">
      <span className="absolute top-0 left-0 rounded-t-3xl bg-[#8cd790] w-full h-4" />

      <div className="w-full h-[80%] flex justify-start items-start flex-col gap-6 md:flex-row">
        <div className="w-full md:w-[40%] h-auto flex flex-col gap-5 px-4 md:px-0 justify-start items-start ">
          <img src="/assets/logo.svg" alt="logo" className="w-32" />

          <span className="w-full md:w[80%] lg:w-[70%] text-md text-left font-medium text-gray-600">
          Discover the Power of Effortless Cleaning: Where Top-Quality Service Meets Modern, Simplified Living - Only at MaidSimpl.
          </span>

          <img src="/assets/flowerfull.svg" alt="flower" className="w-20" />
        </div>

        <div className=" w-full md:w-[50%] h-auto md:h-64 py-6 flex flex-col justify-between items-center">
          <div className="w-full h-12 flex flex-row gap-4 lg:gap-12 ">
            <Link
              href="/"
              className=" text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  active uppercase"
            >
              Home
            </Link>
            <a
              href="/contactus/"
              className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
            >
              Contact
            </a>
            <Link
              href="/terms/"
              className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy/"
              className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
            >
              Privacy Policy
            </Link>
            <a
              href="#faq"
              className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
            >
              Faq
            </a>
          </div>

          <div className="w-full h-auto flex flex-col gap-4 justify-start items-center  lg:items-start">
            <div className="w-full lg:w-1/2 h-auto text-xl flex justify-start gap-4 items-center">
                <IoMdMail className="text-[#8cd790] w-6 text-3xl"/>
                <span className="text-sm lg:text-md font-medium">
                Support@maidsimpl.com
                </span>
            </div>

            <div className="w-full lg:w-1/2 h-auto text-xl flex justify-start gap-4 items-center">
                <HiPhone className="text-[#8cd790] w-6 text-2xl"/>
                <span className="text-sm lg:text-md font-medium">
                (951)-216-3092
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-16 py-2 border-t-2 border-gray-500 flex items-center justify-between">
        <span className="text-sm text-gray-600 font-normal">
        2021 MAIDSIMPL ALL RIGHT RESERVED
        </span>

        <div className="w-auto flex justify-start gap-3 items-center h-auto">
            <Link href="https://www.facebook.com/">
              <FaFacebook className="text-2xl text-[#8cd790]"/>
            </Link>

            <Link href="https://www.instagram.com/">
            <BiLogoInstagramAlt className="text-2xl text-[#8cd790]"/>
              
            </Link>

            <Link href="https://www.linkedin.com/">
            <FaLinkedin className="text-2xl text-[#8cd790]"/>
              
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
