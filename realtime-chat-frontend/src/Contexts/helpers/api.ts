const HOST_URL =
  (import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.VITE_HOST) + '/auth';

type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};

export async function fetchData<R extends object, B = Record<string, any>>(
  path: string,
  body: B,
): Promise<
  { result: R; ok: true; error: null } | { result: null; error: ErrorResponse; ok: false }
> {
  const data = await fetch(HOST_URL + '/' + path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const result = await data.json();

  return data.ok
    ? { result: result as R, ok: true, error: null }
    : { error: result as ErrorResponse, ok: false, result: null };
}
