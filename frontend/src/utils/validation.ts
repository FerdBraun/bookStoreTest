const VALID_CHARS_REGEX =
  /^[A-Za-zА-Яа-яЁё .,!?:;\-()"'`]+$/;

export const validateBookField = (
  value: string,
  fieldName: 'name' | 'description'
): string | null => {
  // empty check
  if (!value.trim()) {
    return fieldName === 'name'
      ? 'Name cannot be empty'
      : 'Description cannot be empty';
  }

  // allowed characters check
  if (!VALID_CHARS_REGEX.test(value)) {
    return 'Only Russian, Latin letters and punctuation are allowed';
  }

  return null;
};