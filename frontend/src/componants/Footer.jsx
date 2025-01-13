import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] pt-40 flex flex-col justify-center items-center">
      <div className="flex justify-evenly px-80 item-center w-full">
        <div>
          <p className="text-lg font-bold text-[#f84f39]">Explore</p>
          <p
            onClick={() => {
              navigate("./");
              window.scrollTo(0, 0);
            }}
            className="text-base font-bold pt-6 text-[#8e8da0] cursor-pointer"
          >
            Home
          </p>
          <p
            onClick={() => {
              navigate("./developers");
              window.scrollTo(0, 0);
            }}
            className="text-base font-bold pt-3 text-[#8e8da0] cursor-pointer"
          >
            Developer
          </p>
          <p
            onClick={() => {
              navigate("./projects");
              window.scrollTo(0, 0);
            }}
            className="text-base font-bold pt-3 text-[#8e8da0] cursor-pointer"
          >
            Projects
          </p>
        </div>

        <div>
          <p className="text-lg font-bold text-[#2a966f]">Social</p>
          <p
            className="text-base font-bold pt-6 text-[#8e8da0] cursor-pointer"
            onClick={() => window.open("https://www.linkedin.com/in/prajyotpatil2744", "_blank")}
          >
            Linkden
          </p>
          <p
            className="text-base font-bold pt-3 text-[#8e8da0] cursor-pointer"
            onClick={() => window.open("https://github.com/prajyotpatilll", "_blank")}
          >
            Github
          </p>
          <p
            className="text-base font-bold pt-3 text-[#8e8da0] cursor-pointer"
            onClick={() => window.open("https://www.instagram.com/prajyotpatilll/", "_blank")}
          >
            Instagram
          </p>
        </div>

        <div>
          <p className="text-lg font-bold text-[#8782ee]">Updates</p>
          <div className=" w-60 p-6 bg-[#20202e] rounded-xl mt-5">
            <p className="text-gray-500 bg-[#20202e] pb-3">version 0.01.0</p>
            <p className="text-xl font-bold bg-[#20202e]">Project was in</p>
            <p className="text-xl font-bold bg-[#20202e]">Beta phase</p>
            <p className="text-sm font-light bg-[#20202e] pt-3">13/01/2025</p>
          </div>
        </div>
      </div>
      <div className="relative bottom-0 flex items-center justify-center text-gray-500 py-20">
        All Copyrights Reserved By Thinksoftonic@gmail.com !!!
      </div>
    </div>
  );
};

export default Footer;
