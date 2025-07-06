# Technical Context - SoulverCore MCP Server

## Technology Stack
- **Runtime**: Node.js 18.0.0+
- **Language**: TypeScript with ES2022 target
- **MCP SDK**: @modelcontextprotocol/sdk (official TypeScript SDK)
- **Validation**: Zod for input schema validation
- **Transport**: stdio (StdioServerTransport) for Claude Desktop
- **CLI Integration**: Node.js child_process for soulver-cli execution

## Dependencies
```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## External Requirements
- **Soulver CLI**: Standalone command-line tool (`brew install soulver-cli`)
- **Claude Desktop**: MCP host application for integration
- **macOS**: Primary target platform (Homebrew dependency)

## Architecture Pattern
- **MCP Server**: Uses official SDK's McpServer class
- **Tool Registration**: Modern registerTool() API with Zod schemas
- **Transport Layer**: stdio for local process communication
- **CLI Wrapper**: Promisified child_process.exec with error handling
- **Error Handling**: Structured responses using isError flag

## Build Configuration
- **TypeScript**: ES modules with strict type checking
- **Output**: Compiled to dist/ directory
- **Module System**: ESNext with Node.js resolution
- **Development**: Watch mode available for rapid iteration

## Security Measures
- Input sanitization to prevent command injection
- Process timeouts (10 seconds) to prevent hanging
- Buffer limits (1MB) to prevent memory exhaustion
- No external network requests (purely computational)

## Performance Characteristics
- **Startup Time**: ~100ms (CLI availability check)
- **Calculation Time**: Sub-second for typical expressions
- **Memory Usage**: Minimal (stateless operations)
- **Concurrency**: Single-threaded with async/await pattern
