'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setMessage('Login successful! Check cookies for demo-token.');
        setEmail('');
        setPassword('');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      setMessage('Error during login attempt.');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
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
          Log In
        </button>
        {message && (
          <p className="mt-4 text-red-600 text-sm">
            {message}
          </p>
        )}
        <Link 
            href="/password-reset"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot your password?
        </Link>
        <Link 
        href="/register"
        className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
        >
        Don’t have an account? Register here!
        </Link>
      </form>
    </main>
  );
}
