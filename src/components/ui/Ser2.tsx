"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archive, Save } from "lucide-react";

const payloadNames = [
  "reverse_shell.ps1",
  "obf_high.bat",
  "sql_injector.exe",
  "fun_payload.sh",
  "auth_bypass.bat",
  "tcp_reverse.exe",
];

const Ser2 = () => {
  const [count, setCount] = useState(23);
  const [lastPayload, setLastPayload] = useState(payloadNames[0]);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPayload =
        payloadNames[Math.floor(Math.random() * payloadNames.length)];
      setCount((prev) => (prev >= 50 ? 0 : prev + 1)); // Reset to 0 after 50
      setLastPayload(nextPayload);
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg p-5 w-full h-full flex flex-col justify-between text-[#60FF60] font-mono text-[14px] overflow-hidden ">
      <div className="flex items-center gap-2 mb-5">
        <Archive size={20} className="text-[#60FF60]" />
        <div className="text-white font-semibold text-lg">Payload Archive</div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>Total Saved:</div>
        <motion.div
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-2xl font-bold text-[#60FF60]"
        >
          {count}
        </motion.div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>Last Saved:</div>
        <motion.div
          key={lastPayload}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#60FF60]"
        >
          {lastPayload}
        </motion.div>
      </div>

      <div className="relative h-[40px] border border-dashed border-[#60FF60]/30 rounded flex items-center justify-center">
        <Save size={20} className="text-[#60FF60]" />
        <AnimatePresence>
          {showFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#60FF60] rounded opacity-20"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ser2;
