import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion.js";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      id="faq"
      className="relative w-full h-auto px-6 py-6 md:px-8 md:py-14 lg:px-20 lg:py-8 mt-10 flex flex-col justify-center items-center gap-12 bg-[#fff]"
    >
      <h1 className="text-5xl mt-4 md:mt-2 lg:mt-0 text-center font-extrabold text-black">
        FAQ
      </h1>

      <div className="w-full h-auto  md:px-6 lg:px-14 flex flex-col gap-3 justify-start items-start">
        <motion.div
          variants={fadeIn("right", "tween", 0.5, 1)}
          id="accordion-collapse"
          data-accordion="collapse"
          className="w-full"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("accordion-1")
                  .classList.toggle("hidden");
              }}
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border border-b-0 border-gray-200 outline-none rounded-md   hover:bg-gray-200 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>
                How does Maid Simpl differentiate between Base Clean and Deep
                Clean?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-1"
            className="hidden transition-all duration-200  "
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border bg-[#EEFEF4] border-b-0 rounded-md mt-1 border-gray-200 ">
              <p className="mb-2 text-gray-500 ">
                Our "Base Clean" covers essential cleaning tasks ensuring your
                home is tidy and fresh. The "Deep Clean" is a thorough add-on
                that ensures the cleaners have the extra time for areas that are
                a bit more messy. This makes it ideal for first-time cleanings
                or homes needing extra attention.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.5, 1)}
          id="accordion-collapse"
          data-accordion="collapse"
          className="w-full"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("accordion-2")
                  .classList.toggle("hidden");
              }}
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border rounded-md border-b-0 border-gray-200 outline-none    hover:bg-gray-200 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>
                What if I do not see an Add on Feature for my cleaning needs?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-2"
            className="hidden transition-all duration-200 "
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border bg-[#EEFEF4] rounded-md mt-1 border-b-0 border-gray-200 ">
              <p className="mb-2 text-gray-500 ">
                Please reach out to support before booking a cleaning to best
                assist you. The add-ons we have listed are the most requested.
                We will do our best to fulfill all of your cleaning needs!
              </p>
              <p className="text-gray-500 ">
                Check out this guide to learn how to{" "}
                <a
                  href="https://app.maidsimpl.com/auth/login"
                  className="text-[#8cd790]  hover:underline"
                >
                  get started
                </a>{" "}
                and start developing websites even faster with components on top
                of Tailwind CSS.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("right", "tween", 0.5, 1)}
          id="accordion-collapse"
          data-accordion="collapse"
          className="w-full"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("accordion-3")
                  .classList.toggle("hidden");
              }}
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border rounded-md border-b-0 border-gray-200 outline-none    hover:bg-gray-200 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>Can we only book on the app?</span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-3"
            className="hidden transition-all duration-200 "
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border bg-[#EEFEF4] rounded-md mt-1 border-b-0 border-gray-200 ">
              <p className="mb-2 text-gray-500 ">
                No, MaidSimpl has the app to streamline the booking process but
                if you prefer the web our website will always be live and
                accepting bookings
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.5, 1)}
          id="accordion-collapse"
          data-accordion="collapse"
          className="w-full"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("accordion-4")
                  .classList.toggle("hidden");
              }}
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border rounded-md border-b-0 border-gray-200 outline-none    hover:bg-gray-200 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>Will I get updates before my cleaning?</span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-4"
            className="hidden transition-all duration-200 "
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border bg-[#EEFEF4] rounded-md mt-1 border-b-0 border-gray-200 ">
              <p className="mb-2 text-gray-500 ">
                Yes, we have push notifications and automated alerts via text &
                email. All notification settings are customizable in your
                account settings.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("right", "tween", 0.5, 1)}
          id="accordion-collapse"
          data-accordion="collapse"
          className="w-full"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("accordion-5")
                  .classList.toggle("hidden");
              }}
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border rounded-md border-b-0 border-gray-200 outline-none    hover:bg-gray-200 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>Can you choose your own cleaner?</span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-5"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border bg-[#EEFEF4] rounded-md mt-1 border-b-0 border-gray-200 ">
              <p className="mb-2 text-gray-500 ">
                Yes, you have the option to choose any available cleaner in your
                area along with the option to re-book cleaners you've used in
                the past.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.5, 1)}
          id="accordion-collapse"
          data-accordion="collapse"
          className="w-full"
        >
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("accordion-6")
                  .classList.toggle("hidden");
              }}
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border rounded-md border-b-0 border-gray-200 outline-none    hover:bg-gray-200 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>
                Do the cleaners always arrive at the exact booking time?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-6"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border bg-[#EEFEF4] rounded-md mt-1 border-b-0 border-gray-200 ">
              <p className="mb-2 text-gray-500 ">
                No, that is an estimate. Please allow our cleaners a 30 minute
                window for traffic, weather, or any other unpredictable issues
                that may occur.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Faq;
