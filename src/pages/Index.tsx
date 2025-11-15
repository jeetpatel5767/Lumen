"use client";

import { ArrowUpRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TeamSection from "@/components/sections/TeamSection";
import { Separator } from "@/components/ui/separator";
import CustomCursor from "@/components/ui/CustomCursor";
import IntroScreen from "@/components/ui/IntroScreen";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-black text-white relative">
      {/* Intro Splash Animation */}
      <IntroScreen />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-3 left-0 w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button className="relative flex text-2xl font-medium text-[#C8FFC8] overflow-hidden cursor-pointer bg-transparent border-none logo-button items-center">
            <span className="flex span-mother relative">
              {"lumen.".split("").map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </span>
            <span className="flex span-mother2 absolute inset-0">
              {"lumen.".split("").map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </span>
          </button>

          <div className="backdrop-blur-md border border-white/10 rounded-lg px-6 py-2 flex space-x-10 text-white">
            {[
              { name: "Process", href: "#process" },
              { name: "Services", href: "#services" },
              { name: "Work", href: "#work" },
              { name: "Plans", href: "#pricing" },
              { name: "Team", href: "#team" },
              { name: "Contact", href: "#contact", arrow: true },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="relative text-md font-[150] text-white group flex items-center"
              >
                {link.name}
                {link.arrow && (
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out group-hover:rotate-45" />
                )}
                <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-[#C8FFC8] transition-all duration-500 ease-in-out group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="btn-glow">
            <button className="glow-button rounded-lg px-3 py-1 text-sm text-white">
              Get Payloads
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10 pb-72">
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <PortfolioSection />
        <TeamSection />
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#020402] text-white z-1">
        <div className="container mx-auto px-8 py-12">
          <div
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(80,250,123,0.15),transparent)] rounded-full blur-[180px] transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              $ connect --to lumen
            </h1>
            <a
              href="mailto:hello@nebula-ai.com"
              className="text-2xl md:text-5xl font-bold hover:text-green-400 transition"
            >
              hello@nebula-ai.com
            </a>
          </div>

          <Separator className="my-4 bg-white/20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="space-y-1">
              <p className="text-green-400">© 2024 Lumen AI</p>
              <p>hello@lumen-ai.com</p>
              <p>+91 7778905767</p>
            </div>

            <div className="space-y-1">
              <p>Process</p>
              <p>Services</p>
              <p>Work</p>
              <p>Plans</p>
              <p>Team</p>
              <p>Contact ↗</p>
            </div>

            <div className="space-y-1">
              <p>LinkedIn</p>
              <p>Twitter</p>
              <p>Instagram</p>
              <p>Dribbble</p>
            </div>

            <div className="space-y-1">
              <p>Design & Developed by</p>
              <p className="text-green-400">Jeet Bhensdadia</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
