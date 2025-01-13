import React from "react";
import { assets } from "../assets/assets";

const HomeBanner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center  text-white min-h-[90vh] overflow-hidden">
      <div className="absolute right-0 rounded-md">
        <video
          src={assets.video}
          autoPlay
          loop
          muted
          className="relative  w-auto h-[75vh] rounded-l-3xl -right-1/4" 
        />
      </div>
      <div className="relative z-5 right-32 bottom-40">
        <img src={assets.bomb} alt="" />
      </div>

      <div className="absolute z-10 left-60  bg-transparent flex flex-col items-center p-5  justify-center">
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-extrabold text-white mb-4 bg-transparent">
          Welcome to 
        </div>
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-extrabold text-[#f84f39] mb-4 bg-transparent">
           <span className="text-[#2a966f] bg-transparent ">&lt;</span>DevInsta
          <span className="text-[#2a966f] bg-transparent">/&gt;</span>
        </div>
        

        <div className="text-lg flex sm:text-xl max-w-2xl mx-auto text-gray-400 mt-8 bg-transparent">
          DevInsta is a platform designed for developers to showcase their
          projects and skills. It provides the tools you need to create a
          professional profile and share your latest projects with the tech
          community.
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
