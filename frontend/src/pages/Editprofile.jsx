import React, { useContext, useState } from "react";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Editprofile = () => {
  const {
    userdata,
    token,
    backendURL,
    getmyprofile,
    setuserdata,
    image,
    setimage,
  } = useContext(AppContext);

  const updateuserprofile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userdata.name || "");
      formData.append("phone", userdata.phone || "");
      // formData.append("address", userdata.address || "");
      formData.append("gender", userdata.gender || "Male");
      formData.append("dob", userdata.dob || "");
      formData.append("role", userdata.role || "");
      formData.append("description", userdata.description || "");

      if (userdata.education) {
        formData.append("education[degreename]", userdata.education.degreename || "");
        formData.append("education[field]", userdata.education.field || "");
        formData.append("education[college]", userdata.education.college || "");
        formData.append("education[startyear]", userdata.education.startyear || "");
        formData.append("education[completeyear]", userdata.education.completeyear || "present");
      }

      if (image) formData.append("profile_photo", image);

      const { data } = await axios.post(
        backendURL + "/api/user/editprofile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getmyprofile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl md:w-[60vw] mx-auto p-6 rounded-lg shadow-lg">
      <label htmlFor="image" className="block mb-4 text-center">
        <div className="inline-block relative cursor-pointer">
          <img
            className="w-36 h-36 rounded-full object-cover mx-auto"
            src={image ? URL.createObjectURL(image) : userdata.profile_photo}
            alt="Profile"
          />
        </div>
        <input
          onChange={(e) => setimage(e.target.files[0])}
          type="file"
          id="image"
          hidden
        />
      </label>

      <div className="space-y-4">
        <div>
          <label className="block text-base text-gray-300 font-medium ">
            Name
          </label>
          <input
            type="text"
            value={userdata.name || ""}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block  font-medium text-base text-gray-300">
            Phone
          </label>
          <input
            type="text"
            value={userdata.phone || ""}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-300">
            Gender
          </label>
          <select
            value={userdata.gender || "Male"}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, gender: e.target.value }))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-300">
            Education
          </label>
          <div>
            <label className="block text-base font-medium text-gray-300">
              Degree Name
            </label>
            <input
              type="text"
              value={userdata.education?.degreename || ""}
              onChange={(e) =>
                setuserdata((prev) => ({
                  ...prev,
                  education: { ...prev.education, degreename: e.target.value },
                }))
              }
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., BCA, B.Tech, M.Tech"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300">
              Field of Study
            </label>
            <input
              type="text"
              value={userdata.education?.field || ""}
              onChange={(e) =>
                setuserdata((prev) => ({
                  ...prev,
                  education: { ...prev.education, field: e.target.value },
                }))
              }
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Computer Science, IT"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300">
              College/University
            </label>
            <input
              type="text"
              value={userdata.education?.college || ""}
              onChange={(e) =>
                setuserdata((prev) => ({
                  ...prev,
                  education: { ...prev.education, college: e.target.value },
                }))
              }
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Vivekanand College"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-300">
                Start Year
              </label>
              <input
                type="number"
                value={userdata.education?.startyear || ""}
                onChange={(e) =>
                  setuserdata((prev) => ({
                    ...prev,
                    education: { ...prev.education, startyear: e.target.value },
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 2022"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-300">
                Completion Year
              </label>
              <input
                type="text"
                value={userdata.education?.completeyear || ""}
                onChange={(e) =>
                  setuserdata((prev) => ({
                    ...prev,
                    education: {
                      ...prev.education,
                      completeyear: e.target.value,
                    },
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 2025 or present"
              />
            </div>
          </div>
        </div>

        

        <div>
          <label className="block text-base font-medium text-gray-300">
            Role
          </label>
          <select
            value={userdata.role || "Frontend Developer"}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, role: e.target.value }))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Cybersecurity Specialist">
              Cybersecurity Specialist
            </option>
            <option value="AI/ML Engineer">AI/ML Engineer</option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="Game Developer">Game Developer</option>
            <option value="Database Administrator">
              Database Administrator
            </option>
            <option value="IT Support Specialist">IT Support Specialist</option>
            <option value="Systems Administrator">Systems Administrator</option>
            <option value="Network Engineer">Network Engineer</option>
            <option value="Quality Assurance Engineer">
              Quality Assurance Engineer
            </option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Technical Writer">Technical Writer</option>
            <option value="IT Project Manager">IT Project Manager</option>
            <option value="Scrum Master">Scrum Master</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="IT Consultant">IT Consultant</option>
            <option value="Embedded Systems Developer">
              Embedded Systems Developer
            </option>
            <option value="Blockchain Developer">Blockchain Developer</option>
            <option value="Ethical Hacker">Ethical Hacker</option>
            <option value="AR/VR Developer">AR/VR Developer</option>
            <option value="IoT Engineer">IoT Engineer</option>
            <option value="Big Data Engineer">Big Data Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Technical Support Engineer">
              Technical Support Engineer
            </option>
            <option value="Solutions Architect">Solutions Architect</option>
            <option value="Site Reliability Engineer">
              Site Reliability Engineer
            </option>
            <option value="IT Trainer">IT Trainer</option>
          </select>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-300">
            Date of Birth
          </label>
          <input
            type="date"
            value={userdata.dob || ""}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, dob: e.target.value }))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-300">
            Description
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            maxLength={100} // Limits input to 100 characters
            value={userdata.description || ""}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                setuserdata((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }
            }}
          ></textarea>
          <p className="text-sm text-gray-500">
          {(userdata.description?.length ?? 0)}/400
          </p>{" "}
          {/* Shows character count */}
        </div>

        <button
          onClick={updateuserprofile}
          className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Editprofile;
