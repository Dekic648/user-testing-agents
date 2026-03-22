# Release Notes

## v1.0.0 — 2026-03-22

Initial release of User Testing Agents (UTA).

### 9 Behavioral Personas
- Scanner (Satisficer)
- Deliberator (Maximizer)
- Rushing Pragmatist (Time-Pressured)
- Novice (First-Timer)
- Power User (Expert)
- Distracted Multitasker (Interrupted)
- Accessibility User (Keyboard/Screen Reader)
- Skeptical Evaluator (Adoption Judge)
- UI Purist (Visual Critic)

### UTA Composite Usability Model
- 5 scoring dimensions: Effectiveness, Efficiency, Learnability, Satisfaction, Craft
- Persona-specific weight adjustments
- Composite scores 0-100 with benchmarks

### 5 Commands
- `/uta:test` — Full 9-persona parallel test
- `/uta:test-quick` — Quick 3-persona test (Scanner, Novice, UI Purist)
- `/uta:test-persona` — Single persona deep dive
- `/uta:report` — Reformat/filter reports
- `/uta:compare` — Diff two test runs

### Infrastructure
- Parallel execution via Agent tool (all personas launch simultaneously)
- Report persistence to `.uta/reports/` in tested project
- Domain configuration via `domain.md` for product-specific testing
- Issue deduplication and cross-persona pattern analysis
- Fix priority matrix (severity x persona count x fix size)
