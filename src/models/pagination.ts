export interface PaginationParams {
  page?: number;      // Page number (undefined for first page, 1 for second page, etc.)
  perPage?: number;   // Results per page (default 30)
}

export interface PaginatedResponse<T> {
  items: T[];         // Array of items (appeals or decisions)
  pagination: {
    currentPage: number;  // Current page (0-based for consistency)
    totalPages: number;   // Total number of pages
    perPage: number;      // Items per page
    totalItems?: number;  // Total number of items (if available)
    hasNextPage: boolean; // Whether there is a next page
    hasPrevPage: boolean; // Whether there is a previous page
  };
}