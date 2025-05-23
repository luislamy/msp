"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [usageRestrictions, setUsageRestrictions] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    if (savedVehicles.length > 0) {
      const lastVehicle = savedVehicles[savedVehicles.length - 1];
      setVehicleType(lastVehicle.vehicleType || "");
      setFuelType(lastVehicle.fuelType || "");
      setLength(lastVehicle.length || "");
      setWidth(lastVehicle.width || "");
      setHeight(lastVehicle.height || "");
      setUsageRestrictions(lastVehicle.usageRestrictions || "");
      setIsDefault(lastVehicle.isDefault || false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!vehicleType) newErrors.vehicleType = true;
    if (!fuelType) newErrors.fuelType = true;
    if (!length) newErrors.length = true;
    if (!width) newErrors.width = true;
    if (!height) newErrors.height = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const vehicleData = {
        vehicleType,
        fuelType,
        length,
        width,
        height,
        usageRestrictions,
        isDefault,
      };

      let savedVehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");

      if (savedVehicles.length > 0) {
        savedVehicles[savedVehicles.length - 1] = vehicleData;
      } else {
        savedVehicles.push(vehicleData);
      }

      localStorage.setItem("vehicles", JSON.stringify(savedVehicles));

      setShowSuccess(true);
      console.log("Vehicle saved:", vehicleData);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const errorStyle = {
    border: "1px solid red",
    backgroundColor: "#ffe6e6",
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        color: "#111",
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="mb-4 flex items-center text-black-600 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
        Register Vehicle Type
      </h2>

      {showSuccess && (
        <div
          style={{
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            padding: "10px",
            borderRadius: "5px",
            color: "#155724",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          ✅ Vehicle saved successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <label>
          Vehicle Type:
          <select
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
              clearError("vehicleType");
            }}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              ...(errors.vehicleType ? errorStyle : {}),
            }}
          >
            <option value="">-- Choose Vehicle Type --</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="truck">Truck</option>
            <option value="electric">Electric Vehicle</option>
          </select>
        </label>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <input
            type="number"
            placeholder="Length (m)"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
              clearError("length");
            }}
            style={{
              flex: "1 1 30%",
              padding: "8px",
              minWidth: "100px",
              ...(errors.length ? errorStyle : {}),
            }}
          />
          <input
            type="number"
            placeholder="Width (m)"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              clearError("width");
            }}
            style={{
              flex: "1 1 30%",
              padding: "8px",
              minWidth: "100px",
              ...(errors.width ? errorStyle : {}),
            }}
          />
          <input
            type="number"
            placeholder="Height (m)"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              clearError("height");
            }}
            style={{
              flex: "1 1 30%",
              padding: "8px",
              minWidth: "100px",
              ...(errors.height ? errorStyle : {}),
            }}
          />
        </div>

        <label>
          Fuel Type:
          <select
            value={fuelType}
            onChange={(e) => {
              setFuelType(e.target.value);
              clearError("fuelType");
            }}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              ...(errors.fuelType ? errorStyle : {}),
            }}
          >
            <option value="">-- Select Fuel Type --</option>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        <label>
          Usage Restrictions:
          <input
            type="text"
            placeholder="e.g. not allowed on toll roads"
            value={usageRestrictions}
            onChange={(e) => setUsageRestrictions(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
          Set as default vehicle
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            fontWeight: "bold",
            backgroundColor: "#000000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Vehicle
        </button>
      </form>
    </div>
  );
}
