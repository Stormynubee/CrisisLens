'use client';

import { useState, useEffect } from 'react';

export function useDemo() {
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    // Check URL param: ?demo=true (or default to demo)
    const params = new URLSearchParams(window.location.search);
    const demoParam = params.get('demo');
    // Default to demo mode unless explicitly turned off
    setIsDemoMode(demoParam !== 'false');
  }, []);

  return { isDemoMode, setIsDemoMode };
}
