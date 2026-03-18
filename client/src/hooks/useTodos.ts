import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoKeys, todoService, type TodoListParams, type TodoPayload } from '@/services/user/todo.service';
import { dashboardKeys } from '@/services/user/dashboard.service';

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
      queryClient.invalidateQueries({ queryKey: [...todoKeys.lists(), ...dashboardKeys.all] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<TodoPayload> }) =>
      todoService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...todoKeys.lists(), ...dashboardKeys.all] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string | string[]) => todoService.delete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...todoKeys.lists(), ...dashboardKeys.all] });
    },
  });
}
