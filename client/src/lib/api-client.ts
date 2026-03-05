import apiConfig from "@/config/api.config";

export const tokenStorage = {
    get: (): string | null => localStorage.getItem(apiConfig.API_TOKEN_STORAGE_KEY),
    set: (token: string): void => localStorage.setItem(apiConfig.API_TOKEN_STORAGE_KEY, token),
    remove: (): void => localStorage.removeItem(apiConfig.API_TOKEN_STORAGE_KEY),
};

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers: extraHeaders, ...rest } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(extraHeaders as Record<string, string>),
    };

    const token = tokenStorage.get();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiConfig.API_BASE_URL}${path}`, {
        ...rest,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const message =
            data?.errors?.[0]?.message ??
            data?.message ??
            `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return data as T;
}

export const apiClient = {
    get: <T>(path: string, options?: RequestOptions) =>
        request<T>(path, { ...options, method: 'GET' }),

    post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>(path, { ...options, method: 'POST', body }),

    put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>(path, { ...options, method: 'PUT', body }),

    patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
        request<T>(path, { ...options, method: 'PATCH', body }),

    delete: <T>(path: string, options?: RequestOptions) =>
        request<T>(path, { ...options, method: 'DELETE' }),
};
