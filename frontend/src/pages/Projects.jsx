import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { projects } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-start justify-center mx-auto pt-10 max-h-auto">
      <div className="flex flex-col items-center justify-start ">
        <div className="flex items-center justify-center ">
          <h2 className="md:text-4xl text-3xl font-bold ">Discover</h2>
          <h2 className="md:text-4xl text-3xl font-bold pl-4 text-gray-500">
            Projects
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 py-6">
        {projects.map((item) =>
          item.projects.map((project) => (
            <div
              key={project._id}
              className=" border rounded-xl border-gray-400 p-3 overflow-hidden bg-[#525676] transition-transform transform hover:scale-95"
            >
              {project.photo && (
                <img
                  src={project.photo}
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-lg bg-[#525676]"
                />
              )}
              <div className="p-4 bg-[#525676]">
                <h3 className="text-lg font-semibold mb-2 bg-[#525676]">
                  {project.name}
                </h3>
                <p className="mb-2 bg-[#525676]">
                  <strong className="bg-[#525676]">Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>
                <div className="flex gap-1 bg-[#525676]">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2590f2] text-white py-2 px-3 rounded hover:bg-blue-600 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live_preview_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2a966f] text-white py-2 px-4 rounded hover:bg-green-700 transition"
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
