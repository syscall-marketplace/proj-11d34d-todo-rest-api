export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  errors?: ValidationError[];
}
