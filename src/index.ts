#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { resourceHandlers } from './handlers/resources.js';
import { toolHandlers } from './handlers/tools.js';
import {
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

class AnscServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'ansc-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {}
        },
      }
    );

    this.setupHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers() {
    // Resource handlers
    this.server.setRequestHandler(
      ListResourcesRequestSchema,
      resourceHandlers.listResources
    );

    this.server.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      resourceHandlers.listResourceTemplates
    );

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      resourceHandlers.readResource
    );

    // Tool handlers
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      toolHandlers.listTools
    );

    this.server.setRequestHandler(
      CallToolRequestSchema,
      toolHandlers.callTool
    );
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ANSC MCP server running on stdio');
  }
}

// Start the server
const server = new AnscServer();
server.run().catch(console.error);