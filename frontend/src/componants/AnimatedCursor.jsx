// src/components/AnimatedCursor.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-[#2a966f] opacity-70 rounded-full pointer-events-none z-[9999]"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
      }}
      transition={{
        type:"spring",
        stiffness: 300,
        damping: 40,
      }}
    />
  );
};

export default AnimatedCursor;
