import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Developers = () => {
  const { developers } = useContext(AppContext);
  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap items-start justify-center gap-6 p-6 w-[100vw] min-h-[85vh]">
      {developers.map((item) => (
        <div
        onClick={()=>navigate(`/developers/${item._id}`)}
          key={item._id}
          className="cursor-pointer flex items-center border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-[20rem] p-2 sm:flex-row sm:w-[48%] md:w-[30%] lg:w-[20%]"
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
            <h3 className="text-2xl font-bold bg-white text-gray-700">{item.name}</h3>
            <p className="text-lg text-gray-600 bg-white">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Developers;
