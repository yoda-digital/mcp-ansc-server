# Changelog

All notable changes to the ANSC MCP Server will be documented in this file.

## [0.1.0] - 2025-03-15

### Added
- Initial release with core search functionality and pagination support
- Search tools:
  * `search_appeals` with filters:
    - Year (defaults to current year)
    - Contracting Authority
    - Challenger
    - Procedure Number (OCDS ID)
    - Status (19 different statuses supported)
    - Pagination (0-based page numbers, 30 items per page)
  * `search_decisions` with filters:
    - Year (defaults to current year)
    - Contracting Authority
    - Challenger
    - Procurement Object
    - Decision Status (3 options)
    - Decision Content (9 options)
    - Appeal Grounds (42 options)
    - Complaint Object (2 options)
    - Appeal Number
    - Pagination (0-based page numbers, 30 items per page)
- Resource templates:
  * `ansc://appeals/{year}[?page={page}]` for yearly appeals
  * `ansc://decisions/{year}[?page={page}]` for yearly decisions
- Static resources:
  * `ansc://appeals/current-year[?page={page}]` for current year appeals
  * `ansc://decisions/current-year[?page={page}]` for current year decisions
- HTML parsing functionality:
  * Table data extraction from ANSC website
  * Status mapping
  * PDF URL extraction
  * Pagination information parsing
  * Proper handling of ANSC's 1-based page numbers
- ANSC API client:
  * Axios-based HTTP client
  * Query parameter handling
  * Error handling
  * SSL certificate verification skip
  * Automatic conversion between 0-based and 1-based page numbers
- TypeScript interfaces and enums:
  * Appeal and Decision interfaces
  * Status enums
  * Search parameter interfaces
  * Pagination interfaces
- Documentation:
  * README with installation and usage instructions
  * Architecture documentation
  * Code comments

### Technical Details
- Built with TypeScript and ES2022 modules
- Uses cheerio for HTML parsing
- Implements MCP SDK v0.6.0
- Proper error handling and type safety
- Default year handling for all searches
- Integration with MTender through OCDS IDs
- Pagination support:
  * 30 items per page (ANSC's default)
  * 0-based page numbers in API
  * Automatic conversion to ANSC's 1-based page numbers
  * Proper handling of different pagination structures
  * Total pages detection from last page link
  * Next/previous page indicators

### Pagination Implementation Details
- Appeals endpoint (/ro/contestatii/{{year}}):
  * First page: no page parameter
  * Subsequent pages: ?page=N (where N starts at 1)
  * Example: page 2 = ?page=1
  * Maximum pages detected from last page link
  * Verified working with real ANSC data

- Decisions endpoint (/ro/content/decizii-{{year}}):
  * First page: no page parameter
  * Subsequent pages: ?page=N (where N starts at 1)
  * Example: page 2 = ?page=1
  * Maximum pages detected from last page link
  * Verified working with real ANSC data

### Future Features (Documented but not implemented)
- Fetch Tools (planned):
  * get_appeal_details
  * get_decision_pdf
- Analysis Tools (planned):
  * analyze_appeal
  * analyze_decision
  * find_related_appeals
- Integration Tools (planned):
  * get_tender_appeals
  * analyze_tender_appeal_history