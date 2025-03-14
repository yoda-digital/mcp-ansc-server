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

### Resources

- Static Resources:
  * `ansc://appeals/current-year` - Appeals under review for the current year
  * `ansc://decisions/current-year` - Decisions on appeals for the current year

- Resource Templates:
  * `ansc://appeals/{year}` - Appeals under review for a specific year
  * `ansc://decisions/{year}` - Decisions on appeals for a specific year

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

## Error Handling

The server includes comprehensive error handling for:
- Network errors (ANSC site down)
- Invalid search parameters
- HTML parsing failures
- Rate limiting

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