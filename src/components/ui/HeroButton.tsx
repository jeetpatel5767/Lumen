"use client";

import React from "react";

interface HeroButtonProps {
  text: string;
  emoji: string;
}

const HeroButton: React.FC<HeroButtonProps> = ({ text, emoji }) => {
  return (
    <button
      className="group relative flex items-center justify-center w-48 h-14 rounded-2xl text-white text-base font-medium border border-white/20 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Expanding gradient div */}
      <div
        className="absolute left-1 top-[4px] h-12 w-12 flex items-center justify-center rounded-2xl z-10 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[184px] group-hover:rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 200, 0.08) 0%, rgba(0,0,0,0.9) 50%, rgba(0, 200, 255, 0.08) 100%)",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Grainy overlay */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            opacity: 0.18,
            zIndex: 1,
          }}
        />
        {/* Emoji */}
        <span className="text-[1.3rem] z-10 transition-all duration-500 ease-in-out group-hover:scale-110">
          {emoji}
        </span>
      </div>

      {/* Text */}
      <span className="ml-14 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-x-10 z-20 whitespace-nowrap">
        {text}
      </span>
    </button>
  );
};

export default HeroButton;
