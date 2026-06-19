---
name: Crisis Management Protocol
colors:
  surface: '#fdf8f7'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f1'
  surface-container: '#f1edec'
  surface-container-high: '#ece7e6'
  surface-container-highest: '#e6e1e0'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4d4540'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#7e7570'
  outline-variant: '#d0c4be'
  surface-tint: '#625d5b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1e1b19'
  on-primary-container: '#888380'
  inverse-primary: '#ccc5c2'
  secondary: '#625e59'
  on-secondary: '#ffffff'
  secondary-container: '#e5ded8'
  on-secondary-container: '#66625d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9e1dd'
  primary-fixed-dim: '#ccc5c2'
  on-primary-fixed: '#1e1b19'
  on-primary-fixed-variant: '#4a4643'
  secondary-fixed: '#e8e1db'
  secondary-fixed-dim: '#ccc5bf'
  on-secondary-fixed: '#1e1b17'
  on-secondary-fixed-variant: '#4a4641'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fdf8f7'
  on-background: '#1c1b1b'
  surface-variant: '#e6e1e0'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  card-gap: 20px
---

## Brand & Style

The design system is engineered for high-stakes, information-dense environments where clarity and composure are paramount. It adopts a **Bureaucratic-yet-Accessible** aesthetic—combining the authoritative reliability of official documentation with the frictionless usability of modern SaaS.

The personality is intentionally calm, utilizing a warm, paper-like foundation to reduce eye strain during extended annotation sessions. It avoids unnecessary flourishes, favoring a structured, "fill-in-the-blanks" utility that guides users through chaotic data with systematic precision. The emotional response is one of controlled urgency: providing the tools to organize crisis information without contributing to cognitive overload.

## Colors

This design system utilizes a sophisticated neutral palette grounded in Stone tones to mimic archival quality. The primary interface relies on a warm off-white (`#FAFAF9`) to distinguish digital surfaces from pure white paper cards.

**Semantic Urgency Palette:**
Visual priority is managed through three specific tiers. Use the `CRITICAL` palette for life-safety issues, `TIME-SENSITIVE` for logistics and deadlines, and `INFORMATIONAL` for verified facts. 

**Annotation Highlights:**
Highlights are functional, not decorative. They employ a "marker-pen" style with a tinted background and a saturated bottom border to ensure text remains legible while being clearly categorized as Jargon, Deadlines, or Instructions.

## Typography

The typographic hierarchy balances editorial authority with technical precision:
- **Serif (Source Serif 4):** Reserved for document titles, section headers, and "The Voice of Authority." It should feel like a printed report.
- **Sans-Serif (Inter):** Used for all body text, input fields, and descriptions. It provides maximum legibility for rapid reading.
- **Monospace (JetBrains Mono):** Used for badges, timestamps, status labels, and metadata. It signals "Data" and "Verifiable Info," helping users distinguish between narrative content and technical facts.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar for document navigation and the annotation panel occupy fixed widths (320px and 400px respectively), while the central document viewer scales to accommodate the content.

A strict 4px baseline grid ensures vertical rhythm. Elements are grouped using generous white space to prevent the "wall of text" effect common in emergency software. Use 24px margins for main containers and 16px gutters between modular cards. On mobile, sidebars collapse into a drawer system, and the document view takes 100% width with reduced 16px horizontal padding.

## Elevation & Depth

This design system uses **Tonal Layering** combined with subtle shadows to create a hierarchy of focus. 

1.  **Canvas (Base):** The #FAFAF9 background is the lowest level.
2.  **Cards (Level 1):** Document panels and annotation cards use a pure white background with a 1px Stone-200 border. They feature a very soft, ambient shadow: `box-shadow: 0 1px 3px rgba(28, 25, 23, 0.05), 0 1px 2px rgba(28, 25, 23, 0.1)`.
3.  **Active/Floating (Level 2):** Hovering over an annotation or opening a context menu increases the shadow spread and adds a subtle 2px border-left in the primary color to indicate active focus.

Avoid heavy blurs or glassmorphism, as they can interfere with text legibility in high-pressure situations.

## Shapes

The shape language reinforces the "Accessible Bureaucracy" theme by mixing soft structural forms with functional pills.
- **8px (Cards/Panels):** Large enough to feel approachable and modern, but sharp enough to feel professional.
- **6px (Buttons/Inputs):** A slightly tighter radius for interactive elements to make them feel "clickable" and distinct from layout containers.
- **999px (Badges/Status):** Circular caps for status indicators to make them stand out as discrete, glanceable metadata objects.

## Components

**Buttons:** 
- **Primary:** Solid Stone-900 with white text. 6px radius.
- **Secondary:** Transparent with Stone-200 border and Stone-900 text.
- **Critical Action:** Solid #DC2626 (from urgency palette) to denote destructive or high-impact actions.

**Annotation Cards:**
White background, 8px radius, Stone-200 border. Must include a header row using JetBrains Mono for the timestamp and a Source Serif 4 title. The body should be Inter.

**Badges:**
Always use JetBrains Mono, Uppercase, 999px radius. Backgrounds and text must follow the Urgency Palette. Ensure a minimum horizontal padding of 12px.

**Input Fields:**
6px radius, Stone-200 border. On focus, the border changes to Stone-900. Use Inter for input text and JetBrains Mono for micro-labels appearing above the field.

**Annotation Highlights:**
Applied directly to document text. Background colors should have 100% opacity for the 2px bottom border and 20-30% opacity for the main text highlight area to maintain contrast.
