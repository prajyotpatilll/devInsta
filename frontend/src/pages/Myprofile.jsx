import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Myprofile = () => {
  const { token, backendURL } = useContext(AppContext);

  const [userdata, setuserdata] = useState([]);

  const getmyprofile = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/profile", {
        headers: { token },
      });
      if (data.success) {
        setuserdata(data.userdata);
        console.log(data.userdata);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getmyprofile();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg w-[100vw]">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between md:border rounded-2xl lg:p-5 p-2 w-full max-w-5xl mx-auto shadow-lg ">
        <div className="flex flex-col w-full lg:w-[60%] md:p-7 p-4">
          <div className="w-full mb-4 flex flex-col justify-end lg:items-start items-center ">
            <p className="text-4xl lg:text-6xl font-bold py-1 text-white">
              {userdata.name}
            </p>
            <p className="text-lg lg:text-xl font-semibold text-gray-300 pt-3">
              {userdata.role}
            </p>
          </div>
          <div className=" text-gray-100 flex flex-col justify-end lg:items-start items-center">
            <p className="text-base">Email:- {userdata.email}</p>
            <p className="text-base pb-5">Contact:-{userdata.phone}</p>
            <p className="md:text-sm text-sm text-center lg:text-left text-gray-300">{userdata.description}</p>
          </div>
        </div>
        <div className="mt-0 lg:mt-0 lg:ml-6 ">
          <img
            className="w-full h-96 object-cover bg-transparent"
            src={userdata.profile_photo}
            alt="photograph"
          />
        </div>
      </div>

      <div className="text-gray-300 w-full flex justify-center items-center pt-5 text-2xl font-bold">
        Skills
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 m-6">
        {userdata.skills && userdata.skills.length > 0 ? (
          userdata.skills.map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <p className="border-2 text-sm sm:text-lg md:text-xl border-gray-300 px-5 sm:px-8 md:px-10 py-1 flex items-center justify-center rounded-3xl m-2 text-red-500 font-bold">
                {item.name}
              </p>
            </div>
          ))
        ) : (
          <p className=" text-gray-500 text-sm md:text-base flex items-center justify-center">
           
          </p>
        )}
      </div>
      <div className="text-gray-300 w-full flex justify-center items-center pt-5 text-2xl font-bold">
        Projects
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 py-6">
          {userdata.projects && userdata.projects.length > 0 ? (
            userdata.projects.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl border-gray-400 p-3 overflow-hidden bg-[#525676] transition-transform transform hover:scale-95"
              >
                {item.photo && (
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg bg-[#525676]"
                  />
                )}
                <div className="p-4 bg-[#525676]">
                  <h3 className="text-lg font-semibold mb-2 bg-[#525676]">
                    {item.name}
                  </h3>
                  <p className="mb-2 bg-[#525676]">
                    <strong className="bg-[#525676]">Technologies:</strong>{" "}
                    {item.technologies.join(", ")}
                  </p>
                  <div className="flex gap-1 bg-[#525676]">
                    <a
                      href={item.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2590f2] text-white py-2 px-3 rounded hover:bg-blue-600 transition"
                    >
                      GitHub
                    </a>
                    <a
                      href={item.live_preview_link}
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
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No projects available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
