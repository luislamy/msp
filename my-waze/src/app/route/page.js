"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [eta, setEta] = useState(null);
  const [traffic, setTraffic] = useState("Light");
  const [storedRoutes, setStoredRoutes] = useState([]);
  const etaCache = useRef({});
  
  useEffect(() => {
    // Load any saved routes from localStorage
    const saved = localStorage.getItem("plannedRoutes");
    if (saved) {
      setStoredRoutes(JSON.parse(saved));
    }
    
    // Check for query parameters to auto-fill the form
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    if (from) {
      setStartLocation(from);
    }
    
    if (to) {
      setDestination(to);
    }
    
    // If both parameters are present, you could optionally auto-calculate the route
    if (from && to) {
      // Uncomment the line below if you want to auto-calculate when parameters are present
      // setTimeout(() => calculateETA(), 500);
    }
  }, [searchParams]);

  const calculateETA = () => {
    const start = startLocation.trim();
    const end = destination.trim();

    if (!start || !end) return;

    const routeId = `${start}->${end}`;
    const cacheKey = `${routeId}->${traffic}`;

    let baseTime;

    if (etaCache.current[routeId]) {
      baseTime = etaCache.current[routeId].baseTime;
    } else {
      baseTime = 10 + Math.random() * 10;
      etaCache.current[routeId] = { baseTime };
    }

    let multiplier = 1;
    let buffer = 0;

    if (traffic === "Moderate") {
      multiplier = 1.25;
      buffer = 1;
    }
    if (traffic === "Heavy") {
      multiplier = 1.5;
      buffer = 2;
    }

    let totalETA = Math.ceil(baseTime * multiplier + buffer);

    etaCache.current[cacheKey] = {
      start,
      destination: end,
      intensity: traffic,
      eta: totalETA,
      baseTime,
    };

    setEta(totalETA);

    const routeLabel = `${start} ➝ ${end} [${traffic}]`;
    const updatedRoutes = [
      routeLabel,
      ...storedRoutes.filter((r) => r !== routeLabel),
    ].slice(0, 10);
    setStoredRoutes(updatedRoutes);
    localStorage.setItem("plannedRoutes", JSON.stringify(updatedRoutes));
  };

  const clearRoutes = () => {
    localStorage.removeItem("plannedRoutes");
    setStoredRoutes([]);
  };

  return (
    <div className="max-w-md shadow-lg text-black space-y-6 flex flex-col justify-items-center items-center p-8 rounded-xl text-center gap-8 bg-white w-fit mx-auto">
      <button
        onClick={() => router.push("/")}
        className="flex items-center cursor-pointer text-black-600 self-start mb-1"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>
      <h1 className="text-2xl font-bold text-gray-800">
        Define Multi-Stop Route
      </h1>

      <section className="pt-2">
        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium text-gray-700">
            Starting Location
          </label>
          <input
            type="text"
            placeholder="Enter starting location"
            className="input"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />

          <label className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <input
            type="text"
            placeholder="Enter destination"
            className="input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <label className="text-sm font-medium text-gray-700">
            Traffic Intensity
          </label>
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
            className="input"
          >
            <option>Light</option>
            <option>Moderate</option>
            <option>Heavy</option>
          </select>

          <button
            className="btn w-full bg-black cursor-pointer text-white"
            onClick={calculateETA}
          >
            Plan Route
          </button>

          {eta !== null && (
            <div className="text-green-700 font-semibold text-center">
              Estimated Time of Arrival: {eta} minutes
            </div>
          )}
        </div>
      </section>

      {storedRoutes.length > 0 && (
        <section className="w-full mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Stored Routes</h2>
          <ul className="text-sm text-gray-600 list-disc list-inside max-h-40 overflow-y-auto mt-2">
            {storedRoutes.map((route, index) => (
              <li key={index}>{route}</li>
            ))}
          </ul>
          <button
            onClick={clearRoutes}
            className="text-red-500 text-sm mt-2 underline hover:text-red-700"
          >
            Clear Stored Routes
          </button>
        </section>
      )}
    </div>
  );
}