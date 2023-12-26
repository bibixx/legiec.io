export const concurrent = async <T extends Record<string, Promise<any>>>(
  obj: T
): Promise<{
  [K in keyof T]: Awaited<T[K]>;
}> => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  const returns = await Promise.all(values);

  return Object.fromEntries(keys.map((k, i) => [k, returns[i]])) as {
    [K in keyof T]: Awaited<T[K]>;
  };
};
