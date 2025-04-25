'use client'
import { useState, useEffect, useRef } from "react";

export default function Page() {
  // const [stops, setStops] = useState([]);
  // niveis de transito

  const [eta, setEta] = useState(null);
  const [traffic, setTraffic] = useState("Light");
  const [storedRoutes, setStoredRoutes] = useState([]);
  const etaCache = useRef({});

  /*
  const handleStopChange = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const addStop = () => {
    setStops([...stops, ""]);
  };

  const removeStop = (index) => {
    if (stops.length === 0) return;
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };
  */

  useEffect(() => {
    const saved = localStorage.getItem("plannedRoutes");
    if (saved) {
      setStoredRoutes(JSON.parse(saved));
    }
  }, []);

  const calculateETA = () => {
    const start = document.querySelector("input[placeholder='Enter starting location']").value.trim();
    const destination = document.querySelector("input[placeholder='Enter destination']").value.trim();

    if (!start || !destination) return;

    const routeId = `${start}->${destination}`;
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
      destination,
      intensity: traffic,
      eta: totalETA,
      baseTime
    };

    setEta(totalETA);

    const routeLabel = `${start} ➝ ${destination} [${traffic}]`;
    const updatedRoutes = [routeLabel, ...storedRoutes.filter(r => r !== routeLabel)].slice(0, 10);
    setStoredRoutes(updatedRoutes);
    localStorage.setItem("plannedRoutes", JSON.stringify(updatedRoutes));
  };

  const clearRoutes = () => {
    localStorage.removeItem("plannedRoutes");
    setStoredRoutes([]);
  };

  return (
    <div className="max-w-md shadow-lg space-y-6 flex flex-col justify-items-center items-center p-8 rounded-xl text-center gap-8 bg-white w-fit mx-auto">
      <a href="/"><h1 className="text-2xl font-bold text-gray-800 bg-yellow-400">Back to Main Menu</h1></a>
      <h1 className="text-2xl font-bold text-gray-800">Define Multi-Stop Route</h1>

      <section className="pt-2">
        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium text-gray-700">Starting Location</label>
          <input type="text" placeholder="Enter starting location" className="input" />

          {/*stops.map((stop, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={`Stop ${index + 1}`}
                className="input flex-1"
                value={stop}
                onChange={(e) => handleStopChange(index, e.target.value)}
              />
              <button
                className="text-red-500 text-sm"
                onClick={() => removeStop(index)}
              >
                Remove
              </button>
            </div>
          ))*/}

          {/* 
          <button
            className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
            onClick={addStop}
          >
            + Add Stop
          </button>
          */}

          <label className="text-sm font-medium text-gray-700">Destination</label>
          <input type="text" placeholder="Enter destination" className="input" />

          <label className="text-sm font-medium text-gray-700">Traffic Intensity</label>
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
            className="btn w-full bg-green-600 hover:bg-green-700 text-white"
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
