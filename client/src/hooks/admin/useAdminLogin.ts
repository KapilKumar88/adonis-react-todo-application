import { useMutation } from '@tanstack/react-query';
import { adminAuthService, type AdminLoginPayload } from '@/services/admin/auth.service';
import { ApiLoginResponse } from '@/types/api.types';

/**
 * TanStack Query mutation for the admin login endpoint.
 *
 * POST /admin/login  →  { user: ApiUser, token: string }
 *
 * Usage:
 *   const { mutate, isPending, isError, error } = useAdminLogin({
 *     onSuccess: (data) => { ... },
 *   });
 *   mutate({ email, password });
 */
export function useAdminLogin(options?: {
  onSuccess?: (data: ApiLoginResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation<ApiLoginResponse, Error, AdminLoginPayload>({
    mutationFn: adminAuthService.login,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
