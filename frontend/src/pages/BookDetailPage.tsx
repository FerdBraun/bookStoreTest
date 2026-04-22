// @ts-ignore
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '../api/books';
import Header from '../components/Header';
import { useAuthStore } from '../store/useAuthStore';
import { ArrowLeft, Loader2, Edit, Calendar } from 'lucide-react';
import { Book } from '../types/book';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isAdmin = useAuthStore((state) => state.isAdmin());

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery<Book>({
    queryKey: ['book', id],
    queryFn: () => getBookById(id as string),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-6 transition"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Catalog
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : isError || !book ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-xl text-center shadow-sm border border-red-100">
            <h3 className="text-xl font-semibold mb-2">Book Not Found</h3>
            <p>The book you are looking for does not exist or an error occurred.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex justify-between items-start mb-6 gap-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {book.name}
                </h1>

                {isAdmin && (
                  <Link
                    to={`/admin/edit/${book.id}`}
                    className="flex-shrink-0 flex items-center space-x-1 px-4 py-2 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition font-medium text-sm"
                  >
                    <Edit size={16} />
                    <span className="hidden sm:inline">Edit Book</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center text-gray-500 mb-8 pb-8 border-b border-gray-100">
                <Calendar size={18} className="mr-2" />
                <span>
                  Published on{' '}
                  {new Date(book.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h3>
                <p className="whitespace-pre-line leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookDetailPage;