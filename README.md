<p align="center">
  <strong>User Testing Agents</strong><br>
  <em>9 AI personas. Parallel execution. One usability report.</em>
</p>

<p align="center">
  <a href="#the-9-personas">Personas</a> |
  <a href="#scoring-framework">Scoring</a> |
  <a href="#how-it-works">How It Works</a> |
  <a href="#installation">Install</a> |
  <a href="#commands">Commands</a>
</p>

---

Real usability studies cost $5-15K and take weeks. UTA gives you 80% of the signal in 2 minutes.

**User Testing Agents** launches 9 independent AI agents in parallel, each simulating a real user with a distinct behavioral profile grounded in published cognitive science research. They don't test against specs — they read your actual source code, trace routes, follow handlers, check state flows, and report exactly what each behavioral type would experience.

The orchestrator collects all 9 reports, cross-validates findings across personas, maps flow coverage, and produces a unified report with ranked priorities and directional solutions.

## Why This Exists

Every product team ships features without real user testing. It's too slow, too expensive, too late. By the time you get usability feedback, the code has shipped and the team has moved on.

UTA changes the economics:

| | Traditional Usability Study | UTA |
|---|---|---|
| **Cost** | $5,000-15,000 per study | $0 (runs on your AI subscription) |
| **Time** | 2-4 weeks | 2-3 minutes |
| **Personas** | 5-8 recruited participants | 9 behavioral archetypes, every time |
| **Consistency** | Varies by participant | Deterministic behavioral signatures |
| **Integration** | Separate process | Runs in your editor, on your code |
| **Specificity** | "Users had trouble with X" | "file.tsx:142 — handler returns early when state is null" |

## The 9 Personas

Each persona is grounded in three layers of evidence:

1. **Academic citations** — published research with specific papers and years
2. **Empirical behavioral markers** — real statistics from NNGroup, Baymard, WebAIM, Google (e.g., "79% of users scan; only 16% read word-by-word")
3. **Deterministic behavioral signatures** — IF/THEN rules that define exactly how each persona interacts

| Persona | Behavioral Archetype | What They Catch | Research Basis |
|---------|---------------------|----------------|---------------|
| **Scanner** | Satisficer — skims, clicks first CTA, never reads | Dead-end flows, misleading visual hierarchy, broken happy paths | Simon (1956), Krug (2000), Nielsen F-pattern |
| **Deliberator** | Maximizer — reads everything, compares all options | Missing tooltips, irreversible actions, inconsistent labels | Schwartz (2004), Pask (1976), Hick's Law |
| **Rushing Pragmatist** | Time-pressured — 3 minutes, zero friction tolerance | Excessive steps, slow paths, input format barriers | Maule & Hockey (1993), Cognitive Load Theory |
| **Novice** | First-timer — no mental model, scared by jargon | Jargon, empty states, missing onboarding, no guidance | Dreyfus (1980), Norman (2013) |
| **Power User** | Expert — wants shortcuts, bulk ops, customization | Missing keyboard shortcuts, no bulk actions, broken edge cases | Shneiderman (1986), Fitts' Law |
| **Distracted Multitasker** | Interrupted — 12 tabs, returns 10 min later | Lost form state, no autosave, missing re-orientation cues | Altmann & Trafton (2002), Iqbal & Horvitz (2007) |
| **Accessibility User** | Keyboard-only, screen reader dependent | Missing ARIA labels, broken focus management, contrast failures | WCAG 2.1, WebAIM Million Study |
| **Skeptical Evaluator** | Evaluating adoption — looking for red flags | Broken error states, missing loading states, unprofessional edges | Fogg (2002), Stanford Credibility Research |
| **UI Purist** | Visual critic — judges every pixel | Spacing inconsistency, typography violations, color system breaks | Tractinsky (2000), Gestalt Principles, 8px Grid |

### Mandatory Audit Checklists

