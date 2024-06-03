import { useRecoilState } from "recoil";
import { Box, Divider } from "@mui/material";

import { BOOKS_TAB } from "../../utils/store";
import { MotionStack } from "../../components/Motion";
import { booksVar, orchestrationVar } from "../../components/Motion";

import Bookmarks from "../../components/Bookmarks";
import BooksHeader from "./header/BooksHeader";
import BooksContent from "./content/BooksContent";
import BooksCarousels from "./carousels/BooksCarousels";

export default function Page() {
  const [tab, setTab] = useRecoilState(BOOKS_TAB);

  return (
    <MotionStack
      variants={booksVar}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ position: "relative", py: 3, px: 5, height: "100%", flexGrow: 1 }}
    >
      <Bookmarks
        labels={["Scene", "Props"]}
        value={tab}
        onChange={(tab) => setTab(tab)}
      />

      <MotionStack
        sx={{
          bgcolor: "custom.content",
          flexGrow: 1,
          borderRadius: "0 50px 5px 5px",
        }}
        variants={orchestrationVar({ delay: 0.15, stagger: 0.05 })}
        key={tab}
      >
        <Box sx={{ mt: "55px" }}>
          <BooksHeader tab={tab} />
        </Box>

        <Divider flexItem variant="middle" />

        <Box sx={{ flexGrow: 1, height: "1px", overflowY: "auto" }}>
          <BooksContent tab={tab} />
        </Box>
      </MotionStack>

      <BooksCarousels />
    </MotionStack>
  );
}
