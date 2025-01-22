import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets.js";
const Navbar = () => {
  const {token, settoken, userdata} = useContext(AppContext)
  const navigate = useNavigate();

  //testing purpose
  
  const logout = () => {
    settoken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className=" lg:p-6 md:px-16 px-3 flex justify-between items-center w-[100vw]  min-h-[10vh] lg:justify-around">
      <div onClick={()=>{navigate('/');window.scrollTo(0, 0)}} className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-extrabold text-[#f84f39]  bg-transparent flex justify-center cursor-pointer">
        <span className="text-[#2a966f] bg-transparent ">&lt;</span>DevInsta
        <span className="text-[#2a966f] bg-transparent">/&gt;</span>
      </div>
      <div className="lg:flex justify-around items-center gap-20 hidden px-10">
        <NavLink onClick={() => window.scrollTo(0, 0)} to="/">
          <h3 className="text-base hover:text-gray-300 transition duration-300">
            HOME
          </h3>
          <hr className="border-none outline-none h-0.5 bg-green-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => window.scrollTo(0, 0)} to="/developers">
          <h3 className="text-base hover:text-gray-300 transition duration-300">
            DEVELOPERS
          </h3>
          <hr className="border-none outline-none h-0.5 bg-green-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => window.scrollTo(0, 0)} to="/projects">
          <h3 className="text-base hover:text-gray-300 transition duration-300">
            PROJECTS
          </h3>
          <hr className="border-none outline-none h-0.5 bg-green-600 w-3/5 m-auto hidden" />
        </NavLink>
      </div>
      <div className="flex gap-10 items-center justify-between">
        <div>
          {token ? (
            <div className="relative group">
              <div className="flex items-center md:gap-10 gap-1" >
                <img
                  src={assets.profile_pic}
                  alt="Profile"
                  className="w-auto md:h-12 h-10 rounded-full"
                />
              </div>

              <div className="rounded-lg absolute top-full mt-2 py-5 px-12  transform -translate-x-1/2 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-300 text-lg z-50">
                <p
                  className="mb-4 cursor-pointer bg-transparent"
                  onClick={()=>navigate(`/developers/${userdata._id}`)}
                >
                  Profile
                </p>
                <p
                  className="cursor-pointer bg-transparent"
                  onClick={() => {
                    navigate("./");
                    logout();
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="relative bg-green-600 text-lg px-6 py-2 my-0.5 rounded-full hover:bg-green-700 transition duration-300"
            >
              SIGN UP
            </button>
          )}
        </div>
        <div>
          <div className="menu-icon flex flex-col justify-around items-start w-8 h-8 cursor-pointer lg:hidden relative group">
            <span className="w-5 md:h-1 h-0.5 bg-gray-300 rounded"></span>
            <span className="w-7 md:h-1 h-0.5 bg-gray-300 rounded"></span>
            <span className="w-9 md:h-1 h-0.5 bg-gray-300 rounded"></span>

            {/* Dropdown options */}
            <div className="absolute top-full  w-full h-[20vh] mt-2 py-5 px-20 -left-10 transform -translate-x-1/2 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-evenly items-center text-white transition-opacity duration-300 text-lg z-50 rounded-xl">
              <p
                className="mb-2 cursor-pointer bg-transparent"
                onClick={() => navigate("./")}
              >
                Home
              </p>
              <p
                className="mb-2 cursor-pointer bg-transparent"
                onClick={() => navigate("/developers")}
              >
                Developers
              </p>
              <p
                className="cursor-pointer bg-transparent"
                onClick={() => navigate("/projects")}
              >
                Projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
