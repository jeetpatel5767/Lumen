"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Inner1 from "@/components/ui/Inner1";
import Inner2 from "@/components/ui/Inner2";
import Inner3 from "@/components/ui/Inner3";
import Inner4 from "@/components/ui/Inner4";
import Inner5 from "@/components/ui/Inner5";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const ProcessSection = () => {
  const steps = [
    {
      title: "Type Your Prompt",
      description:
        "Describe what you need. No forms, no limits — just type your request naturally.",
      details: "",
      number: "01",
    },
    {
      title: "LLM Understands",
      description:
        "Our transformer interprets your words, detecting attack type, OS, language, and obfuscation preferences.",
      details: "",
      number: "02",
    },
    {
      title: "Payload Generation",
      description:
        "Based on your prompt, AI dynamically generates custom payloads using advanced encoding and techniques.",
      details: "",
      number: "03",
    },
    {
      title: "Obfuscation & Encoding Applied",
      description:
        "The generated payload is obfuscated and encoded based on your preferred or default security configuration.",
      details: "",
      number: "04",
    },
    {
      title: "Payload Delivered",
      description:
        "Receive your AI-crafted payload instantly. Copy it, run tests ethically, or save for reference.",
      details: "",
      number: "05",
    },
  ];

  return (
    <section
      id="process"
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "#020402" }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(80,250,123,0.15),transparent)] rounded-full blur-[180px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto z-10">
        <div className="text-left mb-16">
          <h2 className="text-[90px] font-[600] text-white">
            How It <span className="text-[#60FF60]">Works</span>.
          </h2>
        </div>

        {/* Top 3 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }} // trigger earlier here
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {steps.slice(0, 3).map((step, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="relative group h-full overflow-hidden">
                <CardHeader className="pb-4 relative z-10">
                  <div className="rounded-lg border border-white/10 p-4 flex items-center justify-center">
                    {step.number === "01" ? (
                      <Inner1 />
                    ) : step.number === "02" ? (
                      <Inner2 />
                    ) : step.number === "03" ? (
                      <Inner3 />
                    ) : null}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-[#60FF60] text-3xl font-bold">{step.number}.</h2>
                    <h4 className="text-white text-2xl font-semibold">{step.title}</h4>
                  </div>
                  <CardDescription className="text-[14px] leading-6 text-white/40 mb-3">
                    {step.description}
                  </CardDescription>
                  {step.details && (
                    <p className="text-[12px] text-white/50">{step.details}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom 2 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }} // trigger earlier here too
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {steps.slice(3, 5).map((step, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="relative group h-full overflow-hidden">
                <CardHeader className="pb-4 relative z-10">
                  <div className="rounded-lg border border-white/10 p-4 flex items-center justify-center">
                    {step.number === "04" ? (
                      <Inner4 />
                    ) : step.number === "05" ? (
                      <Inner5 />
                    ) : null}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-[#60FF60] text-3xl font-bold">{step.number}.</h2>
                    <h4 className="text-white text-2xl font-semibold">{step.title}</h4>
                  </div>
                  <CardDescription className="text-[14px] leading-6 text-white/40 mb-3">
                    {step.description}
                  </CardDescription>
                  {step.details && (
                    <p className="text-[12px] text-white/50">{step.details}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
