import { Stack, Typography } from "@mui/material";
import { MotionStack, toolsItemVar } from "../../../components/Motion";

const intro = {
  manager: {
    title: "File Manager",
    info: `Synced in real-time with the backend, 
      manage the images in your album with ease, 
      facilitating effortless addition, updating, and deletion of images.`,
  },
  editor: {
    title: "Image Editor",
    info: `A toolkit featuring image conversion, compression, 
      and filtering. It supports batch processing and includes before-and-after comparison.`,
  },
};

export default function ToolsHeader({ tab }) {
  const { title, info } = intro[tab];

  return (
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      <MotionStack variants={toolsItemVar} sx={{ p: 3 }}>
        <Typography variant="h6">{title}</Typography>
      </MotionStack>
      <MotionStack
        variants={toolsItemVar}
        sx={{ flexGrow: 1, p: 3, alignItems: "center" }}
      >
        <Typography variant="body2">{info}</Typography>
      </MotionStack>
    </Stack>
  );
}
