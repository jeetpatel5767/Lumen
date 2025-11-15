"use client";

import React, { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  from: "user" | "bot";
  text: string;
};

const API_URL = "http://127.0.0.1:8000/generate"; // backend untouched

export default function InlineChat(): JSX.Element {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // smooth auto-scroll on new messages
  useEffect(() => {
    if (!containerRef.current) return;
    try {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    } catch {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const prompt = input.trim();
    if (!prompt) return;
    const userMsg: Message = { id: String(Date.now()), from: "user", text: prompt };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        setMessages((m) => [
          ...m,
          { id: String(Date.now() + 1), from: "bot", text: `Server error: ${text}` },
        ]);
      } else {
        const data: { final_answer?: string } = await res.json();
        const botText = data.final_answer || "No result.";
        setMessages((m) => [...m, { id: String(Date.now() + 2), from: "bot", text: botText }]);
      }
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : String(err);
      setMessages((m) => [
        ...m,
        { id: String(Date.now() + 3), from: "bot", text: `Network error: ${errText}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // small non-blocking feedback could be added later; for now keep simple
      alert("Copied");
    } catch {
      alert("Copy failed");
    }
  };

  const clearChat = () => setMessages([]);

  const downloadTranscript = () => {
    const body = messages
      .map((m) => `${m.from.toUpperCase()} [${formatTimeFromId(m.id)}]:\n${m.text}\n\n`)
      .join("");
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-transcript-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTimeFromId = (id: string) => {
    const n = parseInt(id, 10);
    if (!isNaN(n)) {
      const d = new Date(n);
      return d.toLocaleTimeString();
    }
    return "";
  };

  return (
    <section
      id="chat"
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "#020402" }} // same black background as your ServicesSection
    >
      {/* Lower-left blurry green radial blob (positioned exactly like your ServicesSection) */}
<div
  className="absolute top-0 left-0 w-[450px] h-[450px] 
  bg-[radial-gradient(circle,rgba(80,250,123,0.18),transparent)] 
  rounded-full blur-[180px] 
  translate-x-[-30%] translate-y-[-30%]"
/>


      {/* Centered container with left/right padding and max width so chat doesn't span full screen */}
      <div className="relative container mx-auto z-10 flex justify-center px-4">
        <div className="w-full max-w-[1100px]"> 
          {/* Chat card - preserves the original chat background look but styled as a centered chat panel */}
          <div className="bg-[#020402] border border-white/8 rounded-2xl p-6 text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2bff6e] to-[#60ff60] flex items-center justify-center text-black font-extrabold text-lg">
                  C
                </div>
                <div>
                  <div className="text-2xl font-semibold leading-tight">Cotton</div>
                  <div className="text-xs text-white/50">AI assistant — payload help</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-white/50">{loading ? "thinking..." : "ready"}</div>
                <button
                  onClick={() => setOpen((o) => !o)}
                  className="text-white/40 hover:text-white/80 p-2 rounded-lg"
                >
                  {open ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {open && (
              <>
                {/* Controls row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      className="text-sm px-3 py-1 rounded-md bg-white/6 hover:bg-white/10"
                    >
                      Clear
                    </button>
                    <button
                      onClick={downloadTranscript}
                      className="text-sm px-3 py-1 rounded-md bg-white/6 hover:bg-white/10"
                    >
                      Download
                    </button>
                  </div>
                  <div className="text-sm text-white/40">Tip: Press Enter to send</div>
                </div>

                {/* Chat area - increased height, scrollable */}
                <div
                  ref={containerRef}
                  className="h-[560px] md:h-[700px] overflow-y-auto px-3 py-4 border border-white/6 rounded-xl mb-4"
                  aria-live="polite"
                >
                  {messages.length === 0 && (
                    <div className="text-white/50 text-sm px-2">
                      Try: "give me mysql sqli concepts for linux login forms"
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    {messages.map((m) => {
                      const isUser = m.from === "user";
                      return (
                        <div
                          key={m.id}
                          className={`flex items-start ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          {/* Avatar (left for bot, right for user) */}
                          {!isUser && (
                            <div className="flex-shrink-0 mr-4">
                              <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center font-semibold text-black">
                                C
                              </div>
                            </div>
                          )}

                          {/* Bubble */}
                          <div className={`max-w-[86%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                            <div
                              className={`px-5 py-3 rounded-2xl break-words whitespace-pre-wrap shadow-sm ${
                                isUser
                                  ? "bg-gradient-to-br from-[#073] to-[#045] text-[#dfffe2] rounded-br-none"
                                  : "bg-white/6 text-white rounded-bl-none"
                              }`}
                              style={m.text.length > 900 ? { maxHeight: "22rem", overflowY: "auto" } : undefined}
                            >
                              {m.text}
                            </div>

                            <div className={`mt-2 text-xs text-white/40 ${isUser ? "text-right" : "text-left"} flex items-center gap-2`}>
                              <span>{isUser ? "You" : "Cotton"}</span>
                              <span>•</span>
                              <span>{formatTimeFromId(m.id)}</span>

                              {!isUser && (
                                <button
                                  onClick={() => copyToClipboard(m.text)}
                                  className="ml-3 text-[11px] px-2 py-0.5 rounded-md bg-white/6 hover:bg-white/10"
                                >
                                  Copy
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Avatar for user on right */}
                          {isUser && (
                            <div className="flex-shrink-0 ml-4">
                              <div className="w-10 h-10 rounded-full bg-[#022] flex items-center justify-center font-semibold text-[#bfffc6]">
                                Y
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Input row */}
                <div className="flex gap-3 items-center">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder="Type prompt (e.g. 'mysql sqli payload for linux')"
                    className="flex-1 bg-transparent border border-white/6 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-white/10"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="px-5 py-3 rounded-lg bg-gradient-to-br from-[#2bff6e] to-[#60ff60] text-black font-semibold disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
