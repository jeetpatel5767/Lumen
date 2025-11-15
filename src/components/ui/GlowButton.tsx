"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowButtonProps {
  label: string
  onClick?: () => void
  className?: string
}

export default function GlowButton({ label, onClick, className }: GlowButtonProps) {
  return (
    <div className="relative inline-flex p-[3px] rounded-full overflow-hidden group">
      {/* Rotating Glow Border */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
        className="absolute inset-[-15px] rounded-full"
        style={{
          background: "linear-gradient(270deg, rgba(211,255,202,0.6), transparent, rgba(211,255,202,0.6))",
          backgroundSize: "400% 400%",
          filter: "blur(30px)",
          opacity: 1,
        }}
      />

      {/* Button */}
      <motion.button
        whileHover={{
          boxShadow: "0 0 35px rgba(211, 255, 202, 0.4)",
        }}
        className={cn(
          "relative z-10 bg-neutral-900 text-white px-5 py-2 rounded-full font-medium text-sm transition-all duration-300",
          className
        )}
        onClick={onClick}
      >
        {label}
      </motion.button>
    </div>
  )
}
