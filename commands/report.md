---
description: "Regenerate, reformat, or filter the last UTA test report — show only critical issues, extract a single dimension, or reformat for export"
---

You are running a **UTA Report** command.

## What This Does

Works with the most recent UTA test report (saved in `.uta/reports/`) to:
- Regenerate the full unified report
- Filter to show only specific severity levels
- Extract scores for a single dimension
- Show findings from a specific persona
- Format for export (markdown table, Notion-friendly, presentation-ready)

## How to Use

- "Show just the critical issues"
- "Give me the scorecard only"
- "What did the Accessibility User find?"
- "Show me only Craft dimension scores"
- "Reformat the report as a table I can paste into Notion"
- "List all P0 fixes"
- "Show the full report for the Novice persona"

## Process

1. Read the most recent report from `.uta/reports/`
2. Parse the requested filter or format
3. Present the filtered/reformatted output

If no reports exist in `.uta/reports/`, inform the user to run `/uta:test` or `/uta:test-quick` first.
