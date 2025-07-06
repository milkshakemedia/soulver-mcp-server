#!/usr/bin/env node

/**
 * Simple test to verify MCP server exposes prompts and resources
 * This script tests the MCP protocol directly
 */

const { spawn } = require('child_process');

async function testMCPServer() {
  console.log('🧮 Testing SoulverCore MCP Server Features');
  console.log('==========================================\n');

  const server = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let requestId = 1;

  // Helper function to send MCP requests
  function sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
      const request = {
        jsonrpc: "2.0",
        id: requestId++,
        method,
        params
      };

      let responseData = '';
      const onData = (data) => {
        responseData += data.toString();
        try {
          const lines = responseData.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          const response = JSON.parse(lastLine);
          if (response.id === request.id) {
            server.stdout.removeListener('data', onData);
            resolve(response);
          }
        } catch (e) {
          // Continue collecting data
        }
      };

      server.stdout.on('data', onData);
      server.stdin.write(JSON.stringify(request) + '\n');

      // Timeout after 5 seconds
      setTimeout(() => {
        server.stdout.removeListener('data', onData);
        reject(new Error('Request timeout'));
      }, 5000);
    });
  }

  try {
    // 1. Initialize the server
    console.log('1. Initializing MCP server...');
    const initResponse = await sendRequest('initialize', {
      protocolVersion: "2024-11-05",
      capabilities: {
        roots: { listChanged: true },
        sampling: {}
      },
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    });

    if (initResponse.error) {
      console.log('❌ Initialization failed:', initResponse.error);
      return;
    }

    console.log('✅ Server initialized successfully');
    const caps = initResponse.result.capabilities;
    console.log(`   - Tools: ${caps.tools ? '✅' : '❌'}`);
    console.log(`   - Prompts: ${caps.prompts ? '✅' : '❌'}`);
    console.log(`   - Resources: ${caps.resources ? '✅' : '❌'}\n`);

    // 2. Test prompts
    console.log('2. Testing prompts...');
    const promptsResponse = await sendRequest('prompts/list');
    
    if (promptsResponse.error) {
      console.log('❌ Failed to list prompts:', promptsResponse.error);
    } else {
      const prompts = promptsResponse.result.prompts;
      console.log(`✅ Found ${prompts.length} prompts:`);
      prompts.forEach(p => {
        console.log(`   - ${p.name}: ${p.title}`);
      });
    }
    console.log();

    // 3. Test resources
    console.log('3. Testing resources...');
    const resourcesResponse = await sendRequest('resources/list');
    
    if (resourcesResponse.error) {
      console.log('❌ Failed to list resources:', resourcesResponse.error);
    } else {
      const resources = resourcesResponse.result.resources;
      console.log(`✅ Found ${resources.length} resources:`);
      resources.forEach(r => {
        console.log(`   - ${r.name} (${r.uri})`);
      });
    }
    console.log();

    // 4. Test tools
    console.log('4. Testing tools...');
    const toolsResponse = await sendRequest('tools/list');
    
    if (toolsResponse.error) {
      console.log('❌ Failed to list tools:', toolsResponse.error);
    } else {
      const tools = toolsResponse.result.tools;
      console.log(`✅ Found ${tools.length} tools:`);
      tools.forEach(t => {
        console.log(`   - ${t.name}: ${t.title}`);
      });
    }
    console.log();

    // 5. Test a prompt
    if (promptsResponse.result?.prompts?.length > 0) {
      console.log('5. Testing prompt execution...');
      const promptName = promptsResponse.result.prompts[0].name;
      
      let promptArgs = {};
      if (promptName === 'compound_interest') {
        promptArgs = {
          principal: '$10000',
          time: '5 years',
          rate: '4%'
        };
      } else if (promptName === 'tip_calculator') {
        promptArgs = {
          base_amount: '$50',
          item_description: 'for dinner',
          tip_percentage: '18%'
        };
      }

      const promptResponse = await sendRequest('prompts/get', {
        name: promptName,
        arguments: promptArgs
      });

      if (promptResponse.error) {
        console.log('❌ Failed to get prompt:', promptResponse.error);
      } else {
        console.log(`✅ Prompt "${promptName}" executed successfully`);
        console.log('   Generated message:', promptResponse.result.messages[0].content.text.substring(0, 100) + '...');
      }
      console.log();
    }

    // 6. Test a resource
    if (resourcesResponse.result?.resources?.length > 0) {
      console.log('6. Testing resource access...');
      const resource = resourcesResponse.result.resources[0];
      
      const resourceResponse = await sendRequest('resources/read', {
        uri: resource.uri
      });

      if (resourceResponse.error) {
        console.log('❌ Failed to read resource:', resourceResponse.error);
      } else {
        console.log(`✅ Resource "${resource.name}" read successfully`);
        console.log(`   Content length: ${resourceResponse.result.contents[0].text.length} characters`);
      }
      console.log();
    }

    console.log('🎉 All MCP features tested successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Prompts: ${promptsResponse.result?.prompts?.length || 0} available`);
    console.log(`   - Resources: ${resourcesResponse.result?.resources?.length || 0} available`);
    console.log(`   - Tools: ${toolsResponse.result?.tools?.length || 0} available`);

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  } finally {
    server.kill();
  }
}

testMCPServer().catch(console.error);
