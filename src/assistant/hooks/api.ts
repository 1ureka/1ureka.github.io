import { useQuery } from "@tanstack/react-query";
import { getApiInfo, queryApi } from "../data/api";
import { useMetadataStore, useChatStore, useLoadingStore } from "./store";
import { useMemo } from "react";
import { warningMessage } from "../components/chat/WarnMessage";

// -------------------------------------------------------
// Server Metadata Hooks
// -------------------------------------------------------

const Interval = { fetch: 6000, offline: 6000, start: 3000, ready: 10000 } as const;

const usePollingStatus = () => {
  const url = useMetadataStore((state) => state.url);
  const enabled = useMetadataStore((state) => state.enabled);

  const { data } = useQuery({
    queryKey: ["apiState", url],
    queryFn: () => getApiInfo(url),
    enabled: enabled,
    refetchInterval: ({ state }) => {
      const { data } = state;

      if (data === undefined) return Interval.fetch;
      if (data === null) return Interval.offline;
      if (["loading", "idle"].includes(data?.status ?? "")) return Interval.start;

      return Interval.ready;
    },
  });

  return enabled ? data : null;
};

type ApiStatus = "loading" | "offline" | "connected" | "error";

const useApiStatus = (): ApiStatus => {
  const data = usePollingStatus();
  if (data === undefined) return "loading";
  if (data === null) return "offline";

  const { status } = data;
  if (status === "ok") return "connected";
  if (status === "error") return "error";
  if (["loading", "idle"].includes(status)) return "loading";

  return "error"; // 因為理論上不該到達這裡，所以回傳 error，若真的到達這裡，可以發現問題
};

const useServerMetadata = () => {
  const { url, enabled } = useMetadataStore();

  function handleChangeServer(enabled: true, url: string): void;
  function handleChangeServer(enabled: false): void;
  function handleChangeServer(enabled: boolean, url?: string): void {
    useMetadataStore.setState({ enabled, url });
  }

  return { url, enabled, handleChangeServer };
};

// -------------------------------------------------------
// Chat Message Hooks
// -------------------------------------------------------

const useSubmitChat = () => {
  const setMessage = useChatStore((state) => state.setMessage);
  const status = useApiStatus();
  const { loading, setLoading } = useLoadingStore();

  const handleSubmit = async (question: string) => {
    if (status !== "connected") return console.error(warningMessage);
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
        requestAnimationFrame(() => {
          setMessage({ content: fullResponse, role: "assistant", status: "finished", timestamp });
          rootElement.scrollTo(0, rootElement.scrollHeight);
          setLoading(false);
        });
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

export { useApiStatus, useSubmitChat, useChatMessages, useServerMetadata };
export type { ApiStatus };
