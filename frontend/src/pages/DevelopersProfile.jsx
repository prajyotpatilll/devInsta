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
  const [isVisible11, setIsVisible11] = useState(false);
  const [isVisible111, setIsVisible111] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillUse, setSkillUse] = useState("");
  const navigate = useNavigate();

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

  //add and delete skill

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

  // add and remove project
  const [projectData, setProjectData] = useState({
    name: "",
    technologies: "",
    github_link: "",
    live_preview_link: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProjectData({ ...projectData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", projectData.name);
    formData.append("technologies", projectData.technologies);
    formData.append("github_link", projectData.github_link);
    formData.append("live_preview_link", projectData.live_preview_link);
    formData.append("photo", projectData.photo);
    try {
      const response = await axios.post(
        `${backendURL}/api/user/addproject`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setProjectData({
          name: "",
          technologies: "",
          github_link: "",
          live_preview_link: "",
          photo: null,
        });
        await fetchUserProfile(_id);
      } else {
        toast.error("Project not added!");
      }
    } catch (error) {
      toast.error("project not adding");
    }
  };

  const handleClick1 = () => {
    setIsVisible11(!isVisible11);
  };

  const handleclick11 = () => {
    setIsVisible111(!isVisible111);
  };

  const deleteproject = async (pid) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/user/deleteproject`,
        { projectId: pid },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("project deleted successfully.");
      } else {
        toast.error(response.data.message || "Failed to delete skill.");
      }
      await fetchUserProfile(_id);
    } catch (error) {
      toast.error("Failed to delete skill. Please try again.");
    }
  };

  //fetching user profile using id

  useEffect(() => {
    if (_id) {
      fetchUserProfile(_id);
    }
  }, [_id, backendURL, token]);

  // Login user profile options

  useEffect(() => {
    if (uniqid === _id) {
      setisedit(true);
    }
  }, [uniqid, _id, token]);

  //testing purpose

  useEffect(() => {
    console.log("isedit:", isedit);
  }, [isedit]);

  // loader
  if (!userdata) {
    return (
      <div className=" flex justify-center items-center h-screen">
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
            className="w-52  md:h-96 md:w-96 h-52 object-cover bg-transparent rounded-xl"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 2xl:p-10 p-5">
          {userdata.projects && userdata.projects.length > 0 ? (
            userdata.projects.slice(0, 10).map((project) => (
              <div
                key={project._id}
                className="border rounded-xl border-gray-400 p-3 bg-[#525676] transition-transform transform hover:scale-95 flex flex-col"
              >
                {isedit && (
                  <button
                    onClick={() => deleteproject(project._id)}
                    className="absolute right-2 top-2 bg-transparent rounded-full px-3 py-1 shadow-md transition-all duration-300 "
                  >
                    <img
                      className="rounded-full w-8 h-auto bg-transparent"
                      src={assets.crossred}
                      alt="Delete"
                    />
                  </button>
                )}
                {project.photo && (
                  <img
                    src={project.photo}
                    alt={project.name}
                    className="w-full h-44 object-cover rounded-lg"
                  />
                )}
                <div className="flex flex-col justify-between flex-grow p-4 bg-transparent">
                  <h3 className="text-xl font-semibold mb-2 bg-transparent">
                    {project.name}
                  </h3>
                  <h4 className="font-bold bg-transparent">Technologies:</h4>
                  <p className="w-full text-sm mb-3 overflow-scroll bg-transparent">
                    {project.technologies.join(", ")}
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
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No projects available.
            </div>
          )}
        </div>
      </div>

      {isedit ? (
        <div className="flex items-center justify-center">
          <button
            onClick={handleClick1}
            className=" px-5 sm:px-8 md:px-10 py-2 rounded-3xl m-2 text-white font-bold bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-sm sm:text-lg md:text-xl flex items-center justify-center"
          >
            Add Project
          </button>
        </div>
      ) : (
        <p></p>
      )}

      {isVisible && (
        <div className="absolute z-50 -bottom-14 md:bottom-24 xl:w-[30vw] md:h-[40vh] h-auto w-[90vw] bg-white/80 backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
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
          <button
            onClick={() => {
              {
                handleClick();
              }
            }}
            className=" absolute right-0 top-0   font-semibold rounded-lg"
          >
            <img className="md:w-10 w-6 h-auto bg-transparent" src={assets.crossred} alt="" />
          </button>
        </div>
      )}

      {isVisible1 && (
        <div className="absolute z-50 -bottom-20 md:bottom-24 xl:w-[30vw] md:h-[40vh] h-auto w-[90vw]  backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg grid md:grid-cols-3 grid-cols-2 md:p-7 p-5">
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
            className=" px-5 py-1 m-5 bottom-0 left-32px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
          >
            save
          </button>
        </div>
      )}
      {/* project add section */}

      {isVisible11 && (
        <div className="relative z-50 bottom-48 md:w-[50vw] md:h-[55vh] w-[80vw] h-[50vh] backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={projectData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="technologies"
              placeholder="Technologies (comma-separated)"
              value={projectData.technologies}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="url"
              name="github_link"
              placeholder="GitHub Link"
              value={projectData.github_link}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="url"
              name="live_preview_link"
              placeholder="Live Preview Link (optional)"
              value={projectData.live_preview_link}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          <button
            onClick={() => {
              {
                handleClick1();
              }
            }}
            className=" absolute right-0 top-0 px-6 py-2  font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-200"
          >
            <img className="w-10 h-auto" src={assets.crossred} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DevelopersProfile;
