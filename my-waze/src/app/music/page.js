"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const SERVICES = [
  { name: "Spotify", path: "/music/spotify" },
  { name: "YouTube Music", url: "https://music.youtube.com" },
  { name: "Amazon Music", url: "https://music.amazon.com" },
];

export default function MusicHomePage() {
  const router = useRouter();

  const handleSelect = (service) => {
    if (service.path) {
      router.push(service.path);
    } else {
      window.open(service.url, "_blank");
    }
  };

return (
  <div className="flex flex-col px-4 py-10">
    <div className="flex items-center mb-6">
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-black-600 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>
    </div>
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Select a Music Service</h1>
      {SERVICES.map((service) => (
        <button
          key={service.name}
          onClick={() => handleSelect(service)}
          className="w-full max-w-md bg-blue-100 hover:bg-blue-200 text-lg py-3 rounded-lg font-medium transition"
        >
          {service.name}
        </button>
      ))}
    </div>
  </div>
);
}
