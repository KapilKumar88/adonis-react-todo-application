import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagKeys, tagService, type TagPayload } from '@/services/user/tag.service';

export function useTagsQuery() {
  return useQuery({
    queryKey: tagKeys.list(),
    queryFn: () => tagService.list(),
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TagPayload) => tagService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.list() });
    },
  });
}
