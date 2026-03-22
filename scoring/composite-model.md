# UTA Composite Usability Model

This document defines the scoring framework used by all persona agents. It is injected into every persona as context. Persona agents use these definitions to score their findings consistently.

## 5 Scoring Dimensions

### 1. Effectiveness (default weight: 25%)

**What it measures:** Can the user complete the task? How many errors do they hit?

**Sub-metrics:**

- **Completion Rate (0-100%):** Percentage of task steps the persona can complete without hitting a blocker. A blocker is any state where the user cannot proceed without external help, workaround knowledge, or a page refresh.

- **Error Count:** Raw count of errors encountered, classified as:
  - **Critical:** Blocks the task entirely. The user cannot proceed. Examples: handler returns early, button does nothing, navigation leads to 404, required data is missing with no fallback
  - **Friction:** Slows the user down or causes confusion but doesn't block completion. Examples: misleading label, unexpected behavior, extra steps required, poor error message
  - **Cosmetic:** Annoying but doesn't affect task completion. Examples: typo in label, slightly off alignment, inconsistent capitalization

- **Dead-End Count:** States where the user has no clear path forward — no back button, no guidance, no error message, just a blank or stuck screen

**Scoring formula:**
```
Effectiveness = Completion Rate - (Critical * 15) - (Friction * 5) - (Cosmetic * 1)
Floor at 0. Cap at 100.
```

**Evidence required:** For each error, provide the file path, line number, what the user did, and what happened.

---

### 2. Efficiency (default weight: 20%)

**What it measures:** How much effort does the task require? How much is wasted?

**Sub-metrics:**

- **Step Count:** The number of discrete user actions (clicks, inputs, navigations) from entry point to task completion
  - Also record the **theoretical minimum** — the fewest possible steps if the user made zero wrong turns and knew the optimal path
  - Steps include: page loads, clicks, form inputs, dropdown selections, toggles, scrolls-to-find, tab switches

- **Wasted Effort:** Count of actions that led to dead-ends, backtracking, or confusion. These are steps the user took that contributed nothing to task completion
  - Examples: clicking the wrong tab, exploring a settings panel that doesn't have what they need, re-entering data after a failed submission with no state preservation

- **Shortcut Availability:** For power users — are keyboard shortcuts, bulk operations, or quick-access paths available?
  - Score: Available and discoverable (full credit) / Available but hidden (half credit) / Not available (no credit)

**Scoring formula:**
```
Efficiency = (minimum_steps / actual_steps) * 100 - (wasted_effort * 5)
Floor at 0. Cap at 100.
```

**Evidence required:** List each step in the journey trace. Mark which steps were wasted and why.

---

### 3. Learnability (default weight: 20%)

**What it measures:** Can a new user figure out the product without help?

**Sub-metrics:**

- **First-Use Success (Y/N):** Could a first-time user complete the task on their first attempt without external help, documentation, or trial-and-error beyond one wrong click?

- **Jargon Count:** Number of technical terms, abbreviations, or domain-specific words that a non-expert user would not understand
  - Only count jargon that is **not explained in context** (tooltip, inline help, label clarification)
  - Examples of jargon: "CSV", "JSON", "parse", "render", "API", "webhook", "regex", "schema"

- **Empty State Coverage:** Of all zero-data/first-time/empty states in the tested flow, how many provide guidance?
  - Score as: N covered / N total empty states
  - A covered empty state has: a message explaining what to do, a CTA to get started, or sample data

- **Progressive Disclosure:** Is complexity hidden until the user needs it?
  - Score: Complexity is well-staged (full credit) / Some complexity exposed too early (half credit) / Everything visible at once (no credit)

**Scoring formula:**
```
Learnability = 100
- (first_use_failure ? 30 : 0)
- (jargon_count * 5)
- (missing_empty_states * 10)
- (no_progressive_disclosure ? 15 : 0)
Floor at 0. Cap at 100.
```

**Evidence required:** List each jargon term found with its location. List each empty state and whether it's covered.

---

### 4. Satisfaction (default weight: 20%)

**What it measures:** How does the product feel to use?

Since we're simulating users (not surveying real ones), score satisfaction based on **observable UX signals** in the code and UI structure.

**Sub-metrics:**

