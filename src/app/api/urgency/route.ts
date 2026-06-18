import { NextRequest, NextResponse } from 'next/server';
import { classifyUrgency } from '@/lib/urgency-classifier';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      );
    }

    const urgency = classifyUrgency(text);

    return NextResponse.json({
      urgency,
      method: 'deterministic-keyword-regex',
      note: 'Urgency classification is rule-based, not LLM-generated.',
    });
  } catch (error) {
    console.error('Urgency API error:', error);
    return NextResponse.json(
      { error: 'Classification failed' },
      { status: 500 }
    );
  }
}
