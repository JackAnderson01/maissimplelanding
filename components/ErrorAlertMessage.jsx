import React, {useEffect} from "react";
import {MdClose} from "react-icons/md"


const ErrorAlertMessage = ({message, setErrorMessage}) => {

    const closeMessage = () => {
        setErrorMessage(null)
    }

    useEffect(()=>{
        setTimeout(()=>{
            setErrorMessage(null)
        },5000)
    },[])

  return (
    <div id="errorMessage" className="capitalize w-screen h-12 px-4 fixed bottom-0 left-0 flex items-center justify-start gap-3 bg-red-500 text-white font-semibold">
      <svg
      
        class="flex-shrink-0 inline w-5 h-5 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>


      <span className="text-md font-medium">
            {message}
      </span>

      <MdClose onClick={closeMessage} className="ml-auto text-xl font-bold text-white"/>
    </div>
  );
};

export default ErrorAlertMessage;
