import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";

const DevelopersProfile = () => {
  const { backendURL, uniqid, token, getmyprofile } = useContext(AppContext);
  const { _id } = useParams();
  const [userdata, setUserdata] = useState(null);
  const [isedit, setisedit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillUse, setSkillUse] = useState("");
  const navigate = useNavigate();

  const addskill = async () => {
    try {
      if (!skillName.trim()) {
        return toast.error("Skill Name is required!");
      }
      const response = await axios.post(
        `${backendURL}/api/user/addskills`,
        { skillName, skillUse },
        { headers: { token } }
      );
      await fetchUserProfile(_id);
      setSkillName(""); // Clear input
      setSkillUse("");
      toast.success("Skill added successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add skill. Please try again."
      );
    }
  };

  const fetchUserProfile = async (_id) => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/selecteddev`, {
        params: { _id },
      });
      if (data.success) {
        setUserdata(data.userdata);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  const skillidelete = async (itemid) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/user/deleteskills`,
        { skillsid: itemid },
        { headers: { token } }
      );
      await fetchUserProfile(_id);

      if (response.data.success) {
        toast.success("Skill deleted successfully.");
      } else {
        toast.error(response.data.message || "Failed to delete skill.");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill. Please try again.");
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleclick1 = () => {
    setIsVisible1(!isVisible1);
  };

  useEffect(() => {
    if (_id) {
      fetchUserProfile(_id);
    }
  }, [_id, backendURL, token]);

  useEffect(() => {
    if (uniqid === _id) {
      setisedit(true);
    }
  }, [uniqid, _id, token]);

  useEffect(() => {
    console.log("isedit:", isedit);
  }, [isedit]);

  if (!userdata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg w-[100vw]">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between md:border rounded-2xl lg:p-5 p-2 w-full max-w-5xl mx-auto shadow-lg ">
        <div className="flex flex-col w-full lg:w-[60%] md:p-9 p-4">
          <div className="w-full mb-4 flex flex-col justify-end lg:items-start items-center ">
            <p className="text-4xl lg:text-5xl font-bold py-1 text-white">
              {userdata.name}
            </p>

            <p className="text-lg lg:text-xl font-semibold text-gray-300 pt-3">
              {userdata.role}
            </p>
          </div>
          <div className=" text-gray-100 flex flex-col justify-end lg:items-start items-center">
            <p className="text-base">Email:- {userdata.email}</p>
            <p className="text-base pb-5">Contact:-{userdata.phone}</p>
            <p className="md:text-sm text-sm text-center lg:text-left ">
              {userdata.description}
            </p>
          </div>
        </div>
        <div className="mt-0 lg:mt-0 lg:ml-6 ">
          <img
            className="w-full md:h-96 h-52 object-cover bg-transparent rounded-xl"
            src={userdata.profile_photo}
            alt="photograph"
          />
        </div>
      </div>
      <div>
        {isedit ? (
          <button
            onClick={() => navigate("/editprofile")}
            className="px-8 py-2 mt-5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Edit
          </button>
        ) : (
          <p></p>
        )}
      </div>

      {/* 
      <div className="text-gray-300 w-full flex justify-center items-center pt-5 text-2xl font-bold">
        Skills
      </div> */}

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 m-6">
        {userdata.skills && userdata.skills.length > 0 ? (
          userdata.skills.map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <p className="border-2 text-sm sm:text-lg md:text-xl border-gray-300 px-5 sm:px-8 md:px-10 py-1 flex items-center justify-center rounded-3xl m-2 text-red-500 font-bold cursor-pointer ">
                {item.name}
              </p>
            </div>
          ))
        ) : (
          <p className=" text-gray-500 text-sm md:text-base flex items-center justify-center"></p>
        )}
      </div>

      {isedit ? (
        <div className="flex items-center justify-center">
          <button
            onClick={handleClick}
            className=" px-5 sm:px-8 md:px-10 py-2 rounded-3xl m-2 text-white font-bold bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-sm sm:text-lg md:text-xl flex items-center justify-center"
          >
            Add Skill
          </button>
          <button
            onClick={handleclick1}
            className=" px-5 sm:px-8 md:px-10 py-2 rounded-3xl m-2 text-white font-bold bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-sm sm:text-lg md:text-xl flex items-center justify-center"
          >
            Delete skill
          </button>
        </div>
      ) : (
        <p></p>
      )}

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

      {isVisible && (
        <div className="absolute z-50 top-72 w-[30vw] h-[40vh] bg-white/80 backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
          <input
            type="text"
            placeholder="Skill Name"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Skill Use (optional)"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={skillUse}
            onChange={(e) => setSkillUse(e.target.value)}
          />
          <button
            onClick={() => {
              handleClick();
              addskill();
            }}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
          >
            Save
          </button>
        </div>
      )}

      {isVisible1 && (
        <div class="absolute z-50 top-72  backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg grid md:grid-cols-3 grid-cols-2 md:p-7 p-5">
          {userdata.skills && userdata.skills.length > 0 ? (
            userdata.skills.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-wrap p-2"
              >
                <p className="border text-xs sm:text-sm md:text-base border-gray-300  px-3 py-1 flex items-center justify-center rounded-3xl mr-1 text-red-500 font-bold cursor-pointer ">
                  {item.name}
                </p>
                <img
                  onClick={() => skillidelete(item._id)}
                  className="w-6 h-auto cursor-pointer"
                  src={assets.deleteicon}
                  alt="Delete"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm md:text-base flex items-center justify-center">
              No skills available
            </p>
          )}
          <button
            onClick={handleclick1}
            className=" px-5 py-1 m-5 bottom-0 left-32 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
          >
            save
          </button>
        </div>
      )}
    </div>
  );
};

export default DevelopersProfile;