Every persona carries a 14-15 item audit checklist — proactive checks they run regardless of what they encounter. The Scanner checks CTA hierarchy and first-click success. The Accessibility User checks headings, landmarks, ARIA, and focus management. The UI Purist checks spacing grids, type scales, and component consistency.

## Scoring Framework

### UTA Composite Usability Model

5 dimensions, each with persona-specific weight adjustments:

| Dimension | Weight | What It Measures |
|-----------|:---:|---|
| **Effectiveness** | 25% | Can the user finish? Completion rate, errors, dead-ends |
| **Efficiency** | 20% | How much effort? Step count vs. minimum, wasted effort |
| **Learnability** | 20% | Can a new user figure it out? Jargon, empty states, progressive disclosure |
| **Satisfaction** | 20% | How does it feel? Clarity, confidence, delight, trust signals |
| **Craft** | 15% | Visual quality. Spacing, typography, color system, alignment |

Each persona weighs dimensions differently. The Novice weights Learnability at 35%. The UI Purist weights Craft at 50%. The Power User weights Efficiency at 30%.

**Benchmarks:** 90+ Excellent | 75-89 Good | 60-74 Acceptable | <60 Poor

### Userfocus Prioritization

Every issue is also classified using the Userfocus 3-question decision tree:

```
Is it on a Red Route? (critical user journey)
  YES + Show-stopper?  --> CRITICAL
  YES + Workaround + Persistent?  --> SERIOUS
  NO  + Show-stopper?  --> SERIOUS
  NO  + Workaround + One-time?  --> LOW
```

This dual prioritization (composite scoring + Userfocus severity) ensures issues are ranked by both measurable impact and real-world urgency.

## How It Works

```
                         /uta:test
                            |
                    Flow Discovery
                  (map all user flows)
                            |
              Coverage Distribution
            (assign flows to personas)
                            |
        +---+---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   |   |
        v   v   v   v   v   v   v   v   v
       [1] [2] [3] [4] [5] [6] [7] [8] [9]
        |   |   |   |   |   |   |   |   |
        +---+---+---+---+---+---+---+---+
                            |
                     Collect 9 Reports
                            |
                  Deduplicate Issues
                            |
                Cross-Validation Pass
          ("Does Scanner's issue also
            break for the Novice?")
                            |
                 Userfocus Severity
                   Classification
                            |
              Ranked Priorities with
            Full Descriptions + Solutions
                            |
                  Unified Report + Save
```

1. **Flow Discovery** — reads your router/navigation to map all user-facing flows
2. **Coverage Distribution** — assigns flows to personas based on behavioral fit
3. **Parallel Launch** — fires all 9 persona agents simultaneously
4. **Code Tracing** — each persona reads actual source files, follows handlers, checks state
5. **Cross-Validation** — orchestrator checks if issues found by one persona affect others
6. **Dual Prioritization** — composite scoring + Userfocus decision tree
7. **Unified Report** — scorecard, coverage matrix, ranked priorities with solutions

### What the Report Contains

- **Flow Coverage Matrix** — which flows were tested by which personas (gaps flagged)
- **Composite Scorecard** — 5 dimensions x 9 personas, with per-persona composites
- **Cross-Impact Matrix** — issues cross-validated across personas
- **Ranked Priorities** — each with full problem description, code location, behavioral impact, and directional solution
- **Per-Persona Detail Reports** — full individual reports with journey traces

## Best For

UTA personas are calibrated for products where users **navigate pages, fill forms, click buttons, read content, and expect professional output**.

**Strong Fit:**
- **SaaS / Web Applications** — dashboards, admin panels, analytics tools, CRM, project management (Notion, Linear, Airtable, HubSpot)
- **Internal Tools / Enterprise Apps** — often built without design resources, highest ROI from usability testing
- **E-commerce / Marketplaces** — checkout flows, product browsing, search, filtering, trust signals
- **Developer Tools** — CLIs with web UIs, API dashboards, documentation platforms

**Good Fit:**
- **Marketing Sites / Landing Pages** — conversion optimization, credibility, visual polish
- **Content Platforms** — blogs, news sites, CMS — navigation, readability, accessibility

