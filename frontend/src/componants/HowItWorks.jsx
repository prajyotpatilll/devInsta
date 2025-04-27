import React from "react";
import { assets } from "../assets/assets";

const HowItWorks = () => {
  return (
    <section className="pb-20 pt-0" style={{ backgroundColor: "#191b2b" }}>
      <div className="max-w-7xl mx-auto px-6  flex flex-col items-start ">
        <div>
          <img className="py-5" src={assets.rawx} alt="" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          How It Works
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-12">
          Follow these simple steps to build and showcase your portfolio.
        </p>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div
            className="p-8 rounded-2xl border border-blue-500 shadow transition transform hover:-translate-y-3 hover:scale-105 hover:shadow-blue-500/30 duration-300"
            style={{ backgroundColor: "#191b2b" }}
          >
            <div className="text-blue-500 text-5xl mb-4">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Step 1: Sign Up
            </h3>
            <p className="text-gray-300">
              Start by signing up and create your account. It’s fast and free,
              giving you access to your personalized dashboard.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="p-8 rounded-2xl border border-blue-500 shadow transition transform hover:-translate-y-3 hover:scale-105 hover:shadow-blue-500/30 duration-300"
            style={{ backgroundColor: "#191b2b" }}
          >
            <div className="text-blue-500 text-5xl mb-4">
              <i className="fas fa-edit"></i>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Step 2: Edit Profile
            </h3>
            <p className="text-gray-300">
              Customize your profile with your skills, bio, photo, and social
              links to showcase yourself professionally.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="p-8 rounded-2xl border border-blue-500 shadow transition transform hover:-translate-y-3 hover:scale-105 hover:shadow-blue-500/30 duration-300"
            style={{ backgroundColor: "#191b2b" }}
          >
            <div className="text-blue-500 text-5xl mb-4">
              <i className="fas fa-project-diagram"></i>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Step 3: Add Projects
            </h3>
            <p className="text-gray-300">
              Highlight your work by adding projects with live links, GitHub
              repos links, and technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
