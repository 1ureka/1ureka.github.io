import { Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { MotionStack, booksItemVar } from "../../../components/Motion";
import { BOOKS_ROWS } from "../../../utils/store";

const intro = {
  scene: {
    project: "PJ27, PJ28",
    info: `Reimagining classic scenes from anime and games with a realistic
        touch, along with original works inspired by Japan’s countryside.`,
  },
  props: {
    project: "PJ26",
    info: `It includes a variety of models, from small screws to buildings, 
        to meet outdoor scene requirements. It provides pre-packaged objects
        based on instances.`,
  },
};

export default function BooksHeader({ tab }) {
  const rows = useRecoilValue(BOOKS_ROWS);
  const { project, info } = intro[tab];
  const includes = `${rows.length} Images`;

  return (
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      <MotionStack
        variants={booksItemVar}
        sx={{ p: 3, alignItems: "flex-start" }}
        spacing={0.5}
      >
        <Typography variant="caption">PROJECTS:</Typography>
        <Typography variant="caption" sx={{ color: "text.primary" }}>
          {project}
        </Typography>
      </MotionStack>

      <MotionStack
        variants={booksItemVar}
        sx={{ p: 3, alignItems: "flex-start" }}
        spacing={0.5}
      >
        <Typography variant="caption">INCLUDES:</Typography>
        <Typography variant="caption" sx={{ color: "text.primary" }}>
          {includes}
        </Typography>
      </MotionStack>

      <MotionStack
        variants={booksItemVar}
        alignItems="center"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Typography variant="body2">{info}</Typography>
      </MotionStack>
    </Stack>
  );
}
