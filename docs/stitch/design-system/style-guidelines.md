## Brand & Style

The design system is engineered for high-stakes, information-dense environments where clarity and composure are paramount. It adopts a **Bureaucratic-yet-Accessible** aesthetic—combining the authoritative reliability of official documentation with the frictionless usability of modern SaaS.

The personality is intentionally calm, utilizing a warm, paper-like foundation to reduce eye strain during extended annotation sessions. It avoids unnecessary flourishes, favoring a structured, "fill-in-the-blanks" utility that guides users through chaotic data with systematic precision. The emotional response is one of controlled urgency: providing the tools to organize crisis information without contributing to cognitive overload.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar for document navigation and the annotation panel occupy fixed widths (320px and 400px respectively), while the central document viewer scales to accommodate the content.

A strict 4px baseline grid ensures vertical rhythm. Elements are grouped using generous white space to prevent the "wall of text" effect common in emergency software. Use 24px margins for main containers and 16px gutters between modular cards. On mobile, sidebars collapse into a drawer system, and the document view takes 100% width with reduced 16px horizontal padding.

## Elevation & Depth

This design system uses **Tonal Layering** combined with subtle shadows to create a hierarchy of focus. 

1.  **Canvas (Base):** The #FAFAF9 background is the lowest level.
2.  **Cards (Level 1):** Document panels and annotation cards use a pure white background with a 1px Stone-200 border. They feature a very soft, ambient shadow: `box-shadow: 0 1px 3px rgba(28, 25, 23, 0.05), 0 1px 2px rgba(28, 25, 23, 0.1)`.
3.  **Active/Floating (Level 2):** Hovering over an annotation or opening a context menu increases the shadow spread and adds a subtle 2px border-left in the primary color to indicate active focus.

Avoid heavy blurs or glassmorphism, as they can interfere with text legibility in high-pressure situations.

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
