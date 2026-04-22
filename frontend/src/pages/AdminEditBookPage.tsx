// @ts-ignore
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookById, updateBook } from '../api/books';
import { UpdateBookDTO, Book } from '../types/book';
import Header from '../components/Header';
import BookForm from '../components/BookForm';
import { ArrowLeft, Loader2 } from 'lucide-react';

const AdminEditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery<Book>({
    queryKey: ['book', id],
    queryFn: () => {
      if (!id) throw new Error('Missing book id');
      return getBookById(id);
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (updatedBook: UpdateBookDTO) => {
      if (!id) throw new Error('Missing book id');
      return updateBook(id, updatedBook);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', id] });
      navigate('/');
    },

    onError: (error) => {
      console.error('Failed to update book', error);
    },
  });

  const handleSubmit = (data: UpdateBookDTO) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-6 transition"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Catalog
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Book
            </h1>
            <p className="text-gray-500 mt-1">
              Update information for this book.
            </p>
          </div>

          <div className="p-8">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : isError || !book ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                Failed to load book details. The book may have been deleted.
              </div>
            ) : (
              <>
                <BookForm
                  initialData={{
                    name: book.name,
                    description: book.description,
                  }}
                  onSubmit={handleSubmit}
                  onCancel={() => navigate('/')}
                  isLoading={mutation.isPending}
                  submitLabel="Save Changes"
                />

                {mutation.isError && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                    An error occurred while updating the book. Please try again.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEditBookPage;