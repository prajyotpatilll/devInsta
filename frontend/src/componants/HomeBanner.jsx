import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";

const HomeBanner = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center flex justify-center items-center text-white sm:h-[90vh] h-auto sm:py-0 md:py-12 py-32"
    >
      <div className="z-10 bg-transparent flex flex-col items-center p-5 justify-center">
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-extrabold text-white mb-3 bg-transparent">
          Welcome to
        </div>
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-extrabold text-[#f84f39] lg:mb-5 bg-transparent">
          <span className="text-[#2a966f] bg-transparent">&lt;</span>DevInsta
          <span className="text-[#2a966f] bg-transparent">/&gt;</span>
        </div>

        <div className="md:text-lg text-sm flex max-w-2xl mx-auto text-gray-400 mt-8 mb-5 bg-transparent">
          DevInsta is a platform designed for developers to showcase their
          projects and skills. A place to build a strong portfolio in one go! 🔥
        </div>

        <div className="flex flex-col gap-5 sm:flex-row pt-12">
          <NavLink onClick={() => window.scrollTo(0, 0)} to="/developers">
            <button className="bg-[#2a966f] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[#e43b2a] transition duration-300">
              Explore Developers Portfolios
            </button>
          </NavLink>
        </div>
      </div>
      
    </motion.div>
  );
};

export default HomeBanner;
