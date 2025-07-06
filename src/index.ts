import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { executeSoulverExpression, checkSoulverCLI, getSoulverCLIVersion } from "./soulver-cli.js";
import { financialPrompts } from "./prompts/financial.js";
import { conversionPrompts } from "./prompts/conversions.js";
import { datePrompts } from "./prompts/dates.js";
import { syntaxGuideResources } from "./resources/syntax-guide.js";
import { exampleResources } from "./resources/examples.js";

/**
 * SoulverCore MCP Server
 * Provides natural language mathematical expression evaluation using SoulverCore
 */

// Create MCP server instance with capabilities
const server = new McpServer({
  name: "soulver-mcp-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {},
    prompts: {
      listChanged: true
    },
    resources: {
      subscribe: false,
      listChanged: true
    }
  }
});

// Register the calculate tool with comprehensive annotations
server.registerTool(
  "calculate",
  {
    title: "SoulverCore Calculator",
    description: "Evaluate natural language mathematical expressions using SoulverCore. Supports complex calculations, unit conversions, date arithmetic, percentages, and financial calculations.",
    inputSchema: {
      expression: z.string().describe("Natural language math expression to evaluate (e.g., '$25k over 10 years at 7.5%', '65 kg in pounds', '$25/hour * 14 hours')")
    },
    annotations: {
      readOnlyHint: true,        // Tool doesn't modify environment
      destructiveHint: false,    // Tool is non-destructive
      idempotentHint: true,      // Same input produces same output
      openWorldHint: false       // No external API calls, purely computational
    }
  },
  async ({ expression }) => {
    try {
      const result = await executeSoulverExpression(expression);
      return {
        content: [{
          type: "text",
          text: result
        }]
      };
    } catch (error: any) {
      // Return structured error response that the LLM can see and handle
      return {
        isError: true,
        content: [{
          type: "text",
          text: `Error evaluating expression "${expression}": ${error.message}`
        }]
      };
    }
  }
);

// Optional: Register a diagnostic tool to check Soulver CLI status
server.registerTool(
  "soulver_status",
  {
    title: "Soulver CLI Status",
    description: "Check if Soulver CLI is installed and get version information",
    inputSchema: {},
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  async () => {
    try {
      const isInstalled = await checkSoulverCLI();
      if (!isInstalled) {
        return {
          content: [{
            type: "text",
            text: "Soulver CLI is not installed. Please install with: brew install soulver-cli"
          }]
        };
      }

      const version = await getSoulverCLIVersion();
      return {
        content: [{
          type: "text",
          text: `Soulver CLI is installed${version ? ` (version: ${version})` : ''} and ready to use.`
        }]
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [{
          type: "text",
          text: `Error checking Soulver CLI status: ${error.message}`
        }]
      };
    }
  }
);

// Register all prompts
function registerPrompts() {
  // Financial prompts
  server.registerPrompt(
    "compound_interest",
    {
      title: "Compound Interest Calculator",
      description: "Calculate compound interest using SoulverCore syntax: '$amount over time at rate%'",
      argsSchema: {
        principal: z.string().describe("Principal amount with currency symbol (e.g., '$25k', '$10000')"),
        time: z.string().describe("Time period (e.g., '10 years', '5 years')"),
        rate: z.string().describe("Interest rate with % symbol (e.g., '7.5%', '5%')")
      }
    },
    ({ principal, time, rate }) => {
      const expression = `${principal} over ${time} at ${rate}`;
      return {
        messages: [{
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Calculate compound interest for:
Principal: ${principal}
Time: ${time}
Rate: ${rate}

SoulverCore expression: ${expression}`
          }
        }]
      };
    }
  );

  server.registerPrompt(
    "tip_calculator",
    {
      title: "Tip Calculator",
      description: "Calculate total cost including tip using SoulverCore syntax",
      argsSchema: {
        base_amount: z.string().describe("Base amount with currency (e.g., '$10', '$25.50')"),
        item_description: z.string().describe("What the amount is for (e.g., 'for lunch', 'for dinner')"),
        tip_percentage: z.string().describe("Tip percentage (e.g., '15%', '20%')")
      }
    },
    ({ base_amount, item_description, tip_percentage }) => {
      const expression = `${base_amount} ${item_description} + ${tip_percentage} tip`;
      return {
        messages: [{
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Calculate total cost with tip:
Base: ${base_amount} ${item_description}
Tip: ${tip_percentage}

SoulverCore expression: ${expression}`
          }
        }]
      };
    }
  );

  server.registerPrompt(
    "weight_conversion",
    {
      title: "Weight Conversion",
      description: "Convert between weight units using SoulverCore syntax: 'value unit in target_unit'",
      argsSchema: {
        value: z.string().describe("Weight value (e.g., '65', '150')"),
        from_unit: z.string().describe("Source unit (e.g., 'kg', 'pounds', 'lbs', 'grams')"),
        to_unit: z.string().describe("Target unit (e.g., 'pounds', 'kg', 'lbs', 'grams')")
      }
    },
    ({ value, from_unit, to_unit }) => {
      const expression = `${value} ${from_unit} in ${to_unit}`;
      return {
        messages: [{
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Convert weight:
Value: ${value}
From: ${from_unit}
To: ${to_unit}

SoulverCore expression: ${expression}`
          }
        }]
      };
    }
  );

  server.registerPrompt(
    "date_addition",
    {
      title: "Date Addition",
      description: "Add time periods to dates using SoulverCore syntax: 'date + period'",
      argsSchema: {
        start_date: z.string().describe("Starting date (e.g., 'January 30 2020', 'March 15 2023')"),
        time_period: z.string().describe("Time period to add (e.g., '3 months 2 weeks 5 days', '1 year', '6 months')")
      }
    },
    ({ start_date, time_period }) => {
      const expression = `${start_date} + ${time_period}`;
      return {
        messages: [{
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Calculate future date:
Start Date: ${start_date}
Add: ${time_period}

SoulverCore expression: ${expression}`
          }
        }]
      };
    }
  );

  server.registerPrompt(
    "percentage_calculation",
    {
      title: "Percentage Calculator",
      description: "Calculate percentages using proper SoulverCore syntax",
      argsSchema: {
        calculation_type: z.enum(["percent_of", "what_percent", "percent_on"]).describe("Type: 'percent_of' (X% of Y), 'what_percent' (X as % of Y), 'percent_on' (X is Y% on what)"),
        value1: z.string().describe("First value (number or percentage)"),
        value2: z.string().describe("Second value (number or percentage)")
      }
    },
    ({ calculation_type, value1, value2 }) => {
      let expression: string;
      let description: string;
      
      switch (calculation_type) {
        case "percent_of":
          expression = `${value1} of ${value2}`;
          description = `Calculate ${value1} of ${value2}`;
          break;
        case "what_percent":
          expression = `${value1} as % of ${value2}`;
          description = `Find what percentage ${value1} is of ${value2}`;
          break;
        case "percent_on":
          expression = `${value2} is ${value1} on what`;
          description = `Find the base value where ${value2} is ${value1}`;
          break;
      }
      
      return {
        messages: [{
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `${description}:

SoulverCore expression: ${expression}`
          }
        }]
      };
    }
  );
}

