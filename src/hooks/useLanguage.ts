'use client';

import { useState } from 'react';
import { Language } from '@/lib/types';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');
  return { language, setLanguage };
}
