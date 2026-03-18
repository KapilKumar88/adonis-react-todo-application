import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type { PAGINATION_META_DATA } from '@/types';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo.types';


export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (params?: TodoListParams) => [...todoKeys.lists(), params] as const,
  detail: (id: string) => [...todoKeys.all, 'detail', id] as const,
};

export interface TodoPayload {
  title: string;
  description?: string | null;
  priority?: TodoPriority;
  status?: TodoStatus;
  dueDate?: string | null;
  tagIds?: string[];
}

export type TodoResponse = Todo;

export interface TodoListResponse {
  meta: PAGINATION_META_DATA;
  data: Todo[];
}

export interface TodoListParams {
  page?: number;
  limit?: number;
  status?: TodoStatus;
  priority?: TodoPriority;
  search?: string;
  sortBy?: keyof Todo;
  sortDirection?: 'asc' | 'desc';
}

export const todoService = {
  /** GET /api/v1/todos */
  list: async (params?: TodoListParams): Promise<TodoListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.status) searchParams.set('status', params.status);
    if (params?.priority) searchParams.set('priority', params.priority);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortDirection) searchParams.set('sortDirection', params.sortDirection);

    const query = searchParams.toString();
    let apiUrl = apiConstant.USER.TODOS.BASE;

    if (query) {
      apiUrl += `?${query}`;
    }

    const url = apiUrl;
    return apiClient.get<TodoListResponse>(url);
  },

  /** POST /api/v1/todos */
  create: async (payload: TodoPayload): Promise<TodoResponse> => {
    return apiClient.post<TodoResponse>(apiConstant.USER.TODOS.BASE, payload);
  },

  /** GET /api/v1/todos/:id */
  getById: async (id: string): Promise<TodoResponse> => {
    return apiClient.get<TodoResponse>(apiConstant.USER.TODOS.BY_ID.replace('{id}', id));
  },

  /** PUT /api/v1/todos/:id */
  update: async (id: string, payload: Partial<TodoPayload>): Promise<TodoResponse> => {
    return apiClient.put<TodoResponse>(apiConstant.USER.TODOS.BY_ID.replace('{id}', id), payload);
  },

  /** DELETE /api/v1/todos/:id */
  delete: async (ids: string | string[]): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>(apiConstant.USER.TODOS.DELETE, { ids });
  },
};
