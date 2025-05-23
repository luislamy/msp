"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function SpotifyEmbedPage() {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [embeds, setEmbeds] = useState([]);
  const hasLoaded = useRef(false); // <-- This stops the double mount behavior

  const embedSpotify = async (url) => {
    if (!url) return;

    const isAlreadyEmbedded = embeds.some((html) => html.includes(url));
    if (isAlreadyEmbedded) return;

    try {
      const res = await fetch(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`
      );
      const data = await res.json();
      setEmbeds((prev) => [...prev, data.html]);
    } catch {
      alert("Invalid or unsupported Spotify link.");
    }
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const defaultUrl = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";
    embedSpotify(defaultUrl);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    embedSpotify(spotifyUrl);
    setSpotifyUrl("");
  };

  return (
    <div className="flex flex-col px-4 py-10">
        <div className="flex items-center mb-6">
            <button
            onClick={() => window.history.back()}
            className="flex items-center text-black-600 cursor-pointer"
            >
            <ArrowLeft className="w-5 h-5 mr-2" />
            </button>
        </div>
      <h1 className="text-2xl font-bold">Embed Spotify Content</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          placeholder="Paste Spotify link"
          className="p-3 border rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Add Embed
        </button>
      </form>

      <div className="mt-8 w-full max-w-xl flex flex-col gap-6">
        {embeds.map((html, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>
    </div>
  );
}
