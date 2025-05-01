import { useQuery } from "@tanstack/react-query";
import { getApiInfo, queryApi } from "../data/api";
import { useApiUrl, useChatStore, useLoadingStore } from "./store";
import { useMemo } from "react";

// -------------------------------------------------------
// Server Metadata Hooks
// -------------------------------------------------------

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

// -------------------------------------------------------
// Chat Message Hooks
// -------------------------------------------------------

const useSubmitChat = () => {
  const setMessage = useChatStore((state) => state.setMessage);
  const { loading, setLoading } = useLoadingStore();

  const handleSubmit = async (question: string) => {
    if (loading) return console.error("請稍等，正在處理中...");
    setLoading(true);

    const rootElement = document.querySelector("#root")!;
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      rootElement.scrollTo(0, rootElement.scrollHeight);
    })();

    const timestamp = Date.now();
    setMessage({ content: question, role: "user", status: "finished", timestamp: timestamp - 1 });
    setMessage({ content: "", role: "assistant", status: "loading", timestamp });

    let isThrottling = false;
    queryApi(question, {
      onMessage: (fullResponse) => {
        if (isThrottling) return;
        isThrottling = true;
        requestAnimationFrame(() => {
          setMessage({ content: fullResponse, role: "assistant", status: "streaming", timestamp });
          rootElement.scrollTo(0, rootElement.scrollHeight);
          isThrottling = false;
        });
      },
      onComplete: (fullResponse) => {
        setMessage({ content: fullResponse, role: "assistant", status: "finished", timestamp });
        setLoading(false);
      },
      onError: (error) => {
        setMessage({ content: error, role: "assistant", status: "error", timestamp });
        setLoading(false);
      },
    });
  };

  return { handleSubmit, loading };
};

const useChatMessages = () => {
  const messageMap = useChatStore((state) => state.messageMap);
  const messages = useMemo(() => {
    return Object.values(messageMap).toSorted((a, b) => a.timestamp - b.timestamp);
  }, [messageMap]);

  return messages;
};

export { useApiInfo, useApiStatus, useSubmitChat, useChatMessages };
export type { ApiStatus };