- **Clarity (1-5):** Does the user understand what to do at each step without guessing?
  - 1 = "Completely lost — no idea what this screen wants from me"
  - 2 = "Confused — I can guess but I'm not sure"
  - 3 = "Adequate — I can figure it out with some effort"
  - 4 = "Clear — obvious what to do at most steps"
  - 5 = "Self-evident — every step is immediately obvious"

- **Confidence (1-5):** Would the user trust this tool for professional/important work?
  - 1 = "Feels broken — I wouldn't trust this with anything"
  - 2 = "Feels fragile — might work but I'd double-check everything"
  - 3 = "Adequate — seems to work but nothing reassures me"
  - 4 = "Professional — save indicators, confirmations, reliable behavior"
  - 5 = "Rock solid — undo available, clear feedback, everything works as expected"

- **Delight (1-5):** Are there moments that exceed expectations?
  - 1 = "Purely functional — does the job, nothing more"
  - 2 = "Slightly polished — one or two nice touches"
  - 3 = "Pleasant — consistent quality, good defaults"
  - 4 = "Impressive — smart features, thoughtful details"
  - 5 = "Exceptional — moments that make you say 'that's clever'"

- **Trust Signals:** Presence of:
  - Confirmation dialogs before destructive actions
  - Undo/revert capability
  - Auto-save indicators
  - Clear loading/progress states
  - Professional error messages (not stack traces)
  - Score: count of trust signals present vs. expected

**Scoring formula:**
```
Satisfaction = ((Clarity + Confidence + Delight) / 15) * 100
```

**Evidence required:** Justify each sub-score with specific observations from the code/UI.

---

### 5. Craft (default weight: 15%)

**What it measures:** Visual quality, consistency, and design system adherence.

**Sub-metrics:**

- **Spacing Consistency:** Are padding and margins uniform across similar components?
  - Count inconsistencies: same component type with different padding, uneven gaps between sections, mixed spacing scales (e.g., some 8px, some 12px, some 10px with no pattern)

- **Typography Hierarchy:** Is there a clear, consistent type scale?
  - Count violations: too many font sizes (more than 5-6 distinct sizes), inconsistent font weights for same hierarchy level, headings that don't create clear visual levels, body text competing with labels

- **Color System Adherence:** Do colors follow a coherent palette?
  - Count violations: one-off colors not in the design system, inconsistent use of brand colors, contrast failures (WCAG AA requires 4.5:1 for text, 3:1 for large text), competing accent colors

- **Alignment:** Do elements follow a grid? Are things lined up?
  - Count issues: elements that don't align with neighbors, inconsistent left margins, form labels misaligned with inputs, mixed alignment patterns (some centered, some left, with no system)

- **Component Consistency:** Does the same component look and behave the same everywhere?
  - Count inconsistencies: buttons styled differently in different contexts, input fields with varying heights/padding, cards with different border/shadow treatments, icons at inconsistent sizes

**Scoring formula:**
```
Craft = 100
- (spacing_issues * 3)
- (typography_violations * 5)
- (color_violations * 5)
- (alignment_issues * 3)
- (component_inconsistencies * 4)
Floor at 0. Cap at 100.
```

**Evidence required:** For each issue, specify the file, line, what's inconsistent, and what the expected consistent value should be.

---

## Persona-Specific Weight Adjustments

Not every persona weighs dimensions equally. Weights reflect what each behavioral archetype cares about most:

| Persona | Effectiveness | Efficiency | Learnability | Satisfaction | Craft |
|---------|:---:|:---:|:---:|:---:|:---:|
| **Default** | **25%** | **20%** | **20%** | **20%** | **15%** |
| Scanner | 30% | 25% | 15% | 20% | 10% |
| Deliberator | 20% | 15% | 25% | 25% | 15% |
| Rushing Pragmatist | 25% | 30% | 15% | 20% | 10% |
| Novice | 20% | 15% | 35% | 20% | 10% |
| Power User | 20% | 30% | 10% | 25% | 15% |
| Distracted Multitasker | 30% | 25% | 20% | 20% | 5% |
| Accessibility User | 30% | 20% | 20% | 20% | 10% |
| Skeptical Evaluator | 20% | 15% | 20% | 30% | 15% |
| UI Purist | 10% | 10% | 10% | 20% | 50% |

## Composite Score Formula

