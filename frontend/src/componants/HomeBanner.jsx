import React from "react";
import { assets } from "../assets/assets";

const HomeBanner = () => {
  return (
    <div className="relative flex lg:flex-row flex-col items-center lg:justify-between justify-start text-center  text-white h-auto pt-5 md:pt-20  lg:pt-0 lg:min-h-[90vh] overflow-hidden ">
      
      <div className="lg:absolute relative right-0 rounded-md">
        <video
          src={assets.video}
          autoPlay
          loop
          muted
          className="relative  lg:w-auto xl:h-[75vh] lg:h-[55vh] h-full w-[90vw]  rounded-2xl 2xl:-right-1/4 lg:-right-2/4" 
        />
      </div>
      
      

      <div className="lg:absolute relative z-10  2xl:left-20  bg-transparent flex flex-col items-center p-5  justify-center">
        <div className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl  2xl:text-8xl font-extrabold text-white mb-4 bg-transparent">
          Welcome to 
        </div>
        <div className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl  2xl:text-8xl font-extrabold text-[#f84f39] lg:mb-4 bg-transparent">
           <span className="text-[#2a966f] bg-transparent ">&lt;</span>DevInsta
          <span className="text-[#2a966f] bg-transparent">/&gt;</span>
        </div>
        

        <div className="md:text-base text-sm flex  max-w-xl mx-auto text-gray-400 mt-8 bg-transparent">
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
