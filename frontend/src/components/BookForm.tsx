// @ts-ignore
import React, { useEffect, useState } from 'react';
import { CreateBookDTO } from '../types/book';
import { validateBookField } from '../utils/validation';

interface BookFormProps {
  initialData?: CreateBookDTO;
  onSubmit: (data: CreateBookDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel: string;
}

const BookForm: React.FC<BookFormProps> = ({
  initialData = { name: '', description: '' },
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel,
}) => {
  const [formData, setFormData] =
    useState<CreateBookDTO>(initialData);

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  // sync for edit mode
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const field =
      e.target.name as keyof CreateBookDTO;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const nameError = validateBookField(
      formData.name,
      'name'
    );

    const descriptionError = validateBookField(
      formData.description,
      'description'
    );

    if (nameError || descriptionError) {
      setErrors({
        name: nameError || undefined,
        description: descriptionError || undefined,
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* NAME */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Book Name{' '}
          <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Enter book name"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${
            errors.name
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description{' '}
          <span className="text-red-500">*</span>
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          disabled={isLoading}
          placeholder="Enter book description"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none ${
            errors.description
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center min-w-[120px]"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};

export default BookForm;