---
description: "Compare two UTA test runs to see what improved, regressed, or persisted — score deltas, fixed issues, new issues"
---

You are running a **UTA Compare** command.

## What This Does

Compares two test runs to show:
- **Fixed:** Issues present in the earlier run but absent in the later run
- **Regressed:** New issues not in the earlier run
- **Persisted:** Issues still present in both runs
- **Score deltas:** Per-persona and per-dimension score changes
- **Overall trajectory:** Is the product getting better or worse?

## How to Use

- "Compare latest two reports" — reads the two most recent files in `.uta/reports/`
- "Compare against [filename]" — compares the latest report against a named earlier report
- Paste a previous report directly for comparison

## Process

1. Read reports from `.uta/reports/` (sorted by timestamp)
2. Parse issue lists and scores from both reports
3. Match issues by file path + description (fuzzy match)
4. Compute deltas for each dimension and persona composite
5. Categorize changes: Fixed / Regressed / Persisted

## Output

```markdown
# UTA Comparison Report

**Earlier run:** [date] — Overall: [N]/100
**Later run:** [date] — Overall: [N]/100
**Delta:** [+/-N] ([improved/regressed/unchanged])

## Score Comparison

| Persona | Before | After | Delta |
|---------|:------:|:-----:|:-----:|
| Scanner | /100 | /100 | +/-N |
| ... | | | |
| **Overall** | **/100** | **/100** | **+/-N** |

## Dimension Trends

| Dimension | Before | After | Delta | Trend |
|-----------|:------:|:-----:|:-----:|:-----:|
| Effectiveness | /100 | /100 | +/-N | [up/down/flat] |
| ... | | | | |

## Fixed Issues (were broken, now resolved)
- [issue title] — was [severity], found by [personas]

## New Issues (regressions)
- [issue title] — [severity], found by [personas], at [file:line]

## Persisted Issues (still present)
- [issue title] — [severity], found by [personas]
```

If fewer than 2 reports exist in `.uta/reports/`, inform the user to run `/uta:test` at least twice.
