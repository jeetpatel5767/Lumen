"use client";

import { motion } from "framer-motion";
import React from "react";
import "./animatedText.css";

const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`animated-text ${className}`}
    >
      {text}
    </motion.p>
  );
};

export default AnimatedText;
