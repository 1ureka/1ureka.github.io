const uniqueByField = <T, K extends keyof T>(arr: T[], field: K): T[] => {
  const seen = new Set<T[K]>();
  return arr.filter((item) => {
    const key = item[field];
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export { uniqueByField };
