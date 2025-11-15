"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Terminal, Cpu, Zap, Code } from "lucide-react";
import { motion } from "framer-motion";

const TeamSection = () => {
  return (
    <section id="team" className="relative py-20 px-4 bg-[#020402]">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(80,250,123,0.15),transparent)] rounded-full blur-[180px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto">
        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12"
        >
          <h2 className="text-[80px] font-[600] text-white leading-tight">
            Meet the <span className="text-[#60FF60]">Mastermind</span>.
          </h2>
        </motion.div>

        {/* Wider main content container */}
        <div className="w-full">
          {/* Profile + Terminal combined card - Now using your Card component */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative group h-[500px] overflow-hidden">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Profile Section - Left Side */}
                <div className="lg:w-2/5 p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="flex flex-col items-center h-full">
                    {/* Enhanced Avatar */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full border border-white/10 overflow-hidden hover:border-[#60FF60]/80 transition-colors">
                        <img
                          src="/ProfilePic.png"
                          alt="Security Engineer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 bg-black rounded-full p-2 border border-[#60FF60]/30">
                        <Cpu className="w-5 h-5 text-[#60FF60] animate-pulse" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white text-center">Jeet Bhensdadia</h3>
                    <p className="text-[#60FF60] font-mono text-sm text-center mt-1">@root_access</p>
                    <p className="text-gray-400 text-sm mt-4 text-center">
                      Red team specialist & AI security researcher
                    </p>

                    {/* Contact Info */}
                    <div className="mt-8 w-full">
                      <h4 className="text-[#60FF60] font-mono text-sm mb-3 text-left">$ contact_info</h4>
                      <div className="text-white text-sm space-y-2">
                        <p className="hover:text-[#60FF60] transition-colors cursor-pointer flex items-center">
                          <span className="text-[#60FF60] mr-2"></span> alex@blackhat.dev
                        </p>
                        <p className="hover:text-[#60FF60] transition-colors cursor-pointer flex items-center">
                          <span className="text-[#60FF60] mr-2"></span> PGP: 0xDEADBEEF
                        </p>
                        <p className="hover:text-[#60FF60] transition-colors cursor-pointer flex items-center">
                          <span className="text-[#60FF60] mr-2"></span> Signal: Secure session only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terminal Section - Right Side */}
                <div className="lg:w-3/5 p-6">
                  <div className="flex items-center px-4 py-2 border-b border-[#60FF60]/20 mb-4">
                    <div className="flex gap-2 mr-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-[#60FF60] text-sm font-mono">terminal_session</span>
                  </div>

                  <div className="font-mono text-sm space-y-6">
                    <TerminalCommand 
                      command="whoami" 
                      output="Security Engineer | AI Red Teamer | Cryptography Enthusiast"
                    />
                    
                    <TerminalCommand 
                      command="skills --list" 
                      output={
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                          {['TypeScript', 'Python 3', 'Rust', 'React', 'Node.js', 'AI/ML', 'Cryptography', 'Reverse Engineering'].map(skill => (
                            <span key={skill} className="flex items-center">
                              <span className="text-[#60FF60] mr-2"></span> {skill}
                            </span>
                          ))}
                        </div>
                      }
                    />
                    
                    <TerminalCommand 
                      command="status" 
                      output={
                        <p>
                          <span className="text-[#60FF60]">[ACTIVE]</span> Developing new cryptographic attack vectors
                        </p>
                      }
                    />
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-4 border-t border-[#60FF60]/10">
                    <h4 className="text-[#60FF60] font-mono text-sm mb-3">$ connect_with_me</h4>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: Github, text: "GitHub" },
                        { icon: Linkedin, text: "LinkedIn" }, 
                        { icon: Terminal, text: "Blog" },
                        { icon: Code, text: "CTF" }
                      ].map((item) => (
                        <motion.div
                          key={item.text}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#60FF60]/40 text-[#60FF60] hover:bg-[#60FF60]/10 gap-2 font-mono text-xs"
                          >
                            <item.icon className="w-3 h-3" />
                            {item.text}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Reusable terminal command component
const TerminalCommand = ({ command, output }: { command: string; output: React.ReactNode }) => {
  return (
    <div>
      <div className="text-[#60FF60] flex items-start">
        <span className="mr-2">$</span> {command}
      </div>
      <div className="text-white mt-1 ml-4">
        {output}
      </div>
    </div>
  );
};

export default TeamSection;