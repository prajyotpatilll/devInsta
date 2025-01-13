import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets.js";
const Navbar = () => {
  // const {token, settoken} = useContext(AppContext)
  const navigate = useNavigate();

  //testing purpose
  const [token, settoken] = useState(true);
  const logout=  ()=>{
        settoken(false)
  }

  return (
    <div className=" p-6 flex justify-around items-center  min-h-[10vh]">
      <div className="text-2xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold text-[#f84f39]  bg-transparent">
           <span className="text-[#2a966f] bg-transparent ">&lt;</span>DevInsta
          <span className="text-[#2a966f] bg-transparent">/&gt;</span>
        </div>
      <div className="flex space-x-10">
        <NavLink onClick={() => window.scrollTo(0, 0)} to="/">
          <h3 className="text-lg hover:text-gray-300 transition duration-300">
            HOME
          </h3>
          <hr className="border-none outline-none h-0.5 bg-green-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => window.scrollTo(0, 0)} to="/developers">
          <h3 className="text-lg hover:text-gray-300 transition duration-300">
            DEVELOPERS
          </h3>
          <hr className="border-none outline-none h-0.5 bg-green-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => window.scrollTo(0, 0)} to="/projects">
          <h3 className="text-lg hover:text-gray-300 transition duration-300">
            PROJECTS
          </h3>
          <hr className="border-none outline-none h-0.5 bg-green-600 w-3/5 m-auto hidden" />
        </NavLink>
      </div>
      <div>
        {token ? (
         <div className="relative group">
         <img
           src={assets.profile_pic}
           alt="Profile"
           className="w-12 h-12 mx-9 rounded-full"
         />
         <div
           className="absolute top-full mt-2 py-5 px-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-300 text-lg z-50"
         >
           <p className="mb-4 cursor-pointer bg-transparent" onClick={() => navigate("./developers:id")}>
             Profile
           </p>
           <p className="cursor-pointer bg-transparent" onClick={() => { navigate("./"); logout(); }}>
             Logout
           </p>
         </div>
       </div>
       
        ) : (
          <button onClick={()=>settoken(true)} className="relative bg-green-600 text-lg px-6 py-2 my-0.5 rounded-full hover:bg-green-700 transition duration-300">
            SIGN UP
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
