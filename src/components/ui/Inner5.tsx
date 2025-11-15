"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Bot, MousePointerClick, ClipboardCopy } from "lucide-react";

const payload = `echo "SGVsbG8gV29ybGQ=" | base64 --decode`;

const Inner5 = () => {
  const controls = useAnimation();
  const buttonControls = useAnimation();
  const [terminalOutput, setTerminalOutput] = useState("");

  useEffect(() => {
    const runSequence = async () => {
      while (true) {
        await controls.start("idle");
        await buttonControls.start("initial");
        setTerminalOutput("");
        await new Promise((r) => setTimeout(r, 500));

        await controls.start("clickCopy");
        await buttonControls.start("clicked");
        await new Promise((r) => setTimeout(r, 600));

        await controls.start("moveToPaste");
        await new Promise((r) => setTimeout(r, 800));

        setTerminalOutput(payload);
        await controls.start("showPayload");
        await new Promise((r) => setTimeout(r, 1300));

        await controls.start("idle", {
          duration: 1.2,
          ease: "easeOut",
        });

        setTerminalOutput("");
        await new Promise((r) => setTimeout(r, 800));
      }
    };

    runSequence();
  }, [controls, buttonControls]);

  return (
    <div className="w-full relative rounded-lg p-3 h-56 flex justify-between overflow-hidden ">

      {/* Left Chat Section */}
      <div className="w-[48%] flex flex-col gap-3 justify-start">

        {/* User message */}
        <div className="flex items-center justify-end gap-2">
          <div className="text-right">
            <p className="text-[#60FF60]/50 text-sm font-semibold">Jeet Patel</p>
            <p className="text-white/20 text-xs">Give me a payload</p>
          </div>
          <div className="w-7 h-7 rounded-lg bg-[#152415]/20 flex items-center justify-center">
            <User size={14} className="text-[#60FF60]/50" />
          </div>
        </div>

        {/* AI response */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1f3b1f]/20 flex items-center justify-center">
            <Bot size={14} className="text-white/25" />
          </div>
          <p className="text-white/25 text-sm">Here’s your payload:</p>
        </div>

        {/* Payload block */}
        <div className="text-white/20 font-mono text-xs border border-white/5 rounded-md p-2 bg-black/5">
          {payload}
        </div>

        {/* Copy button */}
        <motion.div
          className="flex items-center gap-2 text-xs cursor-pointer select-none border border-white/5 rounded-md p-1 w-max"
          variants={{
            initial: { color: "#888", backgroundColor: "transparent" },
            clicked: { color: "#60FF60", backgroundColor: "#152415" },
          }}
          initial="initial"
          animate={buttonControls}
        >
          <ClipboardCopy size={14} />
          Copy Payload
        </motion.div>
      </div>

      {/* Terminal */}
      <div className="w-[48%] bg-black/5 p-3 rounded-md flex flex-col">
        <div className="text-green-400/50 text-xs mb-1 font-mono">Terminal:</div>
        <motion.pre
          className="text-white/20 text-sm font-mono whitespace-pre-wrap h-full"
          variants={{
            showPayload: { opacity: 1 },
            initial: { opacity: 0 },
          }}
          initial="initial"
          animate={terminalOutput ? "showPayload" : "initial"}
        >
          {terminalOutput}
        </motion.pre>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-[#ccc] flex items-center justify-center shadow-sm"
        variants={{
          idle: { x: 10, y: 20 },
          clickCopy: { x: 60, y: 170 },
          moveToPaste: { x: 460, y: 50 },
        }}
        initial="idle"
        animate={controls}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      >
        <MousePointerClick size={14} color="#000" />
      </motion.div>
    </div>
  );
};

export default Inner5;
