import { NextResponse } from 'next/server';
import { mockUsers, resetTokens } from '../utils/mockDb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Look for user in mock array
    const user = mockUsers.find((u) => u.email === email);

    // For security, we typically return a generic success 
    // even if the user doesn't exist, so we don't reveal user info. 
    // For this simple demo, let's handle it explicitly.
    if (!user) {
      return NextResponse.json(
        { message: 'No user found with that email.' },
        { status: 404 }
      );
    }

    // Generate a simple, random token
    const token = Math.random().toString(36).slice(2);

    // Store token -> user's email
    resetTokens[token] = email;

    // In a real app, you’d email this link to the user
    // Here we just log it to the server console for demo
    const resetLink = `http://localhost:3000/password-reset/${token}`;
    console.log(`Password Reset Link (mock email): ${resetLink}`);

    return NextResponse.json({
      message: 'Password reset link generated (see server console).',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
