import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AnscClient } from '../api/ansc-client.js';

const client = new AnscClient();

export const resourceHandlers = {
  /**
   * List available resources
   */
  listResources: async () => ({
    resources: [
      {
        uri: `ansc://appeals/current-year`,
        name: 'Current year appeals',
        description: 'Appeals under review for the current year',
        mimeType: 'application/json'
      },
      {
        uri: `ansc://decisions/current-year`,
        name: 'Current year decisions',
        description: 'Decisions on appeals for the current year',
        mimeType: 'application/json'
      }
    ]
  }),

  /**
   * List available resource templates
   */
  listResourceTemplates: async () => ({
    resourceTemplates: [
      {
        uriTemplate: 'ansc://appeals/{year}',
        name: 'Appeals by year',
        description: 'Appeals under review for a specific year',
        mimeType: 'application/json'
      },
      {
        uriTemplate: 'ansc://decisions/{year}',
        name: 'Decisions by year',
        description: 'Decisions on appeals for a specific year',
        mimeType: 'application/json'
      }
    ]
  }),

  /**
   * Read a resource
   */
  readResource: async (request: { params: { uri: string } }) => {
    const uri = request.params.uri;

    // Static resources for current year
    if (uri === 'ansc://appeals/current-year') {
      const appeals = await client.searchAppeals({});
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(appeals, null, 2)
          }
        ]
      };
    }

    if (uri === 'ansc://decisions/current-year') {
      const decisions = await client.searchDecisions({});
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(decisions, null, 2)
          }
        ]
      };
    }

    // Dynamic resources by year
    const appealsMatch = uri.match(/^ansc:\/\/appeals\/(\d{4})$/);
    if (appealsMatch) {
      const year = parseInt(appealsMatch[1], 10);
      if (isNaN(year) || year < 2000 || year > 9999) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          'Invalid year. Must be between 2000 and 9999'
        );
      }

      const appeals = await client.searchAppeals({ year });
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(appeals, null, 2)
          }
        ]
      };
    }

    const decisionsMatch = uri.match(/^ansc:\/\/decisions\/(\d{4})$/);
    if (decisionsMatch) {
      const year = parseInt(decisionsMatch[1], 10);
      if (isNaN(year) || year < 2000 || year > 9999) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          'Invalid year. Must be between 2000 and 9999'
        );
      }

      const decisions = await client.searchDecisions({ year });
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(decisions, null, 2)
          }
        ]
      };
    }

    throw new McpError(
      ErrorCode.InvalidRequest,
      `Invalid resource URI: ${uri}`
    );
  }
};