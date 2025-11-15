"use client";

import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

const Inner1 = () => {
  return (
    <div className="w-full min-h-44 rounded-lg p-3 flex flex-col justify-between space-y-3 ">

      {/* User message */}
      <div className="flex items-center justify-end gap-2">
        <div className="text-right">
          <p className="text-[#60FF60]/50 text-sm font-semibold">Jeet Patel</p>
          <p className="text-white/25 text-xs">Give me Payload</p>
        </div>
        <div className="w-7 h-7 rounded-lg bg-[#152415]/20 flex items-center justify-center">
          <User size={14} className="text-[#60FF60]/50" />
        </div>
      </div>

      {/* AI reply */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#1f3b1f]/20 flex items-center justify-center">
          <Bot size={14} className="text-white/25" />
        </div>
        <p className="text-white/25 text-sm">Sure, here's a Payloads:</p>
      </div>

      {/* Typing input */}
      <div className="flex items-center justify-between border border-white/5 px-2 py-1 rounded-lg bg-black/5">
        <input
          type="text"
          className="bg-transparent text-white/20 text-xs w-full outline-none"
          placeholder="Type a message..."
        />
        <motion.div
          className="flex gap-1 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 1 }}
        >
          <span className="text-[#60FF60]/60 text-lg animate-pulse">•</span>
          <span className="text-[#60FF60]/60 text-lg animate-pulse delay-150">•</span>
          <span className="text-[#60FF60]/60 text-lg animate-pulse delay-300">•</span>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Inner1;
