import { useRecoilState } from "recoil";
import { TOOLS_TAB } from "../../utils/store";
import { toolsVar } from "../../components/Motion";

import Bookmarks from "../../components/Bookmarks";
import ToolsHeader from "./header/ToolsHeader";

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

        <Box sx={{ flexGrow: 1, height: "1px", overflowY: "auto" }}>
          {HelloWorld}
        </Box>
      </MotionStack>
    </MotionStack>
  );
}
