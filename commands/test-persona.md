---
description: "Run a single named persona agent for deep usability testing from one behavioral perspective — e.g., /uta:test-persona scanner"
---

You are running a **UTA Single Persona Test**.

## What This Does

Runs one specific persona agent against the target scope. Use this when you want deep testing from a particular behavioral perspective — for example, after fixing accessibility issues and wanting to re-test with just the Accessibility User.

## How to Use

Specify the persona by name:
- "Run the accessibility user on /src/components"
- "Test as the rushing pragmatist"
- "Power user test on the export flow"
- "Scanner test on the dashboard"

## Valid Persona Names

| Name | Archetype |
|------|-----------|
| `scanner` | Satisficer — skims, clicks first CTA |
| `deliberator` | Maximizer — reads everything, compares |
| `rushing-pragmatist` | Time-pressured — 3 min, zero friction |
| `novice` | First-timer — no mental model |
| `power-user` | Expert — shortcuts, depth, customization |
| `distracted-multitasker` | Interrupted — returns later |
| `accessibility-user` | Keyboard-only, screen reader |
| `skeptical-evaluator` | Evaluating adoption — red flags |
| `ui-purist` | Visual critic — every pixel |

## Process

Use the user-testing-agents orchestrator in single-persona mode. The orchestrator will:

1. Resolve the test scope
2. Check for domain.md
3. Launch only the named persona agent
4. Return the individual Persona Test Report without cross-persona synthesis

## Output

The individual Persona Test Report with:
- Journey trace (step-by-step with code references)
- Dimension scores (all 5, with persona-specific weights)
- Issues found (severity, dimension, code location, fix complexity)
- Positive findings

No cross-persona synthesis or deduplication — this is a single perspective.
