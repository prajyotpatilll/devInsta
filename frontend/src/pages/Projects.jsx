import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { projects } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-start justify-center mx-auto pt-5 max-h-auto">
      <div className="flex items-center justify-center mb-6 pt-5">
        <h2 className="text-3xl md:text-4xl font-bold">Discover</h2>
        <h2 className="text-3xl md:text-4xl font-bold pl-4 text-gray-500">Projects</h2>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {projects.slice(0, 10).map((item) =>
          item.projects.slice(0, 10).map((project) => (
            <div
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
    </div>
  );
};

export default Projects;
