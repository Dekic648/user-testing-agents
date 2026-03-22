# UTA MCP Server

MCP server for User Testing Agents. Exposes 9 behavioral persona agents as tools and resources for any MCP-compatible client.

## What It Provides

### Tools

| Tool | Description |
|------|-------------|
| `uta_test` | Full 9-persona parallel usability test |
| `uta_test_quick` | Quick 3-persona test (Scanner, Novice, UI Purist) |
| `uta_test_persona` | Single persona deep dive |
| `uta_list_personas` | List all 9 personas with descriptions |

### Resources

| Resource URI | Description |
|-------------|-------------|
| `uta://personas` | Overview of all 9 personas |
| `uta://persona/{id}` | Full persona definition (behavioral profile, signatures, checklist) |
| `uta://scoring-model` | 5-dimension composite usability model + Userfocus decision tree |
| `uta://domain-template` | Domain configuration template for product-specific testing |
| `uta://orchestrator` | Orchestrator instructions (flow discovery, synthesis, reporting) |

## Installation

### Build from source

```bash
cd mcp-server
npm install
npm run build
```

### Configure in Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "uta": {
      "command": "node",
      "args": ["/absolute/path/to/user-testing-agents/mcp-server/dist/index.js"]
    }
  }
}
```

### Configure in Claude Code

```bash
claude mcp add uta node /absolute/path/to/user-testing-agents/mcp-server/dist/index.js
```

### Configure in Cursor

Add to Cursor's MCP settings:

```json
{
  "uta": {
    "command": "node",
    "args": ["/absolute/path/to/user-testing-agents/mcp-server/dist/index.js"]
  }
}
```

## Usage

Once connected, you can:

1. **List personas:** Call `uta_list_personas` to see all 9 behavioral archetypes
2. **Run a full test:** Call `uta_test` with a scope like "test everything" or "/src/features/dashboard"
3. **Quick test:** Call `uta_test_quick` for a fast 3-persona check
4. **Single persona:** Call `uta_test_persona` with a specific persona ID
5. **Browse resources:** Read `uta://scoring-model` to understand the scoring framework, or `uta://persona/scanner` to see the Scanner's full definition

## How It Works

The MCP server loads persona definitions, the scoring framework, and orchestrator instructions from the parent UTA repo. When a tool is called, it assembles the complete prompt with all context and returns it to the AI client for execution.

The AI client (Claude Desktop, Cursor, etc.) then executes the multi-agent session using its own capabilities — reading files, tracing code, and producing the usability report.
