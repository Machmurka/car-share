'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // The [token] is part of the URL (e.g. /password-reset/abc123)
  // We can parse it from the pathname or use next/router dynamic segments
  const token = pathname.split('/').pop() || '';

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/password-reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Password reset successful!');
        // Optionally redirect user to login after a delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage(data.error || 'Error resetting password.');
      }
    } catch (error) {
      setMessage('Network error');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleReset} 
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Set New Password</h1>
        <label className="block mb-2 font-medium">
          New Password
          <input
            type="password"
            className="mt-1 block w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Reset Password
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
