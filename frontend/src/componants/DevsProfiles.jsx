import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const DevsProfiles = () => {
  const { developers } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-start flex-col p-15 w-[100vw] min-h-[60vh]">
      <div className="flex flex-col items-start justify-center p-10">
        <div className="flex">
          <h2 className="text-5xl font-bold pb-3">Explore developer</h2>
          <h2 className="text-5xl font-bold pb-3 pl-3 text-gray-500">
            Profiles
          </h2>
        </div>

        <h2 className="text-5xl font-bold  text-gray-500">
          and see the Talent Behind the Code.
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 p-2 w-[100vw] h-[vh]">
        {developers.map((item) => (
          <div
            key={item._id}
            className="cursor-pointer flex items-center border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-[20rem] p-2 sm:flex-row sm:w-[48%] md:w-[30%] lg:w-[20%]"
            onClick={() => navigate(`/developers/${item._id}`)}
          >
            {item.profile_photo ? (
              <img
                className="w-20 h-20 rounded-md object-cover"
                src={item.profile_photo}
                alt={`${item.name}'s profile`}
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full text-gray-500 text-sm">
                No Photo
              </div>
            )}
            <div className="flex flex-col ml-4">
              <h3 className="text-2xl font-bold bg-white text-gray-700">
                {item.name}
              </h3>
              <p className="text-lg text-gray-600 bg-white">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevsProfiles;
