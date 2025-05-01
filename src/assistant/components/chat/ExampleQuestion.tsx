import { Box, IconButton, Stack, Typography } from "@mui/material";

import { generateStretchRadius } from "@/utils/commonSx";
import { OutlinedInteractionSx } from "@/assistant/utils/commonSx";
import type { exampleQuestions } from "@/assistant/utils/examples";

type ExampleQuestionProps = (typeof exampleQuestions)[number] & {
  onClick?: () => void;
};

const ExampleQuestion = ({ Icon, title, description, onClick }: ExampleQuestionProps) => {
  return (
    <Stack
      sx={{
        position: "relative",
        p: 3,
        bgcolor: "background.paper",
        overflow: "hidden",
        ...OutlinedInteractionSx,
        ...generateStretchRadius([2, 1.8]),
      }}
    >
      <Box sx={{ pb: 1.5 }}>
        <Icon
          sx={{
            fontSize: "3rem",
            bgcolor: "text.secondary",
            color: "background.default",
            p: 1,
            ...generateStretchRadius([1.8, 1.6]),
          }}
        />
      </Box>

      <Typography variant="h6" component="h6">
        {title}
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>

      <IconButton
        centerRipple={false}
        sx={{ position: "absolute", inset: 0, ...generateStretchRadius([2, 1.8]) }}
        onClick={onClick}
      />
    </Stack>
  );
};

export { ExampleQuestion };
