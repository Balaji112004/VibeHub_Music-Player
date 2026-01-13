import React from 'react'
import lo from './../assets/lo.png'
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Nav() {
  const { user, logoutUser } = useUser();
  return (
    <>
      {/* NAVBAR */}
      <div className='grid grid-cols-12 gap-4 bg-black p-2 pb-0'>

        {/* Left Section */}
        <div className='flex justify-between col-span-9'>
          <img src={lo} className='h-16 mt-2 ml-2'/>

          <div className='flex'>
            <Link 
              to="/" 
              className='m-3 p-3 text-lg font-semibold hover:bg-gray-800 rounded-lg cursor-pointer text-white'>
              Movie
            </Link>

            <Link
              to="/songs"
              className='m-3 p-3 text-lg font-semibold hover:bg-gray-800 rounded-lg cursor-pointer text-white'>
              All Song
            </Link>

            <Link
              to="/liked"
              className='m-3 p-3 text-lg font-semibold hover:bg-gray-800 rounded-lg cursor-pointer text-white'>
              Liked
            </Link>
          </div>
        </div>

        {/* Right Buttons */}
{/* Right Section */}
<div className='col-span-3 flex items-center justify-end'>

  {user ? (
    <>
      <span className="text-white mr-4 text-lg">
        Hello, <b>{user.name}</b>
      </span>

      <button
        onClick={logoutUser}
        className="m-3 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">
        <button className="m-3 px-6 py-3 bg-white text-gray-700 font-bold border border-gray-300 rounded-xl">
          Login
        </button>
      </Link>

      <Link to="/signup">
        <button className="m-3 px-6 py-3 bg-white text-gray-700 font-bold border border-gray-300 rounded-xl">
          Sign Up
        </button>
      </Link>
    </>
  )}

</div>


      </div>

      {/* PAGE CONTENT BELOW NAV */}
      <div className=''>
        <Outlet />
      </div>
    </>
  );
}

export default Nav;
