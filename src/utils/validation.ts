import { ValidationError } from '../types/todo.js';

export function validateCreateTodo(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data === null || data === undefined || typeof data !== 'object') {
    errors.push({ field: 'title', message: 'title is required' });
    return errors;
  }

  if (!data.title) {
    errors.push({ field: 'title', message: 'title is required' });
  } else if (typeof data.title !== 'string') {
    errors.push({ field: 'title', message: 'title must be a string' });
  } else if (data.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'title must be a non-empty string' });
  }

  return errors;
}

export function validateUpdateTodo(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data === null || data === undefined || typeof data !== 'object') {
    errors.push({ field: 'body', message: 'Request body must be an object' });
    return errors;
  }

  const hasTitle = 'title' in data;
  const hasCompleted = 'completed' in data;

  if (!hasTitle && !hasCompleted) {
    errors.push({ field: 'body', message: 'At least one field (title or completed) must be provided' });
    return errors;
  }

  if (hasTitle) {
    if (typeof data.title !== 'string') {
      errors.push({ field: 'title', message: 'title must be a string' });
    } else if (data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'title must be a non-empty string' });
    }
  }

  if (hasCompleted && typeof data.completed !== 'boolean') {
    errors.push({ field: 'completed', message: 'completed must be a boolean' });
  }

  return errors;
}
