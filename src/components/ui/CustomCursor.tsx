"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Smooth follow effect with easing
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ease = 0.18;
    let animationFrame: number;

    const followCursor = () => {
      setCursorPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      animationFrame = requestAnimationFrame(followCursor);
    };

    animationFrame = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPos]);

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
      }}
    >
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md transition-all duration-300 ease-in-out"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,255,200,0.12) 0%, rgba(0,0,0,0.6) 50%, rgba(200,255,200,0.12) 100%)",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            opacity: 0.18,
            zIndex: 1,
          }}
        />
        <span
          style={{
            fontSize: "1.2rem",
            zIndex: 2,
          }}
        >
          💀
        </span>
      </span>
    </div>
  );
};

export default CustomCursor;
