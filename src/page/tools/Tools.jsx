import { useRecoilValue } from "recoil";
import { Typography } from "@mui/material";
import { TOOLS_TAB } from "../../utils/store";
import { MotionStack, toolsItemVar } from "../../components/Motion";

import Manager from "../../components/manager/Manager";
import Editor from "../../components/editor/Editor";
import Layout from "../../components/Layout";

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

function Header() {
  const tab = useRecoilValue(TOOLS_TAB);
  const { title, info } = intro[tab];
  return (
    <>
      <MotionStack variants={toolsItemVar} sx={{ p: 3 }}>
        <Typography variant="h6">{title}</Typography>
      </MotionStack>
      <MotionStack
        variants={toolsItemVar}
        sx={{ flexGrow: 1, p: 3, alignItems: "center" }}
      >
        <Typography variant="body2">{info}</Typography>
      </MotionStack>
    </>
  );
}

function Content() {
  const tab = useRecoilValue(TOOLS_TAB);
  switch (tab) {
    case "manager":
      return <Manager />;
    case "editor":
      return <Editor />;
    case "toNormal":
      return null; // todo
    default:
      return null;
  }
}

export default function Page() {
  return (
    <Layout
      tabState={TOOLS_TAB}
      tabs={["Manager", "Editor"]}
      header={<Header />}
      content={<Content />}
      scroll={false}
    />
  );
}
