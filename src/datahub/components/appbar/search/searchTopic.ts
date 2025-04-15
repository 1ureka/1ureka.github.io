import { useUrl } from "@/datahub/hooks/url";

export type SearchTopic = "db" | "table" | "column";
export const isSearchTopic = (value: string): value is SearchTopic => {
  return ["db", "table", "column"].includes(value);
};

export const useSearchTopic = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const raw = searchParams.get("searchTopic") ?? "db";
  const searchTopic = isSearchTopic(raw) ? raw : "db";

  return { searchTopic, updateSearchParams };
};
