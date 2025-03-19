import { Autocomplete, Menu, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { posts } from "../utils/test";

const tags = posts.flatMap((post) => post.tags).reduce((acc, tag) => acc.add(tag), new Set<string>());

const TopicSelect = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value === null) return;
    if (value === "顯示全部") return (window.location.href = "?");
    window.location.href = `?topic=${value.trim()}`;
  };

  return (
    <>
      <Tooltip title="換一個主題" arrow>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "text.secondary",
            "&:hover": { cursor: "pointer", textDecoration: "underline", color: "text.primary" },
          }}
          onClick={handleOpen}
        >
          #{urlParams.get("topic") ?? "全部"}
        </Typography>
      </Tooltip>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: { sx: { borderRadius: 3, scale: "0.9" } },
          list: {
            disablePadding: true,
            dense: true,
            component: "div",
            sx: { p: 1, pl: 1.5, pt: 0 },
          },
        }}
      >
        <Autocomplete
          options={["顯示全部", ...Array.from(tags)]}
          value={urlParams.get("topic") ?? ""}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} autoFocus label="主題" variant="standard" size="small" sx={{ minWidth: 150 }} />
          )}
        />
      </Menu>
    </>
  );
};

export { TopicSelect };
