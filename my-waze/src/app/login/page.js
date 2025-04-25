"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function WazeLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with', formData);
    // Add login logic here
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Waze Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Email Address or Phone Number"
          onChange={e => handleChange('identifier', e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={e => handleChange('password', e.target.value)}
        />
        <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
          Forgot Password?
        </div>
        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
      </form>

      <p className="text-center text-sm mt-6 text-gray-600">
        Don&apos;t have an account?{' '}
        <span
          onClick={() => router.push('/register')}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Register here
        </span>
      </p>
    </div>
  );
}
