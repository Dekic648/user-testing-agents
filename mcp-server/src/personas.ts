import { readFileSync } from "fs";
import { join } from "path";

export interface Persona {
  id: string;
  name: string;
  archetype: string;
  description: string;
  skillContent: string;
}

const PERSONA_DEFS: Array<{ id: string; name: string; archetype: string; description: string }> = [
  { id: "scanner", name: "Scanner", archetype: "Satisficer", description: "Skims, clicks first CTA, never reads. Tests visual hierarchy and first-click success." },
  { id: "deliberator", name: "Deliberator", archetype: "Maximizer", description: "Reads everything, compares all options. Tests information completeness and reversibility." },
  { id: "rushing-pragmatist", name: "Rushing Pragmatist", archetype: "Time-Pressured", description: "3 minutes, zero friction tolerance. Tests speed, step count, and output quality." },
  { id: "novice", name: "Novice", archetype: "First-Timer", description: "No mental model, scared by jargon. Tests onboarding, learnability, and empty states." },
  { id: "power-user", name: "Power User", archetype: "Expert", description: "Wants shortcuts, bulk ops, customization. Tests efficiency and advanced features." },
  { id: "distracted-multitasker", name: "Distracted Multitasker", archetype: "Interrupted", description: "12 tabs, leaves mid-task, returns later. Tests state persistence and autosave." },
  { id: "accessibility-user", name: "Accessibility User", archetype: "Keyboard/Screen Reader", description: "Keyboard-only, screen reader dependent. Tests ARIA, focus, contrast, semantics." },
  { id: "skeptical-evaluator", name: "Skeptical Evaluator", archetype: "Adoption Judge", description: "Evaluating whether to adopt. Tests credibility, trust signals, and polish." },
  { id: "ui-purist", name: "UI Purist", archetype: "Visual Critic", description: "Judges every pixel. Tests spacing, typography, color system, and alignment." },
];

export function getSkillsDir(): string {
  return join(__dirname, "..", "..", "skills");
}

export function getScoringDir(): string {
  return join(__dirname, "..", "..", "scoring");
}

export function getAgentsDir(): string {
  return join(__dirname, "..", "..", "agents");
}

export function getRootDir(): string {
  return join(__dirname, "..", "..");
}

function loadSkillFile(personaId: string): string {
  const skillPath = join(getSkillsDir(), personaId, "skill.md");
  try {
    return readFileSync(skillPath, "utf-8");
  } catch {
    return `[Skill file not found: ${skillPath}]`;
  }
}

export function loadAllPersonas(): Persona[] {
  return PERSONA_DEFS.map((def) => ({
    ...def,
    skillContent: loadSkillFile(def.id),
  }));
}

export function loadPersona(id: string): Persona | undefined {
  const def = PERSONA_DEFS.find((d) => d.id === id);
  if (!def) return undefined;
  return { ...def, skillContent: loadSkillFile(def.id) };
}

export function loadScoringModel(): string {
  const scoringPath = join(getScoringDir(), "composite-model.md");
  try {
    return readFileSync(scoringPath, "utf-8");
  } catch {
    return "[Scoring model not found]";
  }
}

export function loadOrchestrator(): string {
  const orchestratorPath = join(getAgentsDir(), "orchestrator.md");
  try {
    return readFileSync(orchestratorPath, "utf-8");
  } catch {
    return "[Orchestrator not found]";
  }
}

export function loadDomainTemplate(): string {
  const domainPath = join(getRootDir(), "domain.md");
  try {
    return readFileSync(domainPath, "utf-8");
  } catch {
    return "[Domain template not found]";
  }
}

export function getPersonaIds(): string[] {
  return PERSONA_DEFS.map((d) => d.id);
}

export function getPersonaSummaries(): Array<{ id: string; name: string; archetype: string; description: string }> {
  return PERSONA_DEFS;
}
