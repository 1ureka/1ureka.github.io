import * as React from "react";
import { Box, Divider, Stack, Tab, Tabs } from "@mui/material";
import { MotionPage, MotionStack } from "../components/Motion";
import { orchestrationVar } from "../components/Motion";
import { useRecoilState } from "recoil";

function StyledTabs({ children, ...props }) {
  const sx = (theme) => ({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
  });
  return (
    <Tabs
      {...props}
      sx={sx}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    >
      {children}
    </Tabs>
  );
}

function StyledTab({ ...props }) {
  const sx = (theme) => ({
    // font
    textTransform: "none",
    fontWeight: theme.typography.caption.fontWeight,
    fontSize: theme.typography.caption.fontSize,
    // color
    backgroundColor: theme.palette.custom.unSelected,
    "&.Mui-selected": {
      backgroundColor: theme.palette.custom.content,
    },
    // hover
    paddingBottom: "30px",
    bottom: "-20px",
    "&:hover": {
      bottom: "-10px",
    },
    // other
    borderRadius: "15px 15px 0 0",
    marginRight: theme.spacing(0.5),
    transition: "all 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
  });
  return <Tab {...props} sx={sx} />;
}

function StyledTabBar({ labels, value, onChange }) {
  return (
    <StyledTabs value={value} onChange={(_, val) => onChange(val)}>
      {labels.map((label) => (
        <StyledTab key={label} label={label} value={label.toLowerCase()} />
      ))}
    </StyledTabs>
  );
}

export default function Layout({ tabState, tabs, header, content, scroll }) {
  const containerSx = (theme) => ({
    backgroundColor: theme.palette.custom.content,
    flexGrow: 1,
    borderRadius: "0 50px 5px 5px",
  });

  const contentSx = {
    flexGrow: 1,
    p: 3,
    height: "1px",
    overflowY: scroll ? "auto" : "visible",
    scrollbarGutter: scroll ? "stable" : "auto",
  };

  const containerVar = orchestrationVar({ delay: 0.15, stagger: 0.05 });

  const [tab, setTab] = useRecoilState(tabState);

  return (
    <MotionPage>
      <StyledTabBar labels={tabs} value={tab} onChange={(tab) => setTab(tab)} />
      <MotionStack sx={containerSx} variants={containerVar} key={tab}>
        <Box sx={{ height: 55 }}></Box>
        <Stack direction="row" alignItems="flex-end" width="100%" gap={1}>
          {header}
        </Stack>
        <Divider flexItem variant="middle" />
        <Box sx={contentSx}>{content}</Box>
      </MotionStack>
    </MotionPage>
  );
}
