import React from 'react'
import Link from 'next/link'

const LoginButtonModal = () => {
  return (
    <div id='login-btn-modal' className='hidden absolute top-12 right-0 rounded-md w-full h-auto bg-[#fff] shadow-md  flex-col justify-start items-start p-2 gap-1'>
        <Link href="https://portal.maidsimpl.com/" className='w-full h-10 flex items-center justify-center text-sm bg-transparent font-semibold shadow-sm bg-white text-[#8cd790] hover:bg-gray-50 transition-all duration-200  rounded-md '>
            User
        </Link>

        <Link href="https://portal.maidsimpl.com/" className='w-full h-10 flex items-center justify-center text-sm bg-transparent font-semibold shadow-sm bg-white text-[#8cd790] hover:bg-gray-50 transition-all duration-200  rounded-md '>
            Cleaner
        </Link>
    </div>
  )
}

export default LoginButtonModal