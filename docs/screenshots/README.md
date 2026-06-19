# Screenshots

Regenerate from production:

```bash
npm run screenshots
```

Output: `00-welcome.png` … `04-viewer-mobile.png` (default `BASE_URL=https://crisislens-ashen.vercel.app`).

The script captures `/welcome` without an onboarding cookie, then sets `crisislens_onboarded` before landing and viewer shots.
