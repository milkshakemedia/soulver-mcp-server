import { executeSoulverExpression, checkSoulverCLI, getSoulverCLIVersion } from "./soulver-cli.js";

/**
 * Test suite for SoulverCore MCP Server
 * Tests the example expressions from the project requirements
 */

// Test expressions from the memory bank
const testExpressions = [
  "$25k over 10 years at 7.5%",
  "January 30 2020 + 3 months 2 weeks 5 days",
  "$25/hour * 14 hours of work",
  "$150 is 25% on what",
  "40 as % of 90",
  "65 kg in pounds",
  // Additional test cases
  "100 + 200",
  "50% of 200",
  "10 miles in km",
  "32 fahrenheit in celsius"
];

async function runTests() {
  console.log("🧮 SoulverCore MCP Server Test Suite");
  console.log("=====================================\n");

  // Check CLI availability
  console.log("1. Checking Soulver CLI availability...");
  const isInstalled = await checkSoulverCLI();
  
  if (!isInstalled) {
    console.error("❌ Soulver CLI not found!");
    console.error("Please install with: brew install soulver-cli");
    process.exit(1);
  }

  const version = await getSoulverCLIVersion();
  console.log(`✅ Soulver CLI is available${version ? ` (${version})` : ''}\n`);

  // Test expressions
  console.log("2. Testing mathematical expressions...\n");
  
  let passed = 0;
  let failed = 0;

  for (const expression of testExpressions) {
    try {
      console.log(`Testing: "${expression}"`);
      const startTime = Date.now();
      const result = await executeSoulverExpression(expression);
      const duration = Date.now() - startTime;
      
      console.log(`✅ Result: ${result} (${duration}ms)`);
      passed++;
    } catch (error: any) {
      console.log(`❌ Error: ${error.message}`);
      failed++;
    }
    console.log(); // Empty line for readability
  }

  // Summary
  console.log("=====================================");
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log(`Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed > 0) {
    console.log("\n⚠️  Some tests failed. This might be due to:");
    console.log("- Soulver CLI version differences");
    console.log("- Expression syntax variations");
    console.log("- Missing currency data or other dependencies");
    process.exit(1);
  } else {
    console.log("\n🎉 All tests passed! SoulverCore MCP Server is ready to use.");
  }
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

// Run tests
runTests().catch((error) => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
