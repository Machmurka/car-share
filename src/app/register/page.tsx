'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Basic client-side validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // VERY simple email check (for demo purposes only)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Check password length and ensure it has letters + numbers
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setMessage('Password must be at least 8 characters and include letters and numbers.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setMessage('Registration successful! Check console for mock email confirmation.');
        setEmail('');
        setPassword('');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Error submitting form.');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <label className="block mb-2 font-medium">
          Email
          <input
            type="email"
            className="mt-1 block w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2 font-medium">
          Password
          <input
            type="password"
            className="mt-1 block w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Sign Up
        </button>
        {message && (
          <p className="mt-4 text-sm text-red-600">
            {message}
          </p>
        )}
        <Link 
        href="/login"
        className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
      >
        Already have an account? Log in!
      </Link>
      </form>
    </main>
  );
}
