// car_project/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { mockUsers } from '../utils/mockDb';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user in mock array
    console.log('All registered emails:', mockUsers.map((u) => u.email));
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials (user not found).' },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials (wrong password).' },
        { status: 401 }
      );
    }

    // "Log user in" by generating a fake token
    const fakeToken = Math.random().toString(36).substr(2);

    // Store token in a cookie (demo approach)
    const response = NextResponse.json({ message: 'Login successful!' });
    response.cookies.set('demo-token', fakeToken, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
