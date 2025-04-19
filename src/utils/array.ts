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
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
}

/**
 * 依照指定鍵值函數和排序選項對物件陣列進行排序。
 *
 * @template T - 陣列元素的型別
 * @param {readonly T[]} array - 要排序的物件陣列
 * @param {function(T): string | number | Date | null | undefined} keySelector - 從物件中選取排序依據的函數
 * @param {"asc" | "desc"} [order="asc"] - 排序順序，"asc"為升序，"desc"為降序
 * @param {object} [options={}] - 排序選項
 * @param {boolean} [options.caseInsensitive=false] - 是否忽略字串比較的大小寫
 * @param {boolean} [options.nullsFirst=true] - 是否將null/undefined值排在前面
 * @returns {T[]} 排序後的新陣列
 *
 * @example
 * // 基本排序
 * sortObjectArray([{name: "Bob"}, {name: "Alice"}], item => item.name);
 * // => [{name: "Alice"}, {name: "Bob"}]
 *
 * @example
 * // 降序排列
 * sortObjectArray([{id: 1}, {id: 3}, {id: 2}], item => item.id, "desc");
 * // => [{id: 3}, {id: 2}, {id: 1}]
 *
 * @example
 * // 空值處理
 * sortObjectArray([{date: null}, {date: new Date()}], item => item.date, "asc", { nullsFirst: false });
 * // => [{date: new Date()}, {date: null}]
 */
function sortObjectArray<T>(
  array: readonly T[],
  keySelector: (item: T) => string | number | Date | null | undefined,
  order: "asc" | "desc" = "asc",
  options: { caseInsensitive?: boolean; nullsFirst?: boolean } = {}
): T[] {
  const { caseInsensitive = false, nullsFirst = true } = options;

  const compareValues = (a: string | number | Date, b: string | number | Date): number => {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    // Fallback: compare as strings
    return String(a).localeCompare(String(b));
  };

  return [...array].sort((itemA, itemB) => {
    const valA = keySelector(itemA);
    const valB = keySelector(itemB);

    const isNullA = valA === null || valA === undefined;
    const isNullB = valB === null || valB === undefined;
    if (isNullA || isNullB) {
      if (isNullA && isNullB) return 0;
      return isNullA ? (nullsFirst ? -1 : 1) : nullsFirst ? 1 : -1;
    }

    const [a, b] = [valA, valB].map((v) => (typeof v === "string" && caseInsensitive ? v.toLowerCase() : v));
    const comparison = compareValues(a, b);
    return order === "asc" ? comparison : -comparison;
  });
}

export { uniqueByField, toggleSet, sortObjectArray };
