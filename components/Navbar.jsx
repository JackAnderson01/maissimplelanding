import React,{useEffect} from 'react'
import Link from 'next/link'
import LoginButtonModal from './LoginButtonModal';
import { useRouter } from 'next/router';

function Navbar() {



  const showLoginBtnModal = () => {
    const modal = document.getElementById("login-btn-modal");
    const btn = document.getElementById('login-btn');
    btn.classList.toggle('focus-within:bg-[#8cd790]')
    btn.classList.toggle('focus-within:border-[#8cd790]')
    btn.classList.toggle('focus-within:text-white')
    // btn.classList.toggle('text-')
    modal.classList.toggle("flex");
    modal.classList.toggle("hidden");
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("translate-x-64");
    sidebar.classList.toggle("translate-x-0");
    sidebar.classList.toggle("hidden");
    sidebar.classList.toggle("flex")
  };

  const router = useRouter();

  const navigateTo = (link) => {
    router.push("/home");
      const scrollToElement = () => {
        const elem = document.getElementById(link);

        if (elem) {
          elem.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }

      // Navigate to the root path

      // Scroll to the element after a delay
      const timeoutId = setTimeout(scrollToElement, 1000);

      // Clean up the timeout to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
  };

  



  return (
    <div className="w-full z-50 bg-transparent px-6 md:px-8 lg:px-20 h-28 flex justify-between items-center ">
      <Link href="/">
        <img src="/assets/logo.svg" alt="maid-simple" />
      </Link>
      <div
        id="sidebar"
        className="hidden absolute top-[5.8rem] right-2 rounded-3xl lg:rounded-none transition-all duration-200 text-left  bg-white lg:bg-transparent z-40 shadow-md shadow-gray-400 lg:shadow-none translate-x-64 lg:translate-x-0   lg:static w-56 lg:w-auto h-auto  lg:h-full lg:flex flex-col lg:flex-row gap-6 justify-start items-start p-8 lg:p-0 lg:justify-center lg:items-center text-gray-800 mx-auto"
      >
        <Link
          href="/"
          className=" text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  active uppercase"
        >
          Home
        </Link>
        <button
          onClick={() => navigateTo("about-us")}
          className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
        >
          About
        </button>
        <Link
          href="https://app.maidsimpl.com/auth/login"
          className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
        >
          Book Us
        </Link>
        <button
          onClick={() => navigateTo("faq")}
          className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
        >
          faq
        </button>
        <Link
          href="/contactus/"
          className="text-[18px] font-medium transition-all duration-150 hover:text-[#8CD790]  uppercase"
        >
          Contact
        </Link>
      </div>

      <div className="flex gap-2 items-center justify-start">
        <div className="relative flex flex-col justify-start items-start">
          <button
            id="login-btn"
            onClick={showLoginBtnModal}
            className="w-32 h-8 lg:h-10 border-2 border-gray-800 rounded-md flex items-center justify-center  transition-all  duration-200 hover:text-white hover:bg-[#8CD790] hover:border-[#8CD790] text-md font-medium"
          >
            Login
          </button>
          <LoginButtonModal />
        </div>

        <button
          onClick={toggleSidebar}
          className="w-6 h-auto flex lg:hidden justify-center items-center"
        >
          {/* <HiMenuAlt3 className="text-3xl text-black font-bold" /> */}
        </button>
      </div>
    </div>
  )
}

export default Navbar