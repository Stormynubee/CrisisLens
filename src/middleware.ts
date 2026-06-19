import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ONBOARDING_COOKIE, shouldRedirectToWelcome } from '@/lib/onboarding';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasCookie = request.cookies.get(ONBOARDING_COOKIE)?.value === '1';

  if (shouldRedirectToWelcome(pathname, hasCookie)) {
    const url = request.nextUrl.clone();
    url.pathname = '/welcome';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png|og-image.png).*)'],
};
