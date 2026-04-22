import apiClient from './client';
import {
  Book,
  GetBooksParams,
  CreateBookDTO,
  UpdateBookDTO,
} from '../types/book';

export const getBooks = async (
  params?: GetBooksParams
): Promise<{ data: Book[]; total: number }> => {
  const { data, headers } = await apiClient.get<Book[]>('/books', {
    params,
  });

  return {
    data,
    total: Number(headers['X-Total-Count'] ?? headers['x-total-count'] ?? 0),
  };
};

export const getBookById = async (id: string): Promise<Book> => {
  const { data } = await apiClient.get<Book>(`/books/${id}`);
  return data;
};

export const createBook = async (book: CreateBookDTO): Promise<Book> => {
  const { data } = await apiClient.post<Book>('/books', book);
  return data;
};

export const updateBook = async (
  id: string,
  book: UpdateBookDTO
): Promise<Book> => {
  const { data } = await apiClient.patch<Book>(`/books/${id}`, book);
  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await apiClient.delete(`/books/${id}`);
};