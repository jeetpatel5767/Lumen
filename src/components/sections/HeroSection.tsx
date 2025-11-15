"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import FunHackButton from "@/components/ui/HeroButton";

const HeroSection = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden ">
      {/* Full background Spline */}
      <div className="absolute inset-0 z-0 ">
        <Spline scene="https://prod.spline.design/HS-5vpTbFyYctnNs/scene.splinecode" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center min-h-screen space-y-6">
        <TypewriterText
          lines={[
            {
              text: "Type a prompt, get a payload",
              size: "text-5xl md:text-8xl font-bold",
              delay: 0,
            },
            {
              text: "Who said AI wasn't dangerous?",
              size: "text-2xl md:text-4xl font-light",
              delay: 2,
            },
          ]}
          speed={50}
        />

        <div className="flex gap-6 mt-6">
  <FunHackButton text="Get Payloads" emoji="📟" />
  <FunHackButton text="Fun hacks" emoji="💀" />
</div>
      </div>

      <div className="container">
        <div className="relative z-10 flex flex-col items-start text-left text-white space-y-4 py-24 px-8">
          
          <ScrollRevealText 
            className="text-3xl md:text-7xl font-semibold"
            delay={0}
          >
            From <span className="text-[#60FF60]">Reverse Shells</span> to 
            <span
              className="inline-flex items-center justify-center px-6 py-3 rounded-full backdrop-blur-md mx-4 transition-all duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,255,200,0.15) 0%, rgba(0,0,0,0.6) 50%, rgba(200,255,200,0.15) 100%)",
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
                  backgroundImage:
                    "url('https://grainy-gradients.vercel.app/noise.svg')",
                  opacity: 0.2,
                  zIndex: 1,
                }}
              />
              <span
                style={{
                  fontSize: "2.9rem",
                  zIndex: 2,
                }}
              >
                💣
              </span>
            </span>
            SQLi
          </ScrollRevealText>

          <ScrollRevealText 
            className="text-3xl md:text-7xl font-semibold"
            delay={200}
          >
            From fun hacks 
            <span
              className="inline-flex items-center justify-center px-6 py-3 rounded-full backdrop-blur-md mx-4 transition-all duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,255,200,0.15) 0%, rgba(0,0,0,0.6) 50%, rgba(200,255,200,0.15) 100%)",
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
                  backgroundImage:
                    "url('https://grainy-gradients.vercel.app/noise.svg')",
                  opacity: 0.2,
                  zIndex: 1,
                }}
              />
              <span
                style={{
                  fontSize: "2.9rem",
                  zIndex: 2,
                }}
              >
                💀
              </span>
            </span>
            to <span className="text-[#60FF60]">actual</span>
          </ScrollRevealText>

          <ScrollRevealText 
            className="text-3xl md:text-7xl font-semibold"
            delay={400}
          >
            <span className="text-[#60FF60]">exploits</span> We craft it all.
          </ScrollRevealText>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;

/* Scroll Reveal Text Component */
const ScrollRevealText = ({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <p ref={ref} className={`scroll-reveal-text ${className} ${isVisible ? 'animate' : ''}`}>
      <span className="actual-text">{children}</span>
      <span className="hover-text" aria-hidden="true">{children}</span>
    </p>
  );
};

/* TypewriterText */
const TypewriterText = ({
  lines,
  speed,
}: {
  lines: { text: string; size: string; delay: number }[];
  speed: number;
}) => {
  return (
    <div className="space-y-4">
      {lines.map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: line.delay }}
          className={line.size}
        >
          <Typewriter
            line={line.text}
            speed={speed}
            startDelay={line.delay * 1000}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* Typewriter effect */
const Typewriter = ({
  line,
  speed,
  startDelay,
}: {
  line: string;
  speed: number;
  startDelay: number;
}) => {
  const [text, setText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(false);

  React.useEffect(() => {
    let i = 0;
    setText("");
    setShowCursor(false);

    const startTimeout = setTimeout(() => {
      setShowCursor(true);

      const interval = setInterval(() => {
        setText((prev) => line.slice(0, i + 1));
        i++;
        if (i === line.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [line, speed, startDelay]);

  return (
    <span className="typewriter-text">
      {text}
      {showCursor && <span className="typewriter-cursor" />}
    </span>
  );
};

/* Button */
const SimpleButton = ({ text }: { text: string }) => {
  return (
    <button className="backdrop-blur-md border border-white/10 text-white font-medium px-6 py-2 rounded-lg">
      {text}
    </button>
  );
};