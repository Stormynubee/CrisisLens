# Changelog

All notable changes to CrisisLens are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-19

### Added

- Production README, MIT license, and GitHub banner
- Phase 9–10 verification scripts and Vercel deploy path
- Site footer with version and GitHub link
- GitHub Actions CI workflow (build + typecheck)

### Changed

- `phase7-verify.ts` checks `viewer/page.tsx` for language refetch

## [0.9.0] - 2026-06-19

### Added

- Logo (`public/logo.png`) and Open Graph image (`public/og-image.png`)
- `metadataBase` and social preview tags in root layout

## [0.8.0] - 2026-06-19

### Added

- Landing page (`/`) with hero, feature pills, and Analyze flow
- Viewer route (`/viewer`) with 55/45 split-pane and mobile HITL footer
- URL-driven document, language, and demo mode params

## [0.7.0] - 2026-06-18

### Added

- HITL banner in gist sidebar empty state and mobile footer
- Phase 7–8 verification scripts

## [0.6.0] - 2026-06-18

### Added

- Odia and Hindi script classes on gist and checklist UI
- Six pre-cached demo response JSON files (EN + OR, 14 paragraphs)

## [0.5.0] - 2026-06-18

### Added

- `GistSidebar` and `ActionChecklist`
- `/api/gist` and `/api/urgency` route handlers
- Gemini client via `@google/generative-ai`

## [0.4.0] - 2026-06-18

### Added

- `DocumentViewer`, `ParagraphBlock`, `HighlightedText`
- `useDocument` hook with demo JSON loader

## [0.3.0] - 2026-06-17

### Added

- Three synthetic demo documents (school, medical, government)
- `DocumentInput` cards and `Header` chrome

## [0.2.0] - 2026-06-17

### Added

- Deterministic urgency classifier
- Paragraph parser and regex highlight engine
- Core TypeScript domain types

## [0.1.0] - 2026-06-17

### Added

- Next.js 16 App Router scaffold
- Tailwind crisis design system and global styles
- Design tokens and project tooling

[1.0.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v1.0.0
[0.9.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.9.0
[0.8.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.8.0
[0.7.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.7.0
[0.6.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.6.0
[0.5.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.5.0
[0.4.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.4.0
[0.3.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.3.0
[0.2.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.2.0
[0.1.0]: https://github.com/Stormynubee/CrisisLens/releases/tag/v0.1.0
