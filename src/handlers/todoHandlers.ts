import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { todoStore } from '../data/store.js';
import { validateCreateTodo, validateUpdateTodo } from '../utils/validation.js';
import { Todo, ApiResponse } from '../types/todo.js';

export function createTodo(req: Request, res: Response): void {
  const errors = validateCreateTodo(req.body);
  if (errors.length > 0) {
    const response: ApiResponse = { errors };
    res.status(400).json(response);
    return;
  }

  const todo: Todo = {
    id: uuidv4(),
    title: req.body.title.trim(),
    completed: false,
    createdAt: new Date(),
  };

  const created = todoStore.create(todo);
  const response: ApiResponse<Todo> = { data: created };
  res.status(201).json(response);
}

export function getAllTodos(_req: Request, res: Response): void {
  const todos = todoStore.getAll();
  const response: ApiResponse<Todo[]> = { data: todos };
  res.status(200).json(response);
}

export function getTodoById(req: Request, res: Response): void {
  const todo = todoStore.getById(req.params.id);
  if (!todo) {
    const response: ApiResponse = { error: 'Todo not found' };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<Todo> = { data: todo };
  res.status(200).json(response);
}

export function updateTodo(req: Request, res: Response): void {
  const existing = todoStore.getById(req.params.id);
  if (!existing) {
    const response: ApiResponse = { error: 'Todo not found' };
    res.status(404).json(response);
    return;
  }

  const errors = validateUpdateTodo(req.body);
  if (errors.length > 0) {
    const response: ApiResponse = { errors };
    res.status(400).json(response);
    return;
  }

  const updates: Partial<Pick<Todo, 'title' | 'completed'>> = {};
  if (typeof req.body.title === 'string') {
    updates.title = req.body.title.trim();
  }
  if (typeof req.body.completed === 'boolean') {
    updates.completed = req.body.completed;
  }

  const updated = todoStore.update(req.params.id, updates);
  if (!updated) {
    const response: ApiResponse = { error: 'Todo not found' };
    res.status(404).json(response);
    return;
  }
  const response: ApiResponse<Todo> = { data: updated };
  res.status(200).json(response);
}

export function deleteTodo(req: Request, res: Response): void {
  const deleted = todoStore.delete(req.params.id);
  if (!deleted) {
    const response: ApiResponse = { error: 'Todo not found' };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<{ message: string }> = { data: { message: 'Todo deleted successfully' } };
  res.status(200).json(response);
}
