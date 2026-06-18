import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export function getModel() {
  const client = getGeminiClient();
  // If gemini-2.0-flash fails on your key/region, fallback to 'gemini-1.5-flash'
  return client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.3,  // Low creativity — factual translation
      topP: 0.8,
      maxOutputTokens: 1024,
    },
  });
}
