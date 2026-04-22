// @ts-ignore
import React from 'react';
import { Book } from '../types/book';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Edit, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2" title={book.name}>
          {book.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>

        <div className="text-xs text-gray-400">
          Published: {new Date(book.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
        <Link
          to={`/book/${book.id}`}
          className="text-primary hover:text-blue-800 font-medium text-sm transition-colors"
        >
          View Details
        </Link>

        {isAdmin && onDelete && (
          <div className="flex space-x-3 text-gray-400">
            <Link
              to={`/admin/edit/${book.id}`}
              className="hover:text-primary transition-colors"
              aria-label="Edit book"
            >
              <Edit size={18} />
            </Link>

            <button
              onClick={() => onDelete(book.id)}
              className="hover:text-red-500 transition-colors"
              aria-label="Delete book"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;