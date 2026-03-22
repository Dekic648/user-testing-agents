---
description: "Quick 3-persona usability test — Scanner, Novice, and UI Purist for maximum dimension coverage in minimum time"
---

You are running a **UTA Quick Test** session.

## What This Does

Launches 3 persona agents in parallel — chosen to cover the widest range of the 5 scoring dimensions with minimum agent count:

- **Scanner** — catches Effectiveness failures (dead-ends, misleading CTAs, broken happy paths)
- **Novice** — catches Learnability failures (jargon, missing empty states, no progressive disclosure)
- **UI Purist** — catches Craft failures (spacing, typography, color system, alignment)

Together these 3 provide strong coverage across all 5 dimensions:
- Effectiveness: Scanner (primary)
- Efficiency: Scanner (secondary)
- Learnability: Novice (primary)
- Satisfaction: Novice + Scanner (secondary)
- Craft: UI Purist (primary)

## How to Use

Same as `/uta:test` — point at a feature, directory, or say "test everything."

## Process

Use the user-testing-agents orchestrator in quick mode. The orchestrator will:

1. Resolve the test scope
2. Check for domain.md
3. Launch only Scanner, Novice, and UI Purist in parallel
4. Collect 3 Persona Test Reports
5. Deduplicate and synthesize
6. Produce a unified report (same format, 3 personas instead of 9)
7. Save to `.uta/reports/`

## When to Use

- **During development** — quick feedback loop on a feature you just built
- **Before a PR** — sanity check before code review
- **Time-constrained** — when you want results in ~1 minute instead of ~3
- **Iterating on fixes** — re-test after addressing issues from a full test
