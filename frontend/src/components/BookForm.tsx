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

const EMPTY: CreateBookDTO = {
  name: '',
  description: '',
};

const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel,
}) => {
  const [formData, setFormData] = useState<CreateBookDTO>(
    initialData ?? EMPTY
  );

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});


  useEffect(() => {
    if (!initialData) return;

    setFormData((prev) => {
      const same =
        prev.name === initialData.name &&
        prev.description === initialData.description;

      return same ? prev : initialData;
    });
  }, [initialData?.name, initialData?.description]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof CreateBookDTO;
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

    const nameError = validateBookField(formData.name, 'name');
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Book Name <span className="text-red-500">*</span>
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        {errors.name && (
          <p className="text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        {errors.description && (
          <p className="text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default BookForm;