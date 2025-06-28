import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const ProjectList = () => {
  const { projects } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col items-center justify-center mx-auto md:p-20 p-5 max-h-auto max-w-[100vw] ">
      {/* demo */}
      <div className="flex flex-col items-start justify-center ">
        <div>
          <img className="py-5" src={assets.raw} alt="" />
        </div>
        <div className="flex">
          <h2 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-bold md:pb-3 pb-1">
            Discover innovative
          </h2>
          <h2 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-bold md:pb-3 pb-1 pl-3 text-gray-500">
            Creations
          </h2>
        </div>

        <h2 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-bold  text-gray-500">
          from developers around the world.
        </h2>
      </div>

      {/* demo */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 2xl:p-20 p-5">
        {projects.slice(0, 10).map((item) =>
          item.projects.slice(0, 10).map((project) => (
            <div
            onClick={() => {
              navigate(`/${item._id}`);
              window.scrollTo(0, 0);
            }}
            
              key={project._id}
              className="border rounded-xl border-gray-400 p-3 bg-[#525676] transition-transform transform hover:scale-95 flex flex-col"
            >
              {project.photo && (
                <img
                  src={project.photo}
                  alt={project.name}
                  className="w-full h-44 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-col justify-between flex-grow p-4 bg-transparent">
                <h3 className="text-xl font-semibold mb-2 bg-transparent">{project.name}</h3>
                <h4 className="font-bold bg-transparent">Technologies:</h4>
                <p className="w-full text-sm mb-3 bg-transparent overflow-scroll">
                  
                 {project.technologies}
                </p>
                <div className="flex gap-2 mt-auto bg-transparent">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2590f2] text-white py-2 px-3 rounded hover:bg-blue-600 transition text-center flex-1"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live_preview_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2a966f] text-white py-2 px-4 rounded hover:bg-green-700 transition text-center flex-1"
                  >
                    Live Preview
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => {
          navigate("./projects");
          window.scrollTo(0, 0);
        }}
        className=" bg-[#8782ee] border-0 box-border text-white flex items-center justify-center  text-base leading-7 py-3 px-6 w-full max-w-56 transform rotate-[-2deg] cursor-pointer relative after:content-[''] after:absolute after:border after:border-white after:bottom-[4px] after:left-[4px] after:w-[calc(100%-1px)] after:h-[calc(100%-1px)] hover:after:bottom-[2px] hover:after:left-[2px] md:py-3 md:px-12 md:text-lg"
      >
        more...
      </button>
    </div>
  );
};

export default ProjectList;
