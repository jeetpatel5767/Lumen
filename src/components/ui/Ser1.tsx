"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const levels = [
  { label: "Low", color: "#60FFC8" },
  { label: "Medium", color: "#60FF60" },
  { label: "High", color: "#5AFF30" },
];

const Ser1 = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % levels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const current = levels[index];

  return (
    <div className="w-full h-[13.25rem] rounded-lg p-4  relative overflow-hidden">
      <div className="absolute inset-0 flex">
        {levels.map((lvl, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={
              i === index
                ? { opacity: 0.4, scale: 1.05 }
                : { opacity: 0.1, scale: 0.9 }
            }
            transition={{ duration: 0.8 }}
            className="flex-1"
            style={{ backgroundColor: lvl.color }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white/70 text-xs uppercase">
          Switching obfuscation level...
        </span>
        <span className="text-white text-2xl font-bold mt-2">{current.label}</span>
      </motion.div>
    </div>
  );
};

export default Ser1;
