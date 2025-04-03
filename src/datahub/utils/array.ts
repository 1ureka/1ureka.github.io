import { toEntries } from "@/utils/typedBuiltins";

/**
 * 根據出現頻率聚合字符串數組
 *
 * @param strings 要聚合的字符串數組
 * @param ratio 閾值比例（0~1之間）
 * @returns 如果最常出現的字符串佔比超過指定比例，則返回該字符串，否則返回 null
 */
export function aggregateStrings<T extends string>(strings: T[], ratio: number = 0.9): T | null {
  // 參數驗證
  if (!Array.isArray(strings) || strings.length === 0) {
    return null;
  }

  if (ratio < 0 || ratio > 1) {
    throw new Error("Ratio must be between 0 and 1");
  }

  // 計算每個字符串出現的次數
  const countMap = strings.reduce((acc, str) => {
    acc[str] = (acc[str] || 0) + 1;
    return acc;
  }, {} as Record<T, number>);

  // 找出出現頻率最高的字符串
  let maxString: T = strings[0];
  let maxCount = 0;

  for (const [str, count] of toEntries(countMap)) {
    if (count > maxCount) {
      maxString = str;
      maxCount = count;
    }
  }

  // 計算最高頻率字符串的佔比
  const maxRatio = maxCount / strings.length;

  // 判斷是否超過指定的閾值
  return maxRatio >= ratio ? maxString : null;
}
