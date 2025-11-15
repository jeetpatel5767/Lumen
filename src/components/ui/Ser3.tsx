"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const devilFace = [
  " (╯°□°）╯︵ ┻━┻ ",
  "     (ಠ‿ಠ)     ",
  "     (ง'̀-'́)ง   ",
  "              ",
];
const smileFace = [
  "  ( ͡❛ ‿‿ ͡❛)  ",
  "  (✿◠‿◠)    ",
  "    (ʘ‿ʘ)     ",
  "            ",
];

const Ser3 = () => {
  const [currentFace, setCurrentFace] = useState(devilFace[0]);
  const [isDevil, setIsDevil] = useState(true);

  useEffect(() => {
    const faceInterval = setInterval(() => {
      if (isDevil) {
        setCurrentFace(devilFace[Math.floor(Math.random() * devilFace.length)]);
      } else {
        setCurrentFace(smileFace[Math.floor(Math.random() * smileFace.length)]);
      }
    }, 500);

    const swapInterval = setInterval(() => {
      setIsDevil((prev) => !prev);
    }, 4000);

    return () => {
      clearInterval(faceInterval);
      clearInterval(swapInterval);
    };
  }, [isDevil]);

  return (
    <div className=" rounded-lg p-4 text-green-400 font-mono text-[14px] h-[215px] w-full flex flex-col justify-center items-center overflow-hidden  relative">
      {/* matrix rain */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 120 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-green-700 text-[12px]"
            style={{
              top: `${Math.random() * 500}px`, // match container height
              left: `${Math.random() * 320}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.span>
        ))}
      </div>

      {/* animated face */}
      <motion.div
        className="text-[24px] mb-2 leading-tight text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {currentFace}
      </motion.div>
    </div>
  );
};

export default Ser3;
