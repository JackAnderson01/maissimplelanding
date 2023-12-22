import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import OptionsContainer from "./OptionsContainer";
import StepsContainer from "./StepsContainer";
import AboutUs from "./AboutUs";
import ReviewContainer from "./ReviewContainer";
import Faq from "./Faq";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="w-screen h-auto flex flex-col justify-start  gap-2 items-start overflow-y-auto scroll-smooth transition-all duration-200 overflow-x-hidden ">
      <Navbar />
      <Hero />
      <OptionsContainer />
      <StepsContainer />
      <AboutUs />
      <ReviewContainer />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
