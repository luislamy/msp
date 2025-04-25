"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();
  const [method, setMethod] = useState("email"); // or "phone"
  const [identifier, setIdentifier] = useState("");

  const handleSend = () => {
    // TODO: implement API call to send reset link or code
    alert(`Password reset via ${method} to ${identifier}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <button
        onClick={() => router.push("/login")}
        className="mb-4 flex items-center text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      
      </button>

      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Choose how to reset your password:
          </label>
          <div className="flex gap-4 justify-center" >
            <button
              className={`px-4 py-2 border rounded ${
                method === "email"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setMethod("email")}
            >
              Email
            </button>
            <button
              className={`px-4 py-2 border rounded ${
                method === "phone"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setMethod("phone")}
            >
              Phone
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {method === "email" ? "Email Address" : "Phone Number"}
          </label>
          <Input
            placeholder={
              method === "email" ? "you@example.com" : "+1234567890"
            }
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <Button className="w-full mt-4" onClick={handleSend}>
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
