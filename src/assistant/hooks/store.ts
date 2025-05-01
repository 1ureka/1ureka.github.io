import { create } from "zustand";

// -------------------------------------------------------
// Server Metadata Store
// -------------------------------------------------------

interface ApiUrlState {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const defaultApiUrl = "http://localhost:7860";

const useApiUrl = create<ApiUrlState>((set) => ({
  apiUrl: defaultApiUrl,
  setApiUrl: (url) => set({ apiUrl: url }),
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

export { useApiUrl, defaultApiUrl, useChatStore };
