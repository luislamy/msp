"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from "lucide-react";

export default function WazeRegistration() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    permissions: {
      deviceInfo: false,
      gpsLocation: false,
      backgroundTracking: false,
      voiceCommands: false,
    },
    preferences: {
      syncCalendar: false,
      accessContacts: false,
      anonymousTrafficData: false,
    }
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (group, field, value) => {
    setFormData(prev => ({
      ...prev,
      [group]: { ...prev[group], [field]: value }
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <button
        onClick={() => router.push('/')}
        className="mb-4 flex items-center text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>

      <h2 className="text-2xl font-bold mb-4">Waze Registration</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Basic Information</label>
          <Input placeholder="Username" className="mt-1" onChange={e => handleChange('username', e.target.value)} />
          <Input placeholder="Email Address" className="mt-1" onChange={e => handleChange('email', e.target.value)} />
          <Input placeholder="Phone Number" className="mt-1" onChange={e => handleChange('phone', e.target.value)} />
          <Input placeholder="Password" type="password" className="mt-1" onChange={e => handleChange('password', e.target.value)} />
        </div>


        <div>
          <label className="block font-semibold mt-4">Device & Permissions</label>
          <label className="flex items-center space-x-2">
            <Checkbox id="deviceInfo" onCheckedChange={val => handleCheckboxChange('permissions', 'deviceInfo', val)} />
            <span>Share device info (model, OS, Advertising ID)</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox id="gpsLocation" onCheckedChange={val => handleCheckboxChange('permissions', 'gpsLocation', val)} />
            <span>Allow access to GPS location</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox id="backgroundTracking" onCheckedChange={val => handleCheckboxChange('permissions', 'backgroundTracking', val)} />
            <span>Allow background location tracking</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox id="voiceCommands" onCheckedChange={val => handleCheckboxChange('permissions', 'voiceCommands', val)} />
            <span>Enable voice commands</span>
          </label>
        </div>

        <div>
          <label className="block font-semibold mt-4">Optional Preferences</label>
          <label className="flex items-center space-x-2">
            <Checkbox id="syncCalendar" onCheckedChange={val => handleCheckboxChange('preferences', 'syncCalendar', val)} />
            <span>Sync calendar events for navigation</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox id="accessContacts" onCheckedChange={val => handleCheckboxChange('preferences', 'accessContacts', val)} />
            <span>Allow access to contacts (to share ETA)</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox id="anonymousTrafficData" onCheckedChange={val => handleCheckboxChange('preferences', 'anonymousTrafficData', val)} />
            <span>Allow anonymous traffic data collection</span>
          </label>
        </div>

        <Button className="w-full mt-4">Register</Button>
      </div>
    </div>
  );
}
