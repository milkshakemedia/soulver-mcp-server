# SoulverCore MCP Server Project Brief

## Project Overview
Create a Model Context Protocol (MCP) server that integrates SoulverCore's natural language math evaluation capabilities with Claude Desktop and other MCP hosts.

## Core Objective
Provide Claude with consistent, accurate evaluation of natural language mathematical expressions by offloading all math calculations to SoulverCore instead of relying on LLM arithmetic.

## Key Requirements
- Use standalone Soulver CLI (installable via `brew install soulver-cli`)
- Create lightweight MCP server that wraps the soulver-cli binary
- Expose single primary tool: `calculate(expression: string) -> result: string`
- Follow latest MCP specification using official TypeScript SDK
- Support stdio transport for Claude Desktop integration

## Success Criteria
- Eliminates LLM arithmetic errors completely
- Provides standardized natural language math parsing
- Improves user trust in math-related conversations
- Integrates seamlessly with existing MCP ecosystem
- Sub-second response times for typical expressions

## Target Expressions
The server must handle complex natural language mathematical expressions including:
- Financial calculations: "$25k over 10 years at 7.5%"
- Date arithmetic: "January 30 2020 + 3 months 2 weeks 5 days"
- Unit conversions: "65 kg in pounds"
- Percentage calculations: "40 as % of 90"
- Mixed operations: "$25/hour * 14 hours of work"

## Deployment Model
- User installs soulver-cli via Homebrew
- User installs MCP server and adds to Claude Desktop config
- Claude automatically routes math expressions to SoulverCore
- Results integrated back into natural conversation flow
