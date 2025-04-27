import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const Login = () => {
  const { token, settoken, backendURL } = useContext(AppContext);

  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const onSubmithandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "sign up") {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          settoken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          settoken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      className="md:w-[40vw] w-[80vw] mx-auto bg-transparent p-6 rounded-lg border-2 border-gray-300 mt-10"
      onSubmit={onSubmithandler}
    >
      <div className="space-y-4">
        <p className="text-2xl font-semibold text-white">
          {state === "sign up" ? "Create Account" : "Log In"}
        </p>
        <p className="text-sm text-gray-300">
          {state === "sign up"
            ? "Please sign up to book an appointment."
            : "Please log in to book an appointment."}
        </p>

        {state === "sign up" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="text-sm text-blue-400 mt-1"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {state === "sign up" ? "Sign Up" : "Log In"}
        </button>

        <div className="text-sm text-white mt-4">
          {state === "sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState("login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState("sign up")}
              >
                Sign Up here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
