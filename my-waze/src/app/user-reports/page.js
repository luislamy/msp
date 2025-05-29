"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ReportIncident() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidentTypes = [
    { type: "accident", label: "Accident", icon: "🚧" },
    { type: "traffic", label: "Traffic Jam", icon: "🛑" },
    { type: "police", label: "Police", icon: "🚓" },
    { type: "hazard", label: "Hazard", icon: "⚠️" },
  ];

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

      {/* Toggle Button */}
      {!open && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => setOpen(true)}
            className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl"
          >
            🚨
          </button>
        </div>
      )}

      {/* Sliding Drawer */}
      <div
        className={`absolute bottom-0 w-full bg-white rounded-t-2xl shadow-xl transition-all duration-300 z-20 ${
          open ? "h-[150px]" : "h-0"
        } overflow-hidden`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-center mb-2">
            Report Incident
          </h2>
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {incidentTypes.map((item) => (
              <button
                key={item.type}
                onClick={() => setSelectedIncident(item.label)}
                className="flex flex-col items-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm mt-1">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {selectedIncident && (
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center w-64 shadow-xl">
            <p className="mb-4 text-lg">
              Confirm reporting
              <br />
              <span className="font-semibold">{selectedIncident}</span>?
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-red-600 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Incident "${selectedIncident}" reported!`);
                  setSelectedIncident(null);
                  setOpen(false);
                }}
                className="text-green-600 font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
