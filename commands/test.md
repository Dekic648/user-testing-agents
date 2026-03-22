---
description: "Run 9 behavioral persona agents in parallel to test product usability — each traces actual code paths and produces scored findings using the UTA Composite Usability Model"
---

You are running a **UTA Full Test** session.

## What This Does

Launches 9 independent persona agents simultaneously. Each persona has a distinct behavioral archetype grounded in cognitive science and UX research. They trace actual code paths — reading components, following handlers, checking state flows — and report what each behavioral type would experience.

The orchestrator collects all 9 reports, deduplicates issues, computes composite scores using the UTA Composite Usability Model (5 dimensions, persona-specific weights), and produces a unified report.

## How to Use

Point the test at your product:
- A directory path: "Test /src/features/dashboard"
- A feature name: "Test the onboarding flow"
- Full sweep: "Test everything"

## Process

Use the user-testing-agents orchestrator. The orchestrator will:

1. Resolve the test scope from the user's input
2. Check for domain.md and load product context
3. Launch all 9 persona agents in parallel using the Agent tool
4. Collect all 9 Persona Test Reports
5. Deduplicate issues across personas
6. Compute per-persona and overall composite scores
7. Identify cross-persona patterns
8. Produce the unified UTA Composite Usability Report
9. Save the report to `.uta/reports/` in the tested project

## The 9 Personas

| # | Persona | Behavioral Archetype | Key Dimension | Academic Grounding |
|---|---------|---------------------|---------------|-------------------|
| 1 | Scanner | Satisficer — skims, clicks first CTA | Effectiveness | Krug, Simon, Nielsen F-pattern |
| 2 | Deliberator | Maximizer — reads everything, compares | Learnability | Schwartz, Pask |
| 3 | Rushing Pragmatist | Time-pressured — 3 min, zero friction | Efficiency | Maule & Hockey, CLT |
| 4 | Novice | First-timer — no mental model | Learnability | Dreyfus, Norman |
| 5 | Power User | Expert — wants shortcuts, depth | Efficiency | Dreyfus, Shneiderman |
| 6 | Distracted Multitasker | Interrupted — 12 tabs, returns later | Effectiveness | Altmann & Trafton |
| 7 | Accessibility User | Keyboard-only, screen reader | Effectiveness | WCAG 2.1 |
| 8 | Skeptical Evaluator | Evaluating adoption — red flags | Satisfaction | Fogg |
| 9 | UI Purist | Visual critic — every pixel | Craft | Tractinsky, Gestalt |

## Scoring Framework

5 dimensions with persona-specific weight adjustments:
- **Effectiveness (25%)** — completion rate, errors, dead-ends
- **Efficiency (20%)** — step count, wasted effort, shortcuts
- **Learnability (20%)** — first-use success, jargon, empty states
- **Satisfaction (20%)** — clarity, confidence, delight, trust
- **Craft (15%)** — spacing, typography, color, alignment, consistency

Benchmarks: 90+ Excellent, 75-89 Good, 60-74 Acceptable, <60 Poor

## Prioritization

Issues are prioritized using two complementary methods:

1. **Userfocus Decision Tree** — 3-question severity classification (Red Route? Hard to overcome? Persistent?) producing Critical/Serious/Medium/Low ratings
2. **Quantitative Score** — severity_weight x persona_count x fix_speed_bonus

Red routes (critical user journeys) can be defined in `domain.md`. Issues on red routes are automatically elevated.

## Output

A UTA Composite Usability Report containing:
- Overall product score (0-100)
- Composite scorecard (5 dimensions x 9 personas)
- Dimension summary (weakest/strongest per dimension)
- Deduplicated issue list with Userfocus severity classification and persona coverage
- Cross-persona patterns (systemic vs. persona-specific)
- Positive findings
- Fix priority matrix (dual: Userfocus severity + quantitative score)
- **Ranked priorities with potential solutions** (directional fixes for P0/P1 issues)
- Per-persona detail reports (full individual reports)

The report is saved to `.uta/reports/{timestamp}-report.md` in the tested project.
