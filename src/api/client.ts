const BASE_URL = 'https://dhc-2.duckdns.org';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...restOptions } = options;
  const method = (restOptions.method ?? 'GET').toUpperCase();

  if (process.env.NODE_ENV === 'development') {
    console.log(`[api] → ${method} ${endpoint}`, body ?? '');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...restOptions,
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[api] ✖ ${method} ${endpoint} — ${response.status} ${response.statusText}`,
      );
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[api] ← ${method} ${endpoint}`, data);
  }

  return data;
}
