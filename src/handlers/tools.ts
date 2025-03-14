import { CallToolRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AnscClient } from '../api/ansc-client.js';
import { AppealSearchParams } from '../models/appeals.js';
import { DecisionSearchParams } from '../models/decisions.js';

const client = new AnscClient();

export const toolHandlers = {
  /**
   * List available tools
   */
  listTools: async () => ({
    tools: [
      {
        name: 'search_appeals',
        description: 'Search appeals with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            year: {
              type: 'number',
              description: 'Year to search in (defaults to current year)',
              minimum: 2000,
              maximum: 9999
            },
            authority: {
              type: 'string',
              description: 'Contracting authority name'
            },
            challenger: {
              type: 'string',
              description: 'Challenger name'
            },
            procedureNumber: {
              type: 'string',
              description: 'MTender OCDS ID (e.g., ocds-b3wdp1-MD-1740472744894)'
            },
            status: {
              type: 'number',
              description: 'Appeal status code (1-19)',
              minimum: 1,
              maximum: 19
            }
          }
        }
      },
      {
        name: 'search_decisions',
        description: 'Search decisions with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            year: {
              type: 'number',
              description: 'Year to search in (defaults to current year)',
              minimum: 2000,
              maximum: 9999
            },
            authority: {
              type: 'string',
              description: 'Contracting authority name'
            },
            challenger: {
              type: 'string',
              description: 'Challenger name'
            },
            procurementObject: {
              type: 'string',
              description: 'Object of the procurement'
            },
            decisionStatus: {
              type: 'array',
              items: {
                type: 'number',
                minimum: 1,
                maximum: 3
              },
              description: 'Array of decision status codes'
            },
            decisionContent: {
              type: 'array',
              items: {
                type: 'number',
                minimum: 1,
                maximum: 9
              },
              description: 'Array of decision content codes'
            },
            appealGrounds: {
              type: 'array',
              items: {
                type: 'number',
                minimum: 1,
                maximum: 42
              },
              description: 'Array of appeal grounds codes'
            },
            complaintObject: {
              type: 'number',
              enum: [1, 6],
              description: 'Complaint object code (1 or 6)'
            },
            appealNumber: {
              type: 'string',
              description: 'Appeal registration number (e.g., 02/279/25)'
            }
          }
        }
      }
    ]
  }),

  /**
   * Handle tool calls
   */
  callTool: async (request: typeof CallToolRequestSchema._type) => {
    switch (request.params.name) {
      case 'search_appeals':
        return handleSearchAppeals(request.params.arguments);
      case 'search_decisions':
        return handleSearchDecisions(request.params.arguments);
      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
    }
  }
};

/**
 * Handle search_appeals tool
 */
async function handleSearchAppeals(args: any) {
  try {
    const params: AppealSearchParams = {
      year: args.year,
      authority: args.authority,
      challenger: args.challenger,
      procedureNumber: args.procedureNumber,
      status: args.status
    };

    const appeals = await client.searchAppeals(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(appeals, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error searching appeals: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

/**
 * Handle search_decisions tool
 */
async function handleSearchDecisions(args: any) {
  try {
    const params: DecisionSearchParams = {
      year: args.year,
      authority: args.authority,
      challenger: args.challenger,
      procurementObject: args.procurementObject,
      decisionStatus: args.decisionStatus,
      decisionContent: args.decisionContent,
      appealGrounds: args.appealGrounds,
      complaintObject: args.complaintObject,
      appealNumber: args.appealNumber
    };

    const decisions = await client.searchDecisions(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(decisions, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error searching decisions: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}