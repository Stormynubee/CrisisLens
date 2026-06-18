import { NextRequest, NextResponse } from 'next/server';
import { getModel } from '@/lib/gemini';
import { buildGistPrompt } from '@/lib/prompts';
import { Language, UrgencyLevel } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      paragraphText,
      language,
      documentContext,
      urgency,
    }: {
      paragraphText: string;
      language: Language;
      documentContext: string;
      urgency: UrgencyLevel;
    } = body;

    if (!paragraphText || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: paragraphText, language' },
        { status: 400 }
      );
    }

    const model = getModel();
    const prompt = buildGistPrompt(paragraphText, language, urgency, documentContext);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON response from LLM — strip fences, tolerate minor formatting issues
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'LLM returned invalid JSON. Use demo mode for reliable demo.' },
        { status: 502 }
      );
    }

    const response = {
      ...parsed,
      paragraphId: body.paragraphId || 'unknown',
      language,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Gist API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate gist. Please try again.' },
      { status: 500 }
    );
  }
}
