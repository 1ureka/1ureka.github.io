/**
 * 回傳一個新陣列，保留每個指定欄位值第一次出現的元素，其餘重複的會被移除。
 *
 * @template T - 陣列元素的型別
 * @template K - 欲依據去重的欄位名稱
 * @param {T[]} arr - 欲處理的陣列
 * @param {K} field - 作為唯一性依據的欄位
 * @returns {T[]} 去重後的新陣列
 *
 * @example
 * const data = [{ id: 1 }, { id: 2 }, { id: 1 }];
 * uniqueByField(data, 'id'); // => [{ id: 1 }, { id: 2 }]
 */
const uniqueByField = <T, K extends keyof T>(arr: T[], field: K): T[] => {
  const seen = new Set<T[K]>();
  return arr.filter((item) => {
    const key = item[field];
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/**
 * 在集合陣列中切換指定值的存在狀態。若已存在則移除，若不存在則加入。
 *
 * @template T - 陣列元素的型別
 * @param {T[]} array - 原始陣列
 * @param {T} value - 要切換的值
 * @returns {T[]} 新陣列，已切換該值的狀態
 *
 * @example
 * toggleSet([1, 2, 3], 2); // => [1, 3]
 * toggleSet([1, 2, 3], 4); // => [1, 2, 3, 4]
 */
function toggleSet<T>(array: T[], value: T): T[] {
  const set = new Set(array);
  set.has(value) ? set.delete(value) : set.add(value);
  return Array.from(set);
}

export { uniqueByField, toggleSet };
