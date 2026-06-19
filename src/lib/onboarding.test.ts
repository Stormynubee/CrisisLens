import { describe, expect, it } from 'vitest';
import { shouldRedirectToWelcome } from './onboarding';

describe('onboarding gate', () => {
  it('redirects first visit from / to welcome', () => {
    expect(shouldRedirectToWelcome('/', false)).toBe(true);
  });

  it('redirects first visit from /viewer to welcome', () => {
    expect(shouldRedirectToWelcome('/viewer', false)).toBe(true);
  });

  it('skips when onboarded cookie present', () => {
    expect(shouldRedirectToWelcome('/', true)).toBe(false);
    expect(shouldRedirectToWelcome('/viewer', true)).toBe(false);
  });

  it('never redirects /welcome or API routes', () => {
    expect(shouldRedirectToWelcome('/welcome', false)).toBe(false);
    expect(shouldRedirectToWelcome('/api/ingest', false)).toBe(false);
  });
});