**Per-persona composite:**
```
Composite = (Effectiveness * w_eff) + (Efficiency * w_effi) + (Learnability * w_learn) + (Satisfaction * w_sat) + (Craft * w_craft)
```
Where `w_*` are the persona-specific weights from the table above.

**Overall product composite:**
```
Product Score = average of all persona composites
```

## Benchmarks

| Range | Rating | Interpretation |
|-------|--------|----------------|
| 90-100 | **Excellent** | Publication-quality. Minimal issues. Ship with confidence |
| 75-89 | **Good** | Professional, shippable. Minor friction to address |
| 60-74 | **Acceptable** | Works but needs iteration before scaling |
| 0-59 | **Poor** | Significant usability problems. Fix before shipping |

## Userfocus Severity Classification (Decision Tree)

In addition to the composite scoring above, every issue found by a persona must be classified using the Userfocus 3-question decision tree. This provides a second prioritization lens focused on real-world impact rather than dimensional scoring.

**Source:** Userfocus prioritisation framework (userfocus.co.uk), adapted for code-tracing usability testing.

### The 3 Questions

Apply these in order to each issue:

#### Q1: Is this issue on a Red Route?

Red routes are the most frequent or most critical user journeys. They are defined in `domain.md` under "Red Routes." If no red routes are defined, the primary task flow (entry point → core action → output) is the default red route.

- **YES** → This issue affects a critical journey. Proceed to Q2 with elevated baseline
- **NO** → This issue affects a secondary or edge-case flow. Proceed to Q2 with standard baseline

#### Q2: Is this issue hard for users to overcome?

Can the user work around this issue without external help, prior knowledge, or starting over?

- **SHOW-STOPPER** (no workaround exists — user is blocked):
  - On a Red Route → **Critical**
  - Not on a Red Route → **Serious**
- **WORKAROUND EXISTS** (user can proceed, but with extra effort or confusion):
  - Proceed to Q3

#### Q3: Is this issue persistent?

Does this issue occur once in a specific place, or does it recur across multiple flows, pages, or components?

- **PERSISTENT** (affects multiple flows/pages, or the pattern repeats throughout):
  - On a Red Route → **Serious**
  - Not on a Red Route → **Medium**
- **ONE-TIME** (isolated to one specific place):
  - On a Red Route → **Medium**
  - Not on a Red Route → **Low**

### Decision Tree Summary

```
Issue Found
├─ On Red Route?
│  ├─ YES
│  │  ├─ Show-stopper? → CRITICAL
│  │  ├─ Workaround + Persistent? → SERIOUS
│  │  └─ Workaround + One-time? → MEDIUM
│  └─ NO
│     ├─ Show-stopper? → SERIOUS
│     ├─ Workaround + Persistent? → MEDIUM
│     └─ Workaround + One-time? → LOW
```

### Severity Level Definitions

| Level | Definition | Implication |
|-------|-----------|-------------|
| **Critical** | Makes users unable or unwilling to complete a red route task. No workaround | Fix immediately — this is actively losing users |
| **Serious** | Significantly slows users down or forces workarounds. May be on red route or persistent | Fix soon — users can proceed but are frustrated |
| **Medium** | Causes frustration or confusion but doesn't block task completion. Isolated or on secondary flows | Fix in next iteration — noticeable but not urgent |
| **Low** | Quality or cosmetic issue. One-time occurrence on non-critical flow | Backlog — address when convenient |

### How Persona Agents Apply This

When reporting an issue, include the Userfocus classification:

```
**Userfocus severity:** [Critical / Serious / Medium / Low]
**Red route?:** [Yes — "route name from domain.md" / No]
**Hard to overcome?:** [Show-stopper: user is blocked / Workaround: "description of workaround"]
**Persistent?:** [Yes — affects N flows/pages / No — isolated to this location]
```

### Relationship to Composite Scoring

The composite scoring model (5 dimensions, 0-100) measures **how good the product is**. The Userfocus classification measures **how urgent each issue is to fix**. Both are reported — the orchestrator uses both when producing the Ranked Priorities.

---

## How Persona Agents Use This Document

1. Read this document at the start of every test session
2. Score each dimension using the sub-metrics and formulas defined above
3. Apply your persona-specific weights to compute your composite score
4. Classify every issue using the Userfocus 3-question decision tree
5. Include both dimension scores and Userfocus classification in your Persona Test Report
6. Do not invent new metrics — use only what's defined here for cross-persona comparability
