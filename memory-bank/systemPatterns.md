# System Patterns - SoulverCore MCP Server

## MCP Architecture Pattern
```
MCP Host (Claude Desktop)
    ↓ JSON-RPC 2.0 over stdio
MCP Server (soulver-mcp-server)
    ↓ child_process.exec
Soulver CLI (soulver-cli)
    ↓ stdout/stderr
Mathematical Results
```

## Tool Registration Pattern
```typescript
server.registerTool(
  "tool_name",
  {
    title: "Display Name",
    description: "Tool description",
    inputSchema: { param: z.type() },
    annotations: {
      readOnlyHint: boolean,
      destructiveHint: boolean,
      idempotentHint: boolean,
      openWorldHint: boolean
    }
  },
  async (params) => {
    // Tool implementation
    return { content: [{ type: "text", text: result }] };
  }
);
```

## Error Handling Pattern
```typescript
// Structured error responses visible to LLM
return {
  isError: true,
  content: [{
    type: "text",
    text: `Error: ${error.message}`
  }]
};
```

## CLI Wrapper Pattern
```typescript
// Safe CLI execution with comprehensive error handling
const { stdout, stderr } = await execAsync(`soulver-cli "${sanitized}"`, {
  timeout: 10000,
  encoding: 'utf8',
  maxBuffer: 1024 * 1024
});
```

## Server Lifecycle Pattern
```typescript
async function main() {
  // 1. Validate dependencies
  const isInstalled = await checkSoulverCLI();
  
  // 2. Create transport
  const transport = new StdioServerTransport();
  
  // 3. Connect server
  await server.connect(transport);
  
  // 4. Handle graceful shutdown
  process.on('SIGINT', cleanup);
}
```

## Tool Annotation Strategy
- **readOnlyHint: true** - Mathematical calculations don't modify environment
- **destructiveHint: false** - Non-destructive operations
- **idempotentHint: true** - Same input produces same output
- **openWorldHint: false** - No external API calls, purely computational

## Input Validation Strategy
1. **Schema Validation**: Zod schemas for type safety
2. **Sanitization**: Escape quotes to prevent command injection
3. **Length Limits**: Reasonable expression length constraints
4. **Empty Check**: Reject empty or whitespace-only expressions

## Process Management Strategy
- **Timeout**: 10-second limit prevents hanging processes
- **Buffer Limits**: 1MB output limit prevents memory issues
- **Error Classification**: Specific handling for ENOENT, SIGTERM, etc.
- **Resource Cleanup**: Automatic process cleanup on errors

## Development Patterns
- **TypeScript Strict Mode**: Full type safety
- **ES Modules**: Modern module system
- **Async/Await**: Clean asynchronous code
- **Error-First**: Comprehensive error handling
- **Test-Driven**: Comprehensive test suite with real expressions
