import { useChatMessages } from "@/assistant/hooks/api";
import { ChatMessage } from "./ChatMessage";

const ChatMessages = () => {
  const messages = useChatMessages();

  return (
    <>
      {messages.map(({ timestamp, role, content, status }) => (
        <ChatMessage
          key={timestamp}
          timestamp={timestamp}
          isUser={role === "user"}
          isThinking={status === "loading"}
          isError={status === "error"}
          content={content}
        />
      ))}
    </>
  );
};

export { ChatMessages };
