# Stitch exports — CrisisLens Document Annotator

**Project:** CrisisLens Document Annotator  
**Project ID:** `7792652003124684155`

| Folder | Stitch screen / asset |
|--------|------------------------|
| `design-system/` | Design System (`asset-stub-assets_6a76395b87bd4605b9d64fa53978e741`) |
| `landing-page/` | CrisisLens - Landing Page (`0fb7040850ab4aaf9549fc9732e905fd`) |
| `document-viewer/` | CrisisLens - Document Viewer (`c3c86cdb915942398f1c486b38832a2c`) |
| `onboarding-splash/` | CrisisLens - Onboarding Splash (`99e150039cb44e77bba229e1e23ad5f8`) |

Each screen folder contains:

- `screen.html` — Stitch-generated HTML/CSS reference
- `screenshot.png` — Rendered preview
- `meta.json` — IDs and dimensions

The design system folder contains `DESIGN.md`, `style-guidelines.md`, and `theme.json`.

## Regenerate

Requires Stitch API key in `~/.cursor/mcp.json` under the `stitch` MCP server:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/fetch-stitch-screens.ps1
```
