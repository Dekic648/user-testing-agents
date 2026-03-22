# UTA Domain Configuration

Edit this file to inject product-specific context into every persona agent. When customized, personas will test YOUR product with tailored tasks instead of inferring them from the codebase.

## Product Under Test

**Product name:** [Your product name]

**What it does:** [One sentence — what problem does it solve?]

**Primary URL / entry point:** [e.g., "/" or "/dashboard" or "index.html"]

**Tech stack:** [e.g., React + Vite, Next.js + Supabase, Vue + Nuxt, etc.]

**Key source directories:**
- Pages/routes: [e.g., /src/pages/]
- Components: [e.g., /src/components/]
- State management: [e.g., /src/stores/ or /src/hooks/]
- API/handlers: [e.g., /src/api/ or /src/lib/]

## Users

**Primary user persona:** [Who uses this? Role, skill level, context of use]

**Secondary personas:** [Other user types, if relevant]

## Core Tasks to Test

Define the tasks personas should attempt. If left blank, personas will infer tasks from the codebase.

1. **Primary task:** [The main thing a user does. e.g., "Create a chart and export it as PDF"]
2. **Secondary task:** [A common secondary flow. e.g., "Build a multi-chart report"]
3. **Power user task:** [Advanced flow. e.g., "Customize axis ranges, add reference lines, bulk export"]
4. **First-time task:** [What a brand new user would try. e.g., "Make their first chart with sample data"]

## Accessibility Requirements

**WCAG target level:** [AA / AAA / none specified]

**Known assistive tech users:** [Screen readers? Keyboard-only? Switch devices? Low vision?]

## Design System

**Design tokens / system:** [e.g., Tailwind, custom tokens, Material UI, Shadcn, etc.]

**Base spacing unit:** [e.g., 4px, 8px]

**Type scale:** [e.g., "12/14/16/20/24/32" or "reference /src/styles/tokens.css"]

**Color palette reference:** [File path or description of the color system]

## Red Routes (Critical User Journeys)

Define the 3-5 most critical user journeys in your product. Issues found on red routes are automatically elevated in severity using the Userfocus prioritization framework. Red routes are the paths that matter most — if these break, users leave.

If left blank, personas will infer the primary task flow as the default red route.

1. [e.g., "New user → create first chart → export as PDF"]
2. [e.g., "Returning user → open saved chart → modify → re-export"]
3. [e.g., "Report builder → add charts to report → fill metadata → generate PPTX"]

## Known Issues (skip these)

List issues you already know about so personas don't waste time re-reporting them:
- [e.g., "Mobile layout not implemented yet — skip responsive testing"]
- [e.g., "Export to PPTX is a known stub — don't report it as broken"]
- [e.g., "Settings page is placeholder — skip it"]

## How Persona Agents Use This File

Each persona adapts its task based on this configuration:

| Persona | Uses |
|---------|------|
| Scanner | Primary task, entry point — tests the obvious path |
| Deliberator | All tasks — explores exhaustively, compares options |
| Rushing Pragmatist | Primary task — 3-minute constraint, fastest path |
| Novice | First-time task — checks jargon, empty states, guidance |
| Power User | Power user task — checks shortcuts, customization, efficiency |
| Distracted Multitasker | Primary task — starts, gets interrupted, resumes |
| Accessibility User | Primary task — keyboard-only, WCAG target, screen reader |
| Skeptical Evaluator | All tasks — evaluates trustworthiness, polish, professionalism |
| UI Purist | Design system section — uses as baseline for visual audit |
