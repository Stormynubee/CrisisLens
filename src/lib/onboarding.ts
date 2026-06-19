export const ONBOARDING_STORAGE_KEY = 'crisislens:onboarded';
export const ONBOARDING_COOKIE = 'crisislens_onboarded';

export function isOnboardedClient(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ONBOARDING_STORAGE_KEY) === '1';
}

export function markOnboarded(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ONBOARDING_STORAGE_KEY, '1');
  document.cookie = `${ONBOARDING_COOKIE}=1; path=/; max-age=31536000; SameSite=Lax`;
}

export function shouldRedirectToWelcome(pathname: string, hasCookie: boolean): boolean {
  if (pathname.startsWith('/welcome')) return false;
  if (pathname.startsWith('/api')) return false;
  if (pathname.startsWith('/_next')) return false;
  if (pathname.includes('.')) return false;
  if (hasCookie) return false;
  return pathname === '/' || pathname.startsWith('/viewer');
}
