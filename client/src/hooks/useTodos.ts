import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService, type TodoListParams, type TodoPayload } from '@/services/user/todo.service';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (params?: TodoListParams) => [...todoKeys.lists(), params] as const,
  detail: (id: string) => [...todoKeys.all, 'detail', id] as const,
};

export function useTodosQuery(params?: TodoListParams) {
  return useQuery({
    queryKey: todoKeys.list(params),
    queryFn: () => todoService.list(params),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TodoPayload) => todoService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<TodoPayload> }) =>
      todoService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}
