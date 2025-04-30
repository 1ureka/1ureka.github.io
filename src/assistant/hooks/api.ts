import { useQuery } from "@tanstack/react-query";
import { getApiInfo } from "../data/api";
import { useApiUrl } from "./store";

const Interval = { fetch: 6000, offline: 6000, start: 3000, ready: 10000 } as const;

const useApiInfo = () => {
  const apiUrl = useApiUrl((state) => state.apiUrl);

  const { data } = useQuery({
    queryKey: ["apiState", apiUrl],
    queryFn: () => getApiInfo(apiUrl),
    refetchInterval: ({ state }) => {
      const { data } = state;

      if (data === undefined) return Interval.fetch;
      if (data === null) return Interval.offline;
      if (["loading", "idle"].includes(data?.status ?? "")) return Interval.start;

      return Interval.ready;
    },
  });

  return data;
};

type ApiStatus = "loading" | "offline" | "connected" | "error";

const useApiStatus = (): ApiStatus => {
  const apiInfo = useApiInfo();
  if (apiInfo === undefined) return "loading";
  if (apiInfo === null) return "offline";

  const { status } = apiInfo;
  if (status === "ok") return "connected";
  if (status === "error") return "error";
  if (["loading", "idle"].includes(status)) return "loading";

  return "error"; // 因為理論上不該到達這裡，所以回傳 error，若真的到達這裡，可以發現問題
};

export { useApiInfo, useApiStatus };
export type { ApiStatus };
