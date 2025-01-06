'use client';

import React, { useState } from 'react';

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Reset link sent! Check console for the URL.');
      } else {
        setMessage(data.message || 'Error requesting password reset.');
      }
    } catch (error) {
      setMessage('Network error');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleRequestReset}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Request Password Reset</h1>
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
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="mt-4 text-sm text-red-600">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
