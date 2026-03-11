import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import type { Todo, PAGINATION_META_DATA } from '@/types';

export interface TodoPayload {
  title: string;
  description?: string | null;
  priority?: 'low' | 'medium' | 'high';
  status?: Todo['status'];
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
  status?: string;
  priority?: string;
  search?: string;
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

    const query = searchParams.toString();
    const url = `${apiConstant.USER.TODOS.BASE}${query ? `?${query}` : ''}`;
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
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(apiConstant.USER.TODOS.BY_ID.replace('{id}', id));
  },
};
