import * as React from "react";
import { Tab, Tabs } from "@mui/material";

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

export default function ContentTabs({ labels, value, onChange }) {
  return (
    <StyledTabs value={value} onChange={(_, val) => onChange(val)}>
      {labels.map((label) => (
        <StyledTab key={label} label={label} value={label.toLowerCase()} />
      ))}
    </StyledTabs>
  );
}
