import { useCallback, useMemo } from "react";
import Fuse, { type FuseResult } from "fuse.js";

type StringKeys<T> = Extract<keyof T, string>;
type Highlight = { text: string; highlight: boolean };

// 工具：將 highlight 區段套用成 [{ text, highlight }][]
const applyHighlights = (source: string, matches: readonly [number, number][]): Highlight[] => {
  if (!matches || matches.length === 0) return [{ text: source, highlight: false }];

  const result: Highlight[] = [];
  let lastIndex = 0;

  matches.forEach(([start, end]) => {
    if (start > lastIndex) result.push({ text: source.slice(lastIndex, start), highlight: false });
    result.push({ text: source.slice(start, end + 1), highlight: true });
    lastIndex = end + 1;
  });

  if (lastIndex < source.length) result.push({ text: source.slice(lastIndex), highlight: false });
  return result;
};

// 工具：將 Fuse 結果的 match info 轉換為 highlight 字典
const buildHighlights = <T extends Record<string, string>, K extends StringKeys<T>>(
  item: T,
  matches: FuseResult<T>["matches"]
) => {
  const highlights: Record<string, Highlight[]> = {};

  Object.entries(item).forEach(([key, value]) => {
    const match = matches?.find((m) => m.key === key);
    if (match && typeof match.value === "string" && typeof match.key === "string") {
      highlights[match.key] = applyHighlights(match.value, match.indices);
    } else {
      highlights[key] = [{ text: String(value), highlight: false }];
    }
  });

  return highlights as Record<K, Highlight[]>;
};

// 主 Hook
export function useSearch<T extends Record<string, string>, K extends StringKeys<T>>(data: T[], keys: K[]) {
  const fuse = useMemo(() => new Fuse(data, { keys, threshold: 0.5, includeMatches: true }), [data, keys]);

  const search = useCallback(
    (query: string) => {
      if (!query.trim()) return [];

      return fuse.search(query).map(({ item, matches }) => ({
        item,
        highlights: buildHighlights(item, matches),
      }));
    },
    [fuse]
  );

  return search;
}
