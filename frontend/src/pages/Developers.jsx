import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Developers = () => {
  const { developers } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-full p-6 flex flex-col items-start justify-center">
      {/* Heading section */}
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">Discover</h2>
        <h2 className="text-3xl md:text-4xl font-bold pl-4 text-gray-500">Projects</h2>
      </div>

      {/* Developer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {developers.map((item) => (
          <div
            onClick={() => navigate(`/${item._id}`)}
            key={item._id}
            className="cursor-pointer flex items-center border border-gray-300 rounded-lg bg-white shadow-md p-4"
          >
            {/* Profile photo */}
            {item.profile_photo ? (
              <img
                className="w-20 h-20 rounded-md object-cover bg-gray-400"
                src={item.profile_photo}
                alt={`${item.name}'s profile`}
              />
            ) : (
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-md text-gray-500 text-sm">
                No Photo
              </div>
            )}

            {/* Text Content */}
            <div className="flex flex-col ml-4">
              <h3 className="text-xl font-bold text-gray-700 bg-white">{item.name}</h3>
              <p className="text-lg text-gray-600 bg-white">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
