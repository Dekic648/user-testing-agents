import { loadPersona, loadAllPersonas, loadScoringModel, loadOrchestrator } from "./personas.js";

export function buildPersonaTestPrompt(personaId: string, scope: string, domainContext: string): string {
  const persona = loadPersona(personaId);
  if (!persona) return `Error: Unknown persona "${personaId}"`;

  const scoringModel = loadScoringModel();

  return `You are the **${persona.name}** — a behavioral usability tester.

## Your Persona Definition

${persona.skillContent}

## Test Scope

${scope}

## Domain Context

${domainContext || "No domain configuration provided. Infer tasks from the codebase."}

## Scoring Framework

${scoringModel}

## Your Task

Walk through the product as your persona would. Trace actual code paths — read components, follow handlers, check state flows, verify outputs. Produce your Persona Test Report using the exact format defined in your persona definition above.

Score all 5 dimensions using the UTA Composite Usability Model. Apply your persona-specific weight adjustments. Classify every issue using the Userfocus 3-question decision tree. Be specific — file paths, line numbers, handler names.

Complete your Mandatory Audit Checklist. Every item must be checked.`;
}

export function buildFullTestPrompt(scope: string, domainContext: string): string {
  const orchestrator = loadOrchestrator();
  const personas = loadAllPersonas();
  const scoringModel = loadScoringModel();

  const personaSummary = personas
    .map((p, i) => `${i + 1}. **${p.name}** (${p.archetype}): ${p.description}`)
    .join("\n");

  return `You are the UTA Orchestrator. Your job is to coordinate 9 behavioral persona agents running in parallel to test a product's usability.

## Orchestrator Instructions

${orchestrator}

## Test Scope

${scope}

## Domain Context

${domainContext || "No domain configuration provided. Infer tasks from the codebase."}

## The 9 Personas

${personaSummary}

## Scoring Framework

${scoringModel}

## Execution

Follow the orchestrator instructions exactly:
1. Run Flow Discovery on the test scope
2. Distribute flows across personas
3. Launch all 9 persona agents in parallel using the Agent tool
4. For each persona, use this prompt structure (filling in persona-specific content):
   - Their full persona skill definition
   - The test scope
   - Domain context
   - Scoring framework
   - Their assigned flows from coverage distribution
5. Collect all 9 reports
6. Run the synthesis protocol: deduplicate, cross-validate, score, classify, rank
7. Produce the unified UTA Composite Usability Report
8. Save to .uta/reports/`;
}

export function buildQuickTestPrompt(scope: string, domainContext: string): string {
  const orchestrator = loadOrchestrator();
  const scoringModel = loadScoringModel();

  const quickPersonas = ["scanner", "novice", "ui-purist"];
  const personas = quickPersonas.map((id) => loadPersona(id)!).filter(Boolean);

  const personaSummary = personas
    .map((p, i) => `${i + 1}. **${p.name}** (${p.archetype}): ${p.description}`)
    .join("\n");

  return `You are the UTA Orchestrator running in **Quick Mode**. Launch only 3 personas for maximum dimension coverage in minimum time.

## Orchestrator Instructions

${orchestrator}

## Quick Mode — 3 Personas Only

${personaSummary}

These 3 cover: Effectiveness (Scanner), Learnability (Novice), Craft (UI Purist), with secondary coverage of Efficiency and Satisfaction.

## Test Scope

${scope}

## Domain Context

${domainContext || "No domain configuration provided. Infer tasks from the codebase."}

## Scoring Framework

${scoringModel}

## Execution

Follow the orchestrator instructions in Quick Mode:
1. Run Flow Discovery on the test scope
2. Launch only Scanner, Novice, and UI Purist in parallel
3. Collect 3 reports
4. Run synthesis: deduplicate, cross-validate, score, classify, rank
5. Produce unified report (same format, 3 personas instead of 9)
6. Save to .uta/reports/`;
}
