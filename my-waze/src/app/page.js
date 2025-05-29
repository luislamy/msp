"use client";
import React from "react";

export default function Home() {
  const menuItems = [
    { href: "/register", label: "Register", icon: "📝" },
    { href: "/login", label: "Login", icon: "🔐" },
    { href: "/vehicle", label: "Vehicle", icon: "🚗" },
    { href: "/route", label: "Route + ETA", icon: "🧭" },
    { href: "/poi", label: "Find POI", icon: "📍" },
    { href: "/speed", label: "Speed Alert", icon: "⚡" },
    { href: "/music", label: "Music Apps", icon: "🎵" },
    { href: "/user-reports", label: "Report Incident", icon: "🚨" },
    { href: "/voice", label: "Voice-Guided Navigation", icon: "🗣️" },
  ];

  return (
    <div className="flex flex-col items-center text-center px-4 pt-0 pb-20 h-full overflow-y-auto">
      <h1 className="font-bold text-2xl text-black mb-4">Welcome to MyWaze</h1>

      <div className="grid grid-cols-2 gap-4 w-full">
        {menuItems.map((item, index) => {
          const isLast = index === menuItems.length - 1;
          return (
            <a
              href={item.href}
              key={index}
              className={isLast ? "col-span-2 w-full" : "w-full"}
            >
              <div className="bg-gray-100 w-full py-4 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer transition flex flex-col items-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                {item.label}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
