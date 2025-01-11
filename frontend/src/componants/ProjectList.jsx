import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const { projects } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col items-center justify-center mx-auto p-16 max-h-auto">
      <h2 className="text-4xl font-bold pb-10">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {projects.map((item) =>
          item.projects.map((project) => (
            <div
              key={project._id}
              className=" border rounded-xl border-gray p-3 overflow-hidden"
            >
              {project.photo && (
                <img
                  src={project.photo}
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="mb-2">
                  <strong>Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>
                <div className="flex space-x-2">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live_preview_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
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
        onClick={() => {navigate("./projects");window.scrollTo(0, 0)}}
        className="cursor-pointer text-blue-500 underline-none bg-transparent border-2 border-green-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white hover:underline-none transition-all duration-300 active:scale-95 mt-5"
      >
        more...
      </button>
    </div>
  );
};

export default ProjectList;
