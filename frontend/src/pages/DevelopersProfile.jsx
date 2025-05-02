import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Developer's email (already available on the page)
  const developerEmail = userdata?.email || ""; // Safe fallback // Replace with actual email

  const handleChange1 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendURL}/api/user/contact`, {
        ...formData,
        developerEmail,
      });

      toast("Message Sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.message("Failed to send message.");
    }
  };

  // loader
  if (!userdata) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg ">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center md:gap-10 gap-0 lg:gap-20 rounded-2xl mx-auto shadow-lg px-4 md:py-16 py-8 w-full max-w-screen-xl">
        {/* Left Content */}
        <motion.div
          className="flex flex-col w-full lg:w-1/2 items-center lg:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6 text-center lg:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-4xl sm:text-5xl lg:text-7xl font-bold pb-6 text-[#847fe7]">
              _____
            </p>
            <p className="text-3xl sm:text-4xl lg:text-6xl font-extrabold pb-3 text-white">
              Nice to meet you,
            </p>
            <p className="text-3xl sm:text-4xl lg:text-6xl font-extrabold pb-3 text-white">
              I'm {userdata.name}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-300 md:pb-5 pb-0">
              {userdata.role}
            </p>
          </motion.div>

          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm sm:text-base text-gray-300 border-b-2 border-gray-500 pb-5 max-w-md sm:max-w-lg md:max-w-xl">
              {userdata.description}
            </p>
          </motion.div>

          <motion.div
            className="py-6 flex flex-col sm:flex-row items-center justify-between w-full max-w-md sm:max-w-lg md:max-w-xl gap-6 sm:gap-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Experience */}
            <div className="flex items-center">
              <div className="flex text-4xl sm:text-5xl font-bold pr-3">
                <p>{userdata.exprience}</p>
                <p className="text-[#f84f39] pl-1 text-2xl sm:text-4xl font-bold">
                  +
                </p>
              </div>
              <div className="text-base sm:text-lg font-bold">
                <p>Years of</p>
                <p>experience</p>
              </div>
            </div>

            {/* Projects */}
            <div className="flex items-center">
              <div className="flex text-4xl sm:text-5xl font-bold pr-3">
                <p>{userdata.projects.length}</p>
                <p className="text-[#f84f39] pl-1 text-2xl sm:text-4xl font-bold">
                  +
                </p>
              </div>
              <div className="text-base sm:text-lg font-bold">
                <p>Successful</p>
                <p>projects</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center lg:justify-start gap-8 md:py-6 pb-4 border-b-2 border-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a href={userdata.linden} target="_blank" rel="noopener noreferrer">
              <motion.img
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={assets.linkdin}
                alt="LinkedIn"
                whileHover={{ scale: 1.2 }}
              />
            </a>
            <a
              href={userdata.intagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.img
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={assets.insta}
                alt="Instagram"
                whileHover={{ scale: 1.2 }}
              />
            </a>
            <a href={userdata.github} target="_blank" rel="noopener noreferrer">
              <motion.img
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white p-1"
                src={assets.github}
                alt="GitHub"
                whileHover={{ scale: 1.2 }}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            className="rounded-full w-40 h-40 sm:w-60 sm:h-60 lg:w-[30rem] lg:h-[30rem]"
            src={userdata.profile_photo}
            alt="photograph"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </div>

      <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold pb-6 text-white flex justify-center items-center py-12">
        Education<span className="text-green-500 ">.</span>
      </div>

      <motion.div
        className="px-4 sm:px-8 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="border-b-2 border-gray-500 py-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-2xl sm:text-3xl font-bold pb-2">
            {userdata.education.degreename}
            <span className="px-2">|</span>
            <span className="text-lg sm:text-xl text-gray-400">
              {userdata.education.field}
            </span>
          </p>
          <p className="text-base sm:text-lg font-bold text-gray-400">
            {userdata.education.college}
            <span className="px-2">|</span>
            <span className="text-white">
              {userdata.education.startyear} - {userdata.education.completeyear}
            </span>
          </p>
        </div>
      </motion.div>

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

      <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold pb-6 text-white flex justify-center items-center py-12 ">
        Skills <span className="text-blue-500">.</span>
      </div>

      <div className="pb-10 border-b-2 border-gray-500">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {userdata.skills && userdata.skills.length > 0 ? (
            userdata.skills.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <p className="border-2 text-sm sm:text-lg md:text-xl border-gray-300 px-5 sm:px-8 md:px-10 py-1 flex items-center justify-center rounded-3xl m-2 text-red-500 font-bold cursor-pointer transition-all duration-300">
                  {item.name}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-sm md:text-base flex items-center justify-center"></p>
          )}
        </div>
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
      {isVisible && (
        <div className="relative z-50 xl:w-[30vw] md:h-[40vh] h-auto w-[90vw] bg-white/80 backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
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
            <img
              className="md:w-10 w-6 h-auto bg-transparent"
              src={assets.crossred}
              alt=""
            />
          </button>
        </div>
      )}

      {isVisible1 && (
        <div className="relative z-50  xl:w-[30vw] md:h-[40vh] h-auto w-[90vw]  backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg grid md:grid-cols-3 grid-cols-2 md:p-7 p-5">
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

      <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold pb-6 text-white flex justify-center items-center pt-12 ">
        Projects <span className="text-[#f84f39]">.</span>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 2xl:p-10 p-5 border-b-2  border-gray-500">
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
     {isVisible11 && (
        <div className="relative z-50  md:w-[50vw] md:h-[55vh] w-[80vw] h-[50vh] backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
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

      <div className="flex flex-col justify-start items-center">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold pb-3 text-white flex justify-center items-center pt-12">
          Let's work
        </div>
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold  text-white flex justify-center items-center pb-6">
          with {userdata.name}
          <span className="text-[#847fe7] pl-2">.</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row py-10 sm:py-16 lg:py-20 justify-center items-start gap-10 border-b-2 border-gray-500 px-4 sm:px-8">
        {/* Left Section */}
        <div className="w-full lg:w-[30%]">
          <p className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-5">
            Get in touch with me
          </p>
          <p className="text-base sm:text-lg font-semibold text-gray-400">
            "Let's connect! Whether you have a project idea, a question, or just
            want to say hello, I'd love to hear from you. Fill out the form
            below with your details, and I’ll respond as soon as possible."
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 sm:gap-10 py-6 sm:py-10">
            <a href={userdata.linden} target="_blank" rel="noopener noreferrer">
              <img
                className="rounded-full w-10 h-10"
                src={assets.linkdin}
                alt="LinkedIn"
              />
            </a>
            <a
              href={userdata.intagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="rounded-full w-10 h-10"
                src={assets.insta}
                alt="Instagram"
              />
            </a>
            <a href={userdata.github} target="_blank" rel="noopener noreferrer">
              <img
                className="rounded-full w-10 h-10 bg-white p-1"
                src={assets.github}
                alt="GitHub"
              />
            </a>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-[30%]">
          <form
            onSubmit={handleSubmit1}
            className="p-6 sm:p-8 rounded-2xl shadow-md w-full bg-slate-600 space-y-4"
          >
            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange1}
              required
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              name="email"
              placeholder="Your Email"
              onChange={handleChange1}
              required
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              onChange={handleChange1}
              required
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-40"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      
      {/* project add section */}

      
    </div>
  );
};

export default DevelopersProfile;
