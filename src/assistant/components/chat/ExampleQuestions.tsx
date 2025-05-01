import { Box } from "@mui/material";
import { ExampleQuestion } from "./ExampleQuestion";
import { exampleQuestions } from "@/assistant/utils/examples";
import { useApiStatus, useChatMessages, useSubmitChat } from "@/assistant/hooks/api";
import { warningMessage } from "./WarnMessage";

const ExampleQuestions = () => {
  const apiStatus = useApiStatus();
  const isConnected = apiStatus === "connected";
  const messages = useChatMessages();
  const { handleSubmit } = useSubmitChat();

  if (messages.length > 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
        gap: 2,
        width: 1,
        maxWidth: 750,
      }}
    >
      {exampleQuestions.map(({ Icon, title, description }, i) => (
        <ExampleQuestion
          key={i}
          Icon={Icon}
          title={title}
          description={description}
          onClick={() => {
            if (!isConnected) return console.error(warningMessage);
            handleSubmit(title);
          }}
        />
      ))}
    </Box>
  );
};

export { ExampleQuestions };
