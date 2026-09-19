# AGENTS.md

## Project

Elevate Your Divine website.

This is an Astro + Tailwind website using React components where appropriate.

Read PROJECT_BRIEF.md before making significant design or content changes.

## Development Principles

- Treat the existing project as the foundation.
- Prefer modifying existing components over rebuilding equivalent functionality.
- Preserve working functionality unless the task explicitly requires changing it.
- Do not change frameworks.
- Do not replace Astro.
- Do not replace Tailwind.
- Do not add dependencies unless there is a clear requirement.
- Ask before adding a new production dependency.
- Avoid unnecessary JavaScript.
- Prefer Astro components for static content.
- Use React only when client-side interactivity is actually needed.
- Keep content and presentation reasonably separated.
- Keep the project maintainable and understandable.

## Visual Direction

Follow PROJECT_BRIEF.md for the visual identity.

The target aesthetic is:

- Luxury boutique consultancy
- Modern creative agency
- Sophisticated
- Minimal
- Premium
- Human
- Spacious

Avoid:

- Generic SaaS design
- Excessive gradients
- Excessive rounded cards
- Excessive animations
- Wellness/spiritual visual language
- Bright or glittery gold
- Purple-heavy palettes

## Existing Functionality

Preserve unless explicitly instructed otherwise:

- Netlify forms
- Netlify reCAPTCHA
- Google Analytics
- SEO metadata
- Open Graph metadata
- Privacy Policy
- Terms & Conditions
- Thank-you page
- Responsive navigation
- Mobile navigation
- GitHub/Netlify deployment compatibility

## Code Quality

Before considering a task complete:

1. Run `npm run build`.
2. Fix build errors introduced by the task.
3. Review the changed files.
4. Check for broken imports and references.
5. Check responsive behavior when the task affects UI.
6. Do not modify unrelated files.

## Git

Work incrementally.

Do not reset, rewrite, or delete existing Git history.

Do not commit changes unless explicitly requested.

## Task Discipline

For substantial tasks:

1. Inspect the relevant existing code.
2. Explain the implementation approach briefly.
3. Make the smallest appropriate set of changes.
4. Run validation.
5. Summarize what changed and any remaining issues.

Do not redesign unrelated sections while working on a specific task.

## Content

PROJECT_BRIEF.md is the source of truth for the new business positioning and website content.

Do not reintroduce the previous life coaching, bariatric coaching, or notary positioning unless explicitly requested.