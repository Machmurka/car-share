import { NextResponse } from 'next/server';
import { mockUsers, resetTokens } from '../../utils/mockDb';

export async function POST(request: Request, { params }: any) {
  try {
    const { token } = params; // from URL
    const { newPassword } = await request.json();

    // Check if token is valid
    const email = resetTokens[token];
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token.' },
        { status: 400 }
      );
    }

    // Find the user
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: 'User no longer exists.' },
        { status: 404 }
      );
    }

    // Update the user's password (plaintext for demo)
    user.password = newPassword;

    // Remove the token so it can’t be reused
    delete resetTokens[token];

    // In real app, you'd confirm via email or redirect
    return NextResponse.json({ message: 'Password updated successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
