import React from "react";

const HomeBanner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center border-b-2 border-gray-500  text-white min-h-[90vh]">

    <div>
      <div className="text-8xl font-bold mb-2">Welcome to <span className="text-green-500">&lt;</span>DevInsta<span className="text-green-500">/&gt;</span></div>
      <div className="text-8xl font-bold">Developers Community Hub</div>
    </div>
  
    <div className="text-lg max-w-3xl text-gray-100 mt-8">
      DevInsta is a platform designed for developers to showcase their projects and skills. It provides the tools you need to create a professional profile and share your latest projects with the tech community.
    </div>
    
  </div>
  )  
};

export default HomeBanner;
