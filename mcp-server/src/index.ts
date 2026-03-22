#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  loadAllPersonas,
  loadPersona,
  loadScoringModel,
  loadDomainTemplate,
  loadOrchestrator,
  getPersonaIds,
  getPersonaSummaries,
} from "./personas.js";
import {
  buildFullTestPrompt,
  buildQuickTestPrompt,
  buildPersonaTestPrompt,
} from "./prompts.js";

const server = new McpServer({
  name: "User Testing Agents",
  version: "1.0.0",
});

// ─── Tools ───────────────────────────────────────────────────────────

server.tool(
  "uta_test",
  "Run a full 9-persona parallel usability test. Returns the orchestrator prompt with all persona definitions, scoring framework, and instructions. The AI client should execute this as an orchestrated multi-agent session.",
  {
    scope: z.string().describe("What to test: a directory path, feature name, or 'test everything'"),
    domain_context: z.string().optional().describe("Optional domain.md content for product-specific testing. Use uta://domain-template resource to get the template."),
  },
  async ({ scope, domain_context }) => {
    const prompt = buildFullTestPrompt(scope, domain_context || "");
    return {
      content: [{ type: "text", text: prompt }],
    };
  }
);

server.tool(
  "uta_test_quick",
  "Run a quick 3-persona usability test (Scanner, Novice, UI Purist) for maximum dimension coverage in minimum time.",
  {
    scope: z.string().describe("What to test: a directory path, feature name, or 'test everything'"),
    domain_context: z.string().optional().describe("Optional domain.md content for product-specific testing."),
  },
  async ({ scope, domain_context }) => {
    const prompt = buildQuickTestPrompt(scope, domain_context || "");
    return {
      content: [{ type: "text", text: prompt }],
    };
  }
);

server.tool(
  "uta_test_persona",
  `Run a single persona usability test for deep testing from one behavioral perspective. Valid personas: ${getPersonaIds().join(", ")}`,
  {
    persona: z.string().describe(`Persona ID. One of: ${getPersonaIds().join(", ")}`),
    scope: z.string().describe("What to test: a directory path, feature name, or 'test everything'"),
    domain_context: z.string().optional().describe("Optional domain.md content for product-specific testing."),
  },
  async ({ persona, scope, domain_context }) => {
    if (!getPersonaIds().includes(persona)) {
      return {
        content: [{
          type: "text",
          text: `Unknown persona "${persona}". Valid options: ${getPersonaIds().join(", ")}`,
        }],
        isError: true,
      };
    }

    const prompt = buildPersonaTestPrompt(persona, scope, domain_context || "");
    return {
      content: [{ type: "text", text: prompt }],
    };
  }
);

server.tool(
  "uta_list_personas",
  "List all 9 behavioral personas with their archetypes and descriptions.",
  {},
  async () => {
    const summaries = getPersonaSummaries();
    const table = summaries
      .map((p, i) => `${i + 1}. **${p.name}** (${p.archetype})\n   ${p.description}`)
      .join("\n\n");

    return {
      content: [{
        type: "text",
        text: `# UTA Behavioral Personas\n\n${table}\n\nUse \`uta_test_persona\` with the persona ID to run a single persona test.\nUse \`uta_test\` to run all 9 in parallel.`,
      }],
    };
  }
);

// ─── Resources ───────────────────────────────────────────────────────

// Scoring model
server.resource(
  "scoring-model",
  "uta://scoring-model",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: "text/markdown",
      text: loadScoringModel(),
    }],
  })
);

// Domain template
server.resource(
  "domain-template",
  "uta://domain-template",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: "text/markdown",
      text: loadDomainTemplate(),
    }],
  })
);

// Orchestrator
server.resource(
  "orchestrator",
  "uta://orchestrator",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: "text/markdown",
      text: loadOrchestrator(),
    }],
  })
);

// Individual persona resources
const personaIds = getPersonaIds();
for (const id of personaIds) {
  server.resource(
    `persona-${id}`,
    `uta://persona/${id}`,
    async (uri) => {
      const persona = loadPersona(id);
      if (!persona) {
        return {
          contents: [{
            uri: uri.href,
            mimeType: "text/plain",
            text: `Persona "${id}" not found.`,
          }],
        };
      }
      return {
        contents: [{
          uri: uri.href,
          mimeType: "text/markdown",
          text: persona.skillContent,
        }],
      };
    }
  );
}

// All personas overview
server.resource(
  "personas-overview",
  "uta://personas",
  async (uri) => {
    const personas = loadAllPersonas();
    const overview = personas
      .map((p) => `## ${p.name} (${p.archetype})\n\n${p.description}\n\n**Resource:** \`uta://persona/${p.id}\``)
      .join("\n\n---\n\n");

    return {
      contents: [{
        uri: uri.href,
        mimeType: "text/markdown",
        text: `# UTA Personas Overview\n\n${overview}`,
      }],
    };
  }
);

// ─── Start Server ────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
