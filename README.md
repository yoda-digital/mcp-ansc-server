# ANSC MCP Server

An MCP (Model Context Protocol) server for accessing Moldova's National Agency for the Resolution of Appeals (ANSC) data.

## Overview

This server provides access to the [ANSC](https://www.ansc.md/) website, allowing AI assistants to search and analyze appeals and decisions in the public procurement system of Moldova. It integrates with the MTender system through OCDS IDs, enabling cross-referencing between procurement procedures and their appeals.

## Features

### Search Tools

1. `search_appeals`
   - Search appeals under review with filters:
     * Year (defaults to current year)
     * Contracting Authority
     * Challenger
     * Procedure Number (OCDS ID)
     * Status
     * Page number (0-based, defaults to 0)
     * Results per page (defaults to 30)

2. `search_decisions`
   - Search decisions on appeals with filters:
     * Year (defaults to current year)
     * Contracting Authority
     * Challenger
     * Procurement Object
     * Decision Status
     * Decision Content
     * Appeal Grounds
     * Complaint Object
     * Appeal Number
     * Page number (0-based, defaults to 0)
     * Results per page (defaults to 30)

### Resources

- Static Resources:
  * `ansc://appeals/current-year[?page={page}]` - Appeals under review for the current year
  * `ansc://decisions/current-year[?page={page}]` - Decisions on appeals for the current year

- Resource Templates:
  * `ansc://appeals/{year}[?page={page}]` - Appeals under review for a specific year
  * `ansc://decisions/{year}[?page={page}]` - Decisions on appeals for a specific year

All resources and search results are paginated with 30 items per page.

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the server:
   ```bash
   npm run build
   ```
4. (Optional) Make the server globally available:
   ```bash
   npm link
   ```

## Usage

### Running the Server

```bash
node build/index.js
```

Or if you've linked it globally:

```bash
ansc-server
```

### Integration with MCP Clients

#### For VSCode with Cline:

1. Edit `/home/user/.config/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
2. Add the configuration:
   ```json
   {
     "mcpServers": {
       "ansc": {
         "command": "node",
         "args": ["/path/to/ansc-server/build/index.js"],
         "disabled": false,
         "alwaysAllow": []
       }
     }
   }
   ```
3. Restart VSCode

## Example Queries

Once the server is connected to your MCP client, you can use queries like:

- "Search for appeals from 2024"
- "Find decisions where the challenger is 'S.C. Mobilier Novator SRL'"
- "Show appeals related to MTender procedure ocds-b3wdp1-MD-1740472744894"
- "Get current year decisions"
- "Search for appeals with status 'Under review'"
- "Get page 2 of appeals from 2024"
- "Show next page of decisions"

## Pagination

All search results and resources are paginated with 30 items per page. The pagination information includes:
- Current page number (0-based)
- Total number of pages
- Items per page (30)
- Whether there are next/previous pages

When using tools or resources:
- Page numbers are 0-based (0 for first page, 1 for second page, etc.)
- Default page size is 30 items
- Page parameter can be specified in resource URIs: `ansc://appeals/2024?page=1`
- Tools accept page parameter: `{ "page": 1 }`

## Error Handling

The server includes comprehensive error handling for:
- Network errors (ANSC site down)
- Invalid search parameters
- HTML parsing failures
- Rate limiting
- Invalid page numbers

## Future Features

The following features are planned for future implementation:

1. Fetch Tools
   - get_appeal_details
   - get_decision_pdf

2. Analysis Tools
   - analyze_appeal
   - analyze_decision
   - find_related_appeals

3. Integration Tools
   - get_tender_appeals
   - analyze_tender_appeal_history

## License

Copyright 2025 Ion Nalyk Calmis

All rights reserved.