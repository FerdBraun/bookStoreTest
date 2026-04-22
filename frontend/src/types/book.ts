export interface Book {
  id: string;
  name: string;
  description: string;
  publisher: string;
  created_at: string; // ISO string
}

export type SortBy = 'name' | 'created_at';
export type SortOrder = 'asc' | 'desc';

export interface GetBooksParams {
  sort?: SortBy;
  order?: SortOrder;
  offset?: number;
  count?: number;
}

export interface CreateBookDTO {
  name: string;
  description: string;
}

export interface UpdateBookDTO {
  name?: string;
  description?: string;
}
