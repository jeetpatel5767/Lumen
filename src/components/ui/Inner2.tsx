"use client";

import { motion } from "framer-motion";
import { BrainCircuit, SearchCheck } from "lucide-react";

const Inner2 = () => {
  return (
    <div className="w-full min-h-44 rounded-lg p-3 flex flex-col justify-between space-y-4 ">

      {/* AI Brain Icon and Status */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#1f3b1f]/20 flex items-center justify-center">
          <BrainCircuit size={16} className="text-[#60FF60]/60" />
        </div>
        <div>
          <p className="text-[#60FF60]/50 text-sm font-semibold">LLM Engine</p>
          <p className="text-white/30 text-xs">Processing your request…</p>
        </div>
      </div>

      {/* Analysis results */}
      <div className="flex flex-col space-y-2 text-sm text-white/30">
        <div className="flex items-center gap-2">
          <SearchCheck size={14} className="text-[#60FF60]/60" />
          <span>Attack Type: <span className="text-white/50 font-semibold">Reverse Shell</span></span>
        </div>
        <div className="flex items-center gap-2">
          <SearchCheck size={14} className="text-[#60FF60]/60" />
          <span>OS Detected: <span className="text-white/50 font-semibold">Linux</span></span>
        </div>
        <div className="flex items-center gap-2">
          <SearchCheck size={14} className="text-[#60FF60]/60" />
          <span>Encoding: <span className="text-white/50 font-semibold">Base64</span></span>
        </div>
      </div>

      {/* Laggy Loading Bar */}
      <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden mt-2">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#60FF60]/60"
          animate={{
            width: ["0%", "15%", "17%", "30%", "35%", "55%", "56%", "80%", "90%", "100%"],
          }}
          transition={{
            times: [0, 0.08, 0.2, 0.35, 0.42, 0.55, 0.62, 0.8, 0.9, 1],
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>

    </div>
  );
};

export default Inner2;
