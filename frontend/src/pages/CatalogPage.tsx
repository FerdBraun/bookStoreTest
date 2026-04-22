// @ts-ignore
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, deleteBook } from '../api/books';
import { SortBy, SortOrder, Book } from '../types/book';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface BooksResponse {
  data: Book[];
  total: number;
}

const CatalogPage = () => {
  const [sort, setSort] = useState<SortBy>('created_at');
  const [order, setOrder] = useState<SortOrder>('desc');

  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === 'admin';

  const { data, isLoading, isError, refetch } = useQuery<BooksResponse>({
    queryKey: ['books', sort, order],
    queryFn: () => getBooks({ sort, order }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: () => {
      console.error('Failed to delete the book');
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(id);
    }
  };

  const books = data?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Book Catalog
          </h1>

          {/* Sorting Controls */}
          <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-sm font-medium text-gray-500 pl-2">
              Sort by:
            </span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortBy)}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="name">Name</option>
              <option value="created_at">Date</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as SortOrder)}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : isError ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            Failed to load books. Please try again later.
            <button
              onClick={() => refetch()}
              className="ml-4 underline font-medium hover:text-red-800"
            >
              Retry
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-500">
              The catalog is currently empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={isAdmin ? handleDelete : undefined}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;