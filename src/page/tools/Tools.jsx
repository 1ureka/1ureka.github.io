import { useRecoilState } from "recoil";
import { Box, Divider } from "@mui/material";
import { TOOLS_TAB } from "../../utils/store";

import { MotionStack } from "../../components/Motion";
import { orchestrationVar, toolsVar } from "../../components/Motion";

import Bookmarks from "../../components/Bookmarks";
import ToolsHeader from "./header/ToolsHeader";
import FileManager from "./content/FileManager";
import ImageEditor from "./content/ImageEditor";

function Content({ tab }) {
  switch (tab) {
    case "manager":
      return <FileManager />;
    case "editor":
      return <ImageEditor />;
    case "toNormal":
      return null; // todo
    default:
      return null;
  }
}

export default function Page() {
  const [tab, setTab] = useRecoilState(TOOLS_TAB);

  return (
    <MotionStack
      variants={toolsVar}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ position: "relative", py: 3, px: 5, height: "100%", flexGrow: 1 }}
    >
      <Bookmarks
        labels={["Manager", "Editor"]}
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
          <ToolsHeader tab={tab} />
        </Box>

        <Divider flexItem variant="middle" />

        <Box
          sx={{
            position: "relative",
            flexGrow: 1,
            height: "1px",
            overflowY: "visible",
            p: 3,
          }}
        >
          <Content tab={tab} />
        </Box>
      </MotionStack>
    </MotionStack>
  );
}
