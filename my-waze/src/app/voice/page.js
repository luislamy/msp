"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ReportIncident() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    const text =
      "Starting route guidance. In 300 meters, turn right onto Avenida da Liberdade. Then, continue straight for 2 kilometers. You will arrive at your destination in approximately 5 minutes.";
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="relative w-[365px] h-[575px] mx-auto overflow-hidden shadow-xl p-0 absolute top-[-5px] left-[-15px]">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-black"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Map Background */}
      <img
        src="/map-placeholder.jpg"
        alt="Map"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Speech Button - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20">
        <button
          onClick={isSpeaking ? handleStop : handleSpeak}
          className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl"
        >
          {isSpeaking ? "🔇" : "🎤"}
        </button>
      </div>
    </div>
  );
}
