import { NextResponse } from 'next/server';
import { mockUsers } from '../utils/mockDb';


interface User {
  email: string;
  password: string;
}

// Mock function simulating sending a confirmation email
function sendConfirmationEmail(email: string) {
  console.log(`Sending confirmation email to ${email} (mock)`);
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const userExists = mockUsers.find((u) => u.email === email);
    if (userExists) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 400 }
      );
    }

    // Store the user (in a real project, you'd use a database)
    mockUsers.push({ email, password });

    // Mock sending a confirmation email
    sendConfirmationEmail(email);

    return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
