import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch user email from Clerk using the userId
    const userEmail = await getUserEmailFromClerk(userId);

    // Save the email to your backend (Spring Boot API)
    const response = await fetch('http://localhost:8080/api/v1/save-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    });

    if (!response.ok) {
      throw new Error('Failed to save email to the backend');
    }

    return NextResponse.json({ message: 'Email saved successfully' });
  } catch (error) {
    console.error('Failed to save email:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper function to get the user's email using Clerk's SDK
async function getUserEmailFromClerk(userId: string): Promise<string> {
  const user = await clerkClient.users.getUser(userId);
  return user.emailAddresses[0].emailAddress;
}
