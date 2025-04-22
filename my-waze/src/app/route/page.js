'use client'
import { useState, useRef } from "react";

export default function Page() {
  //const [stops, setStops] = useState([]);
  const [eta, setEta] = useState(null);
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
  const calculateETA = () => {
    const start = document.querySelector("input[placeholder='Enter starting location']").value.trim();
    const destination = document.querySelector("input[placeholder='Enter destination']").value.trim();
  
    const cacheKey = `${start}->${destination}`;
  
    if (etaCache.current[cacheKey]) {
      setEta(etaCache.current[cacheKey]);
      return;
    }
  
    // Simulated ETA generation
    const baseTime = 10 + Math.random() * 10;
    //const timePerStop = 5;
    const totalETA = Math.round(baseTime) //+ stops.length * timePerStop);
  
    etaCache.current[cacheKey] = totalETA;
    setEta(totalETA);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
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
    </div>
  );
}
