"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const payloads = [
  "echo 'Hello World'",
  "base64 <<< 'Hello World'",
  "rev <<< 'Hello World'",
  "echo 'SGVsbG8gV29ybGQ=' | base64 --decode",
];

const techniques = [
  "Base64 Encoding",
  "String Reverse",
  "Hex Obfuscation",
  "URL Encoding",
];

const logs = [
  "Initializing obfuscation engine...",
  "Payload #1 encoded successfully.",
  "Applied Base64 Encoding.",
  "Payload #2 reversed successfully.",
  "Applied String Reverse.",
  "Obfuscation process completed.",
];

const Inner4 = () => {
  return (
    <div className="w-full rounded-lg p-4 h-56 flex flex-col justify-between overflow-hidden relative ">

      {/* Top Bar */}
      <div className="flex justify-between items-center text-white/30 text-xs font-mono mb-2">
        <div className="flex items-center gap-1">
          <Terminal size={14} /> AI Obfuscation Console
        </div>
        <div className="text-green-400/60">Running</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-4 overflow-hidden">

        {/* Payloads */}
        <div className="flex flex-col gap-2 text-green-400/70 text-sm font-mono">
          <div className="text-xs text-white/30 mb-1">Payload Commands</div>
          {payloads.map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="text-white/20">{">"}</span> {cmd}
            </motion.div>
          ))}
        </div>

        {/* Techniques */}
        <div className="flex flex-col gap-2 text-yellow-300/50 text-sm font-mono">
          <div className="text-xs text-white/30 mb-1">Applied Techniques</div>
          {techniques.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400/60"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.3 }}
              />
              {tech}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status Log Feed */}
      <div className="bg-black/10 mt-2 rounded-md p-2 text-[11px] text-white/30 font-mono h-14 overflow-hidden border border-white/5">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          className="flex flex-col gap-1"
        >
          {logs.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Inner4;