// Register all resources
function registerResources() {
  // Syntax guide resources
  Object.values(syntaxGuideResources).forEach(resource => {
    server.registerResource(
      resource.name,
      resource.uri,
      {
        title: resource.title,
        description: resource.description,
        mimeType: resource.mimeType
      },
      async (uri) => ({
        contents: [{
          uri: uri.href,
          name: resource.name,
          title: resource.title,
          mimeType: resource.mimeType,
          text: resource.content
        }]
      })
    );
  });

  // Example resources
  Object.values(exampleResources).forEach(resource => {
    server.registerResource(
      resource.name,
      resource.uri,
      {
        title: resource.title,
        description: resource.description,
        mimeType: resource.mimeType
      },
      async (uri) => ({
        contents: [{
          uri: uri.href,
          name: resource.name,
          title: resource.title,
          mimeType: resource.mimeType,
          text: resource.content
        }]
      })
    );
  });
}

/**
 * Main function to start the MCP server
 */
async function main() {
  try {
    // Register all prompts and resources before starting the server
    registerPrompts();
    registerResources();
    
    // Check if Soulver CLI is available on startup (silently)
    const isInstalled = await checkSoulverCLI();
    if (!isInstalled) {
      // Write to stderr instead of stdout to avoid interfering with JSON-RPC
      process.stderr.write("Warning: Soulver CLI not found. Please install with: brew install soulver-cli\n");
      process.stderr.write("The server will start but calculations will fail until Soulver CLI is installed.\n");
    }

    // Create stdio transport for Claude Desktop integration
    const transport = new StdioServerTransport();
    
    // Connect server to transport
    await server.connect(transport);
    
    // Server started successfully (no console output to avoid JSON-RPC interference)
  } catch (error) {
    process.stderr.write(`Failed to start SoulverCore MCP Server: ${error}\n`);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  process.stderr.write("Shutting down SoulverCore MCP Server...\n");
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.stderr.write("Shutting down SoulverCore MCP Server...\n");
  process.exit(0);
});

// Start the server
main().catch((error) => {
  process.stderr.write(`Unhandled error: ${error}\n`);
  process.exit(1);
});
