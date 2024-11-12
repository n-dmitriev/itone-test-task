import { useCallback, useState } from 'react';

export const useApi = <T>(
  requestMethod: (...args: any[]) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = useCallback<typeof requestMethod>(
    async (...params: Parameters<typeof requestMethod>) => {
      try {
        setLoading(true);
        setError(null);
        const response = await requestMethod(...params);
        setData(response as T);
        return response;
      } catch (err: any) {
        setError(err);
        return err;
      } finally {
        setLoading(false);
      }

      return new Promise<T>(() => {});
    },
    [requestMethod]
  );

  return { data, error, loading, sendRequest };
};
