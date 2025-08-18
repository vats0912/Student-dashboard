import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const feedbackStore: { email: string; feedback: string; submittedAt: string }[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, feedback } = body;

  if (!email || !feedback) {
    return NextResponse.json({ message: 'Missing data' }, { status: 400 });
  }

  feedbackStore.push({
    email,
    feedback,
    submittedAt: new Date().toISOString(),
  });

  console.log('Feedback received:', feedbackStore.at(-1));

  return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 });
}
