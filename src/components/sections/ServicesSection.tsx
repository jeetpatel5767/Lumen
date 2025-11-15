"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ShieldCheck, Clock, Smile } from "lucide-react";
import Ser1 from "@/components/ui/Ser1";
import Ser2 from "@/components/ui/Ser2";
import Ser3 from "@/components/ui/Ser3";
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

const ServicesSection = () => {
  const services = [
    {
      title: "Multiple Obfuscation Levels",
      description:
        "Disguise your payloads with Low, Medium, or High obfuscation. Simulate real-world evasion techniques and bypass basic security checks.",
      number: "01",
      icon: ShieldCheck,
    },
    {
      title: "Payload Save & History Log",
      description:
        "Automatically save every generated payload. Instantly access, review, and demo past payloads anytime within your terminal-style dashboard.",
      number: "02",
      icon: Clock,
    },
    {
      title: "Fun Hacks Playground",
      description:
        "A collection of harmless, terminal-style pranks and animations to keep your demos interactive, fun, and just a little mischievous.",
      number: "03",
      icon: Smile,
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "#020402" }}
    >
      {/* Lower-left blob */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(80,250,123,0.15),transparent)] rounded-full blur-[180px] translate-x-[-40%] translate-y-[30%]"></div>
      </div>

      <div className="relative container mx-auto z-10">
        <div className="text-left mb-16">
          <h2 className="text-[90px] font-[600] text-white">
            Services<span className="text-[#60FF60]">.</span>
          </h2>
        </div>

        {/* Services cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }} // trigger earlier
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="relative group h-[500px] overflow-hidden">
                <CardHeader className="pb-4 relative z-10">
                  <div className="rounded-lg border border-white/10 p-4 flex items-center justify-center">
                    {service.number === "01" ? (
                      <Ser1 />
                    ) : service.number === "02" ? (
                      <Ser2 />
                    ) : service.number === "03" ? (
                      <Ser3 />
                    ) : null}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-white text-3xl font-semibold">
                      {service.title}
                    </h4>
                  </div>
                  <CardDescription className="text-[14px] leading-6 text-white/40 mb-3">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
