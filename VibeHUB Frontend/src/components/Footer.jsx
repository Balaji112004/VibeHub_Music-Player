import React from 'react'
import logo from "../assets/logoo2.PNG";
function Footer() {
  return (
    <div className='w-full h-[50px] flex justify-center font-bold mt-3 p-2 bg-gray-500'>
        <div className='mt-1'>Product of </div> <img className='h-8 ml-2' src={logo} alt="" />
    </div>
  )
}

export default Footer