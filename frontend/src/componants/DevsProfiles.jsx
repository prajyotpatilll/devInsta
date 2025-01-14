import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const DevsProfiles = () => {
  return (
    <div className="flex items-center justify-start flex-col p-15 w-[100vw] min-h-[60vh]">
      <div className="flex flex-col items-start justify-center p-10">
        <div>
          <img className="py-5" src={assets.rawx} alt="" />
        </div>
        <div className="flex">
          <h2 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-bold sm:pb-3 pb-1">
            Explore developer
          </h2>
          <h2 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-bold sm:pb-3 pb-1 pl-3 text-gray-500">
            Profiles
          </h2>
        </div>

        <h2 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-bold  text-gray-500">
          and see the Talent Behind the Code.
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 p-2 w-[100vw] h-[vh]">
        <img className="w-28" src={assets.arrow} alt="" />
      </div>

      <div className="flex flex-col items-center justify-start p-5">
        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-bold p-3 transition-colors duration-300 hover:text-[#f84f39]">
          Showcase your work
        </p>

        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl  font-bold p-3 text-[#eaeaec] transition-colors duration-300 hover:text-[#847fe7]">
          Create Portfolio
        </p>

        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-bold p-3 text-[#acadb3] transition-colors duration-300 hover:text-[#216fba]">
          Explore projects
        </p>

        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl  font-bold p-3 text-[#97989f] transition-colors duration-300 hover:text-[#2c8d6e]">
          community
        </p>

        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl  font-bold p-3 text-[#83848c] transition-colors duration-300 hover:text-[#57292f]">
          Coding
        </p>

        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl  font-bold p-3 text-[#595a66] transition-colors duration-300 hover:text-[#2f3052]">
          Technology
        </p>

        <p className="lg:text-7xl md:text-6xl sm:text-5xl text-3xl  font-bold p-3 text-[#303241] transition-colors duration-300 hover:text-[#19253d]">
          Skills
        </p>
      </div>
    </div>
  );
};

export default DevsProfiles;
