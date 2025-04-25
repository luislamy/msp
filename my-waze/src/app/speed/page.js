"use client";

import React, { useState, useEffect } from "react";

export default function SpeedLimitWarning() {
  const [simulatedSpeed, setSimulatedSpeed] = useState(0);
  const [speedLimit, setSpeedLimit] = useState(90); // default 90 km/h mas depois mudar
  const [isOverLimit, setIsOverLimit] = useState(false);

  // Simula velocidade nova a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSpeed = Math.floor(Math.random() * 130); // 0-130 km/h
      setSimulatedSpeed(randomSpeed);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Verifica se está acima do limite
  useEffect(() => {
    setIsOverLimit(simulatedSpeed > speedLimit);
  }, [simulatedSpeed, speedLimit]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        color: "#111",
        textAlign: "center",
      }}
    >
      <a href="/">
        <h1 className="text-2xl font-bold text-gray-800 bg-yellow-400">Back to Main Menu</h1>
      </a>

      <h2 className="text-xl font-bold mb-4">Speed Limit Warning</h2>

      <div style={{ fontSize: "40px", fontWeight: "bold" }}>
        🚗 {simulatedSpeed} km/h
      </div>

      <div style={{ marginTop: "12px" }}>
        Speed Limit:{" "}
        <input
          type="number"
          value={speedLimit}
          onChange={(e) => setSpeedLimit(Number(e.target.value))}
          style={{
            width: "80px",
            padding: "4px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />{" "}
        km/h
      </div>

      {isOverLimit ? (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            padding: "12px",
            borderRadius: "5px",
          }}
        >
          🚨 You are over the speed limit!
        </div>
      ) : (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            padding: "12px",
            borderRadius: "5px",
          }}
        >
          ✅ All good!
        </div>
      )}
    </div>
  );
}

