// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook } from '../api/books';
import { CreateBookDTO } from '../types/book';
import Header from '../components/Header';
import BookForm from '../components/BookForm';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const AdminCreateBookPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = useAuthStore((s) => s.user);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const mutation = useMutation({
    mutationFn: (newBook: CreateBookDTO) => createBook(newBook),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate('/');
    },

    onError: (error) => {
      console.error('Failed to create book', error);
    },
  });

  const handleSubmit = (data: CreateBookDTO) => {
    mutation.mutate(data);
  };


  if (!ready) return null;


  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

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
              Add New Book
            </h1>
            <p className="text-gray-500 mt-1">
              Publish a new book to the catalog.
            </p>
          </div>

          <div className="p-8">
            <BookForm
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
              isLoading={mutation.isPending}
              submitLabel="Publish Book"
            />

            {mutation.isError && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                An error occurred while creating the book. Please try again.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCreateBookPage;