import React from "react";
// import styles from "../../style"
import Link from "next/link";
import Head from "next/head";

const Notfound = () => {
  return (
    <>
      <Head>
        <title>Maid Simpl</title>
        <meta charset="UTF-8"></meta>

        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <div
        className={`w-screen py-[8.3rem] h-screen flex flex-col justify-center gap-3 overflow-x-hidden items-center bg-white relative`}
      >
        <div className="absolute z-0 w-2/5 h-1/3 bottom-10 pink__gradient"></div>
        <div className="absolute z-1 w-4/5 h-4/5 top-0 rounded-full white__gradient"></div>
        <div className="absolute z-0 w-1/2 h-1/2 left-20 top-0 blue__gradient"></div>
        <img
          src="/assets/logo.svg"
          className="animate-up logo404"
          alt="404"
        />
        <img src="/assets/loginbanner.svg" className=" w-full h-60" alt="404" />
        <p className={` mb-3 text-gradient text-5xl font-extrabold text-black`}>
          Oh No!!
        </p>
        <p className={`mb-3 text-center text-2xl text-gray-800`}>
          You're either mispelling the URL <br /> or requesting a page that's no
          longer here.
        </p>
        <Link
          href="/"
          className="w-32 z-10 flex justify-center items-center mb-3 h-12 bg-blue-gradient bg-[#8cd790] rounded-md transition-all duration-300 hover:scale-110"
        >
          <span className="text-white font-bold">Back to home!</span>
        </Link>
      </div>
    </>
  );
};

export default Notfound;
