import apiConstant from '@/constants/api.constant';
import { apiClient } from '@/lib/api-client';
import { Tag } from '@/types/tags.types';


export const tagKeys = {
  all: ['tags'] as const,
  list: () => [...tagKeys.all, 'list'] as const,
};

export interface TagPayload {
  name: string;
  color?: string | null;
}

export type TagListResponse = {
  data: Array<Tag>;
  message: string;
};

export type TagResponse = {
  data: Tag;
  message: string;
};

export const tagService = {
  /** GET /api/v1/tags */
  list: async (): Promise<TagListResponse> => {
    return apiClient.get<TagListResponse>(apiConstant.USER.TAGS.LIST);
  },

  /** POST /api/v1/tags/create */
  create: async (payload: TagPayload): Promise<TagResponse> => {
    return apiClient.post<TagResponse>(apiConstant.USER.TAGS.CREATE, payload);
  },

  /** PUT /api/v1/tags/update */
  update: async (id: string, payload: Partial<TagPayload>): Promise<TagResponse> => {
    return apiClient.put<TagResponse>(apiConstant.USER.TAGS.UPDATE, { ...payload, id });
  },

  /** DELETE /api/v1/tags/{id} */
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(apiConstant.USER.TAGS.DELETE.replace('{id}', id));
  },
};
