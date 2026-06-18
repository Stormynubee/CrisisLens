// LLM prompt constraints — these enforce the "no hallucination" contract.

import { Language, UrgencyLevel } from './types';

const LANGUAGE_INSTRUCTIONS: Record<Language, string> = {
  en: 'Respond in simple, clear English. Use short sentences. Avoid jargon.',
  hi: 'सरल हिंदी में जवाब दें। छोटे वाक्यों का प्रयोग करें। तकनीकी शब्दों से बचें। Respond in simple Hindi.',
  or: 'ସରଳ ଓଡ଼ିଆରେ ଉତ୍ତର ଦିଅନ୍ତୁ। ଛୋଟ ବାକ୍ୟ ବ୍ୟବହାର କରନ୍ତୁ। ବୃତ୍ତିଗତ ଶବ୍ଦ ଏଡ଼ାନ୍ତୁ। Respond in simple Odia.',
};

export function buildGistPrompt(
  paragraphText: string,
  language: Language,
  urgency: UrgencyLevel,
  documentContext: string,
): string {
  return `You are a crisis document translator for CrisisLens.

STRICT RULES:
1. Use ONLY information present in the source paragraph below. Do NOT add facts, dates, names, or details not in the text.
2. If anything is unclear or ambiguous, say so explicitly. Do NOT guess.
3. Never give legal, medical, or safety advice. Never say "you must" or "you should." Use "you may want to consider" or "this suggests."
4. Keep the gist under 3 sentences.
5. Keep "What this means for you" to 1-2 sentences.
6. Suggested actions must be framed as options, not commands. Use phrases like "Consider...", "You may want to...", "One option is to..."
7. ${LANGUAGE_INSTRUCTIONS[language]}

CONTEXT:
- Document: ${documentContext}
- Urgency level (pre-classified by rules, NOT by you): ${urgency}
- Target language: ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Odia'}

SOURCE PARAGRAPH:
"""
${paragraphText}
"""

Respond in this exact JSON format (no markdown, no code fences):
{
  "gist": "plain-language summary of this paragraph in the target language",
  "whatThisMeans": "1-2 sentences explaining personal impact in the target language",
  "suggestedActions": [
    { "id": "a1", "text": "action text in target language", "isCompleted": false, "priority": "high|medium|low" }
  ],
  "uncertainSections": ["quote any parts you are unsure about"],
  "sourceQuote": "first 200 chars of the source paragraph"
}`;
}
