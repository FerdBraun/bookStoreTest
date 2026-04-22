const VALID_CHARS_REGEX =
  /^[A-Za-zА-Яа-яЁё\s.,!?;:'"()\-\u2013\u2014]+$/;

export const validateBookField = (
  value: string,
  fieldName: 'name' | 'description'
): string | null => {
  if (!value.trim()) {
    return fieldName === 'name'
      ? 'Название книги не может быть пустым'
      : 'Описание книги не может быть пустым';
  }

  if (!VALID_CHARS_REGEX.test(value)) {
    return fieldName === 'name'
      ? 'Название содержит недопустимые символы'
      : 'Описание содержит недопустимые символы';
  }

  return null;
};