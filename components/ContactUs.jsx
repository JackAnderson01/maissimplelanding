import React, { useState } from "react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Navbar from "./Navbar";
import Link from "next/link";
import axios from "axios";
import ErrorAlertMessage from "./ErrorAlertMessage";

const ContactUs = () => {
  // Integration code:

  // States:
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const sendMessage = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const params = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      message: message,
    };

    if (email == "") {
      setErrorMessage("Email is required");
    } else if (message == "") {
      setErrorMessage("You must add some message to sent");
    } else if (message.length > 300) {
      setErrorMessage("Message length must be less than 300 characters");
    } else {
      setLoading(true);

      axios
        .post("/api/landing/contactUs", params, { headers })
        .then((response) => {
          // proceed
          setSuccess(true);
          setLoading(false);
        })
        .catch((error) => {
          setErrorMessage(
            error?.response?.data?.error?.details[0]?.message
              ? error?.response?.data?.error?.details[0]?.message
              : "Internal Server Error"
          );
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className=" w-screen h-screen lg:h-[100vh] flex items-end gap-8">
        <div className="relative w-1/3 hidden h-full rounded-r-[50px] lg:flex items-center justify-end bg-[#d9d9d9]/[0.12]">
          <img src="/assets/contactus.png" alt="contact_us_banner" />
        </div>

        <div className="w-full lg:w-2/3 h-full lg:rounded-l-[50px] bg-[#d9d9d9]/[0.12] flex flex-col justify-center gap-2">
          <Navbar />
          <div className="flex flex-col lg:mt-4 justify-center items-start px-6 w-full h-28 bg-[#8cd790] text-white">
            <h1 className="text-[30px] lg:text-[35px] font-medium ">
              We would love to help
            </h1>
            <span className="text-[21px] lg:text-[25px] font-[400] text-[#fff]/[0.4]">
              Reachout and we will get in touch within 24 hours
            </span>
          </div>

          <div className="w-full h-auto my-10 flex items-start justify-start px-6">
            {/* Input fields */}
            <form className="w-full h-[80%] gap-8 flex flex-col items-start justify-start">
              <div className="w-full h-auto flex flex-col items-start justify-start px-16 gap-6">
                <div className="w-full h-auto flex  flex-wrap justify-between items-start">
                  <div className="w-full lg:w-[48%] h-auto">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 ml-2 text-lg text-gray-600 font-semibold"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="first_name"
                      className="border-2 h-[57px] border-gray-200 text-gray-800 text-md outline-none rounded-xl focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                      required
                    />
                  </div>
                  <div className="w-full lg:w-[48%] h-auto">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 ml-2 text-lg text-gray-600 font-semibold"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border-2 h-[57px] border-gray-200 text-gray-800 text-md outline-none rounded-xl focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                      required
                    />
                  </div>
                </div>

                <div className="w-full h-auto">
                  <label
                    htmlFor="email"
                    className="block mb-2 ml-2 text-lg text-gray-600 font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 h-[57px] border-gray-200 text-gray-800 text-md outline-none rounded-xl focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                    required
                  />
                </div>

                <div className="w-full h-auto">
                  <label
                    htmlFor="message"
                    className="block mb-2 ml-2 text-lg text-gray-600 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-2 h-[150px] border-gray-200 resize-none text-gray-800 text-md outline-none rounded-xl focus:ring-gray-400 focus:border-gray-400 block w-full px-3.5 py-2.5"
                    required
                  ></textarea>
                </div>

                <button
                  onClick={sendMessage}
                  className={`bg-[#8cd790] ${
                    success && "bg-[#8cd790]"
                  }  shadow-sm shadow-[#1c1c1c] h-[57px] text-[#fff] text-lg font-semibold outline-none rounded-xl transition-all duration-100 hover:bg-opacity-90 block w-full p-2.5`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          <div className="w-full h-16 py-2 px-6 border-t-2 border-gray-500 flex items-center justify-between">
            <span className="text-sm text-gray-600 font-normal">
              2021 MAIDSIMPL ALL RIGHT RESERVED
            </span>

            <div className="w-auto flex justify-start gap-3 items-center h-auto">
              <Link href="https://www.facebook.com/">
                <FaFacebook className="text-2xl text-[#8cd790]" />
              </Link>

              <Link href="https://www.instagram.com/">
                <BiLogoInstagramAlt className="text-2xl text-[#8cd790]" />
              </Link>

              <Link href="https://www.linkedin.com/">
                <FaLinkedin className="text-2xl text-[#8cd790]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && (
        <ErrorAlertMessage
          message={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
};

export default ContactUs;
