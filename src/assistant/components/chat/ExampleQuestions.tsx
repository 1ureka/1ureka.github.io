import { Box } from "@mui/material";
import { ExampleQuestion } from "./ExampleQuestion";
import { exampleQuestions } from "@/assistant/utils/examples";
import { useChatMessages, useServerMetadata, useSubmitChat } from "@/assistant/hooks/api";

const ExampleQuestions = () => {
  const { handleSubmit } = useSubmitChat();
  const { enabled } = useServerMetadata();

  const messages = useChatMessages();
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
            if (enabled) handleSubmit(title);
          }}
        />
      ))}
    </Box>
  );
};

export { ExampleQuestions };
