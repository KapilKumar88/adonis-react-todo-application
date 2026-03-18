import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoKeys, todoService, type TodoListParams, type TodoListResponse, type TodoPayload } from '@/services/user/todo.service';
import { dashboardKeys } from '@/services/user/dashboard.service';
import { TodoStatus } from '@/types/todo.types';

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
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
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
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string | string[]) => todoService.delete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: TodoStatus }) =>
      todoService.update(id, { status: newStatus }),

    onMutate: async ({ id, newStatus }) => {
      // Cancel any outgoing refetches so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: todoKeys.lists() });

      // Snapshot all matching list queries for rollback
      const previousQueries = queryClient.getQueriesData<TodoListResponse>({ queryKey: todoKeys.lists() });

      // Optimistically apply the new status to every cached list page
      queryClient.setQueriesData<TodoListResponse>({ queryKey: todoKeys.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((todo) =>
            todo.id === id ? { ...todo, status: newStatus } : todo
          ),
        };
      });

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      // Roll back all list caches to their previous state
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
