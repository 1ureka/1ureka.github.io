import { create } from "zustand";

// -------------------------------------------------------
// Server Metadata Store
// -------------------------------------------------------

interface ServerMetadata {
  enabled: boolean;
  url: string;
  setEnabled: (enabled: boolean) => void;
  setUrl: (url: string) => void;
}

const defaultApiUrl = "http://localhost:7860";

const useMetadataStore = create<ServerMetadata>((set) => ({
  enabled: false,
  url: defaultApiUrl,
  setEnabled: (enabled) => set({ enabled }),
  setUrl: (url) => set({ url }),
}));

// -------------------------------------------------------
// Chat Message Store
// -------------------------------------------------------

interface ChatMessage {
  content: string;
  role: "user" | "assistant";
  status: "loading" | "streaming" | "finished" | "error";
  timestamp: number;
}

const useChatStore = create<{
  messageMap: Record<number, ChatMessage>;
  setMessage: (message: ChatMessage) => void;
}>((set) => ({
  messageMap: {},

  setMessage: ({ timestamp, ...msg }) =>
    set(({ messageMap }) => ({
      messageMap: { ...messageMap, [timestamp]: { ...messageMap[timestamp], timestamp, ...msg } },
    })),
}));

const useLoadingStore = create<{ loading: boolean; setLoading: (loading: boolean) => void }>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export { useMetadataStore, defaultApiUrl, useChatStore, useLoadingStore };
