import apiClient from './client';
import {
  Book,
  GetBooksParams,
  CreateBookDTO,
  UpdateBookDTO,
} from '../types/book';

/**
 * Получить список книг с пагинацией и сортировкой
 * Также возвращает общее количество через X-Total-Count
 */
export const getBooks = async (params?: GetBooksParams): Promise<{
  data: Book[];
  total: number;
}> => {
  const { data, headers } = await apiClient.get<Book[]>('/books', {
    params,
  });

  return {
    data,
    total: Number(headers['x-total-count'] || 0),
  };
};

/**
 * Получить книгу по ID
 */
export const getBookById = async (id: string): Promise<Book> => {
  const { data } = await apiClient.get<Book>(`/books/${id}`);
  return data;
};

/**
 * Создать новую книгу (admin)
 */
export const createBook = async (
  book: CreateBookDTO
): Promise<Book> => {
  const { data } = await apiClient.post<Book>('/books', book);
  return data;
};

/**
 * Обновить книгу (admin)
 * PATCH — частичное обновление
 */
export const updateBook = async (
  id: string,
  book: UpdateBookDTO
): Promise<Book> => {
  const { data } = await apiClient.patch<Book>(`/books/${id}`, book);
  return data;
};

/**
 * Удалить книгу (admin)
 */
export const deleteBook = async (id: string): Promise<void> => {
  await apiClient.delete(`/books/${id}`);
};