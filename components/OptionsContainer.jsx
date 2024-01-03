import React, { useEffect, useState } from "react";
import OptionsCard from "./OptionsCard";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";
import axios from "axios";

const OptionsContainer = () => {
  const [serviceType, setServiceType] = useState([]);

  const getServiceType = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get("/api/admin/serviceType/getServiceTypePrice", { headers })
      .then((response) => {
        setServiceType(response.data.result);
        console.log("Service Type", response.data.result);
      })
      .catch((error) => {
        console.log("error occured");
      });
  };

  useEffect(() => {
    getServiceType();
  }, []);

  const dummyArr = [
    {
      name: "Deep Clean",
      price: "160",
    },
    {
      name: "Base Clean",
      price: "180",
    },
  ];
  return (
    <div className="relative w-full h-auto px-6 md:px-8 lg:px-20 mt-14 md:mt-14 flex flex-col justify-center items-center gap-12 bg-white">
      <img
        src="/assets/flower.svg"
        alt="flower"
        className="absolute top-32 md:top-0 right-0"
      />

      <div className="w-full md:w-[80%] h-auto flex flex-col justify-center items-center gap-4 z-30">
        <h1 className="text-3xl font-extrabold text-center uppercase">
          Choose your{" "}
          <span className="w-auto border-b-4 border-[#8cd790]">
            shine level
          </span>
        </h1>
        <div className="w-full md:w-[80%] lg:w-[60%] text-center text-lg font-medium text-gray-900">
          From our fundamental{" "}
          <span className="text-xl font-bold text-black"> 'Base Clean' </span>{" "}
          to our meticulous{" "}
          <span className="text-xl font-bold text-black"> 'Deep Clean'</span>,
          pick what's best for you.
        </div>
      </div>

      {/* Options Card */}
      <div className="relative w-full md:w-[90%] lg::w-1/2 h-auto flex flex-col md:flex-row gap-14  justify-center items-center">
        <span className="w-[205px] h-[205px] rounded-full bg-[#8cd790]/[0.3] shadow-lg shadow-[#8cd790]/[0.3] absolute -top-[100px] -right-3 blur-3xl" />

        {serviceType.length > 0
          ? serviceType.map((obj, key) => {
              return <OptionsCard key={key} obj={obj} />;
            })
          : dummyArr.map((obj, key) => {
              return <OptionsCard key={key} obj={obj} />;
            })}

        <span className="w-[205px] h-[205px] rounded-full bg-[#8cd790]/[0.3] shadow-lg shadow-[#8cd790]/[0.3] absolute -bottom-[120px] -left-3 blur-3xl" />
      </div>
    </div>
  );
};

export default OptionsContainer;
