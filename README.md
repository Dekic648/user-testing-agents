# User Testing Agents (UTA)

9 behavioral persona agents that test your product's usability in parallel. Each persona traces actual code paths from a distinct cognitive archetype and produces scored findings using a 5-dimension composite usability model.

## What This Does

UTA launches 9 independent AI agents simultaneously, each simulating a real user with a specific behavioral profile grounded in cognitive science and UX research. They don't test against specs — they read your actual source code, trace routes, check handlers, verify state flows, and report what each behavioral type would experience.

The orchestrator collects all 9 reports, deduplicates issues, computes composite scores, and produces a unified usability report.

## The 9 Behavioral Personas

| # | Persona | Behavioral Archetype | Grounded In |
|---|---------|---------------------|-------------|
| 1 | **Scanner** | Satisficer — skims, clicks first CTA, never reads | Krug, Simon (1956), Nielsen F-pattern |
| 2 | **Deliberator** | Maximizer — reads everything, compares all options | Schwartz (2004), Pask (1976) |
| 3 | **Rushing Pragmatist** | Time-pressured — 3 min, zero friction tolerance | Maule & Hockey (1993), CLT |
| 4 | **Novice** | First-timer — no mental model, scared by jargon | Dreyfus (1980), Norman (2013) |
| 5 | **Power User** | Expert — wants shortcuts, bulk ops, customization | Dreyfus (1980), Shneiderman (1986) |
| 6 | **Distracted Multitasker** | Interrupted — 12 tabs, returns 10 min later | Altmann & Trafton (2002), CLT |
| 7 | **Accessibility User** | Keyboard-only, screen reader dependent | WCAG 2.1, Microsoft Inclusive Design |
| 8 | **Skeptical Evaluator** | Evaluating adoption — looking for red flags | Fogg (2002), trust literature |
| 9 | **UI Purist** | Visual critic — every pixel, every spacing decision | Tractinsky (2000), Norman (2004), Gestalt |

## Scoring Framework: UTA Composite Usability Model

5 dimensions with persona-specific weight adjustments:

| Dimension | Default Weight | What It Measures |
|-----------|:---:|---|
| **Effectiveness** | 25% | Completion rate, errors, dead-ends |
| **Efficiency** | 20% | Step count vs. minimum, wasted effort, shortcuts |
| **Learnability** | 20% | First-use success, jargon, empty states, progressive disclosure |
| **Satisfaction** | 20% | Clarity, confidence, delight, trust signals |
| **Craft** | 15% | Spacing, typography, color system, alignment, consistency |

Benchmarks: **90+** Excellent | **75-89** Good | **60-74** Acceptable | **<60** Poor

### Userfocus Prioritization (Issue Severity)

Issues are also classified using the Userfocus 3-question decision tree:

1. **Is it on a Red Route?** (critical user journey defined in domain.md)
2. **Is it hard to overcome?** (show-stopper vs. workaround)
3. **Is it persistent?** (one-time vs. recurring)

This produces 4 severity levels: **Critical** > **Serious** > **Medium** > **Low**

### What Makes Personas Rock-Solid

Every persona is grounded in three layers of evidence:

1. **Academic citations** — published research with specific papers and years
2. **Empirical behavioral markers** — real statistics from NNGroup, Baymard, WebAIM, Google, and others (e.g., "79% of users scan; only 16% read word-by-word")
3. **Deterministic behavioral signatures** — IF/THEN rules derived from research that define exactly how each persona interacts with interfaces

Personas also dynamically adapt their task to the product being tested via a **Task Selection Protocol**.

## Commands

| Command | What It Does |
|---------|-------------|
| `/uta:test` | Full 9-persona parallel test |
| `/uta:test-quick` | Quick 3-persona test (Scanner, Novice, UI Purist) |
| `/uta:test-persona` | Single persona deep dive (e.g., `/uta:test-persona accessibility-user`) |
| `/uta:report` | Reformat or filter the last report |
| `/uta:compare` | Compare two test runs (fixed, regressed, persisted) |

## Installation

```bash
# Clone the repo
git clone https://github.com/Dekic648/user-testing-agents.git

# Copy commands (enables /uta:* slash commands)
mkdir -p ~/.claude/commands/uta
cp user-testing-agents/commands/*.md ~/.claude/commands/uta/

# Copy skills, agents, and scoring (enables agent execution)
mkdir -p ~/.claude/uta
cp -r user-testing-agents/skills ~/.claude/uta/
cp -r user-testing-agents/agents ~/.claude/uta/
cp -r user-testing-agents/scoring ~/.claude/uta/
```

## Domain Configuration

For product-specific testing, create a `domain.md` in your project root. This tells personas what tasks to attempt, what tech stack to expect, what known issues to skip, and — critically — what your **Red Routes** are (the 3-5 most important user journeys). Issues on red routes are automatically elevated in severity.

## Report Persistence

Test reports are saved to `.uta/reports/` in the tested project directory (timestamped). This enables the `/uta:compare` command to diff across runs.

## How It Works

1. You run `/uta:test` and specify a scope (feature, directory, or "test everything")
2. The orchestrator launches all 9 persona agents in parallel
3. Each persona independently reads your code, traces user journeys, and scores usability
4. The orchestrator collects all 9 reports and synthesizes:
   - Deduplicates issues across personas
   - Computes per-persona composite scores (persona-specific weights)
   - Identifies cross-persona patterns (systemic vs. edge-case issues)
   - Produces a fix priority matrix (severity x persona count x fix size)
5. The unified report is presented and saved

## Architecture

```
user-testing-agents/
├── agents/orchestrator.md        # Parallel launcher + synthesizer
├── skills/                       # 9 persona agents
│   ├── scanner/skill.md
│   ├── deliberator/skill.md
│   ├── rushing-pragmatist/skill.md
│   ├── novice/skill.md
│   ├── power-user/skill.md
│   ├── distracted-multitasker/skill.md
│   ├── accessibility-user/skill.md
│   ├── skeptical-evaluator/skill.md
│   └── ui-purist/skill.md
├── scoring/composite-model.md    # 5-dimension scoring framework
├── commands/                     # 5 slash commands
├── domain.md                     # Product context template
└── .claude-plugin/               # Plugin manifest
```

## License

MIT