## Commands

| Command | Personas | Use Case |
|---------|:--------:|----------|
| `/uta:test` | 9 | Full parallel usability test |
| `/uta:test-quick` | 3 | Quick check (Scanner, Novice, UI Purist) |
| `/uta:test-persona [name]` | 1 | Deep dive from one perspective |
| `/uta:report` | — | Reformat or filter the last report |
| `/uta:compare` | — | Diff two test runs (fixed, regressed, persisted) |

## Installation

```bash
git clone https://github.com/Dekic648/user-testing-agents.git
cd user-testing-agents

# Install commands (enables /uta:* slash commands)
mkdir -p ~/.claude/commands/uta
cp commands/*.md ~/.claude/commands/uta/

# Install skills, agents, and scoring
mkdir -p ~/.claude/uta
cp -r skills agents scoring ~/.claude/uta/
```

Then open any project in Claude Code and run `/uta:test`.

## Domain Configuration

For product-specific testing, create a `domain.md` in your project root:

```markdown
## Product Under Test
Product name: [name]
What it does: [one sentence]
Tech stack: [React, Next.js, etc.]

## Core Tasks to Test
1. Primary task: [e.g., "Create a chart and export as PDF"]
2. First-time task: [e.g., "Make first chart with sample data"]
3. Power user task: [e.g., "Customize axes, add reference lines, bulk export"]

## Red Routes (Critical User Journeys)
1. New user -> create first chart -> export
2. Returning user -> open saved chart -> modify -> re-export

## Design System
Base spacing unit: 8px
Type scale: 12/14/16/20/24/32
```

Personas adapt their tasks, the Userfocus framework uses your Red Routes for severity classification, and the UI Purist uses your design system as the benchmark.

## Report Persistence

Reports save to `.uta/reports/` in the tested project (timestamped). Run `/uta:compare` to see what improved, regressed, or persisted between runs.

## Architecture

```
user-testing-agents/
├── agents/orchestrator.md           # Flow discovery, parallel launch, cross-validation, synthesis
├── skills/                          # 9 persona agents
│   ├── scanner/skill.md             # Satisficer (Simon, Krug, Nielsen)
│   ├── deliberator/skill.md         # Maximizer (Schwartz, Pask)
│   ├── rushing-pragmatist/skill.md  # Time-pressured (Maule & Hockey)
│   ├── novice/skill.md              # First-timer (Dreyfus, Norman)
│   ├── power-user/skill.md          # Expert (Shneiderman, Fitts)
│   ├── distracted-multitasker/skill.md  # Interrupted (Altmann & Trafton)
│   ├── accessibility-user/skill.md  # Keyboard/SR (WCAG 2.1)
│   ├── skeptical-evaluator/skill.md # Trust evaluator (Fogg)
│   └── ui-purist/skill.md           # Visual critic (Tractinsky, Gestalt)
├── scoring/composite-model.md       # 5-dimension scoring + Userfocus decision tree
├── commands/                        # 5 slash commands
├── domain.md                        # Product context template
└── .claude-plugin/                  # Plugin manifest
```

## MCP Server

Use UTA from any MCP-compatible client (Claude Desktop, Cursor, VS Code, Windsurf):

```bash
cd mcp-server && npm install && npm run build
```

Add to your client config:
```json
{
  "mcpServers": {
    "uta": {
      "command": "node",
      "args": ["/path/to/user-testing-agents/mcp-server/dist/index.js"]
    }
  }
}
```

See [mcp-server/README.md](mcp-server/README.md) for full documentation.

## Roadmap

- [x] **MCP Server** — expose UTA as tools for any MCP-compatible client
- [ ] **CI/CD Integration** — run usability tests as part of your build pipeline
- [ ] **Severity Calibration** — tune scoring formulas based on battle-test data
- [ ] **Custom Personas** — define your own behavioral archetypes for domain-specific testing
- [ ] **Web App** — paste a URL, get a usability report (browser-based testing)

## License

MIT
