import { Box, Button, Divider, type SxProps, TextField, Typography } from "@mui/material";
import AddLinkRoundedIcon from "@mui/icons-material/AddLinkRounded";
import { generateMuiColorMix } from "@/utils/commonSx";
import { memo } from "react";
import { videoStore } from "@/youtube-parser/utils/store";
import { handleDragLeave, handleDragOver, handleDrop, handleSubmit } from "@/youtube-parser/utils/action";
import { handleInputChange, handleKeyDown } from "@/youtube-parser/utils/action";

/**
 * ?
 */
const classNames = {
  dropArea: "youtube-link-drop-area",
  dropAreaLayout: "youtube-link-drop-area-layout",
  divider: "form-divider",
  dividerText: "form-divider-text",
  inputWrapper: "link-input-wrapper",
  inputButton: "link-input-button",
};

/**
 * ?
 */
const inputStyle: SxProps = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: "border.main",
    borderWidth: 2,
  },
  "&:hover .link-outlined-input .MuiOutlinedInput-notchedOutline": {
    borderColor: generateMuiColorMix("border-main", "text-secondary", 50),
  },
  "& .Mui-focused.link-outlined-input .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },
};

/**
 * ?
 */
const style: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: 2.5,

  [`& .${classNames.dropArea}`]: {
    borderRadius: 2,
    bgcolor: "background.default",
    py: 7.5,
    display: "grid",
    placeItems: "center",
    border: "2px dashed",
    borderColor: "border.main",
    color: "text.secondary",
    transition: "all 0.15s",
  },

  [`& .${classNames.dropArea}.active`]: {
    bgcolor: generateMuiColorMix("primary-main", "background-paper", 10),
    borderColor: "primary.main",
    color: "primary.main",
  },

  [`& .${classNames.dropAreaLayout}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },

  [`& .${classNames.divider}::before, & .${classNames.divider}::after`]: {
    borderTopWidth: 2,
  },

  [`& .${classNames.dividerText}`]: {
    color: "text.secondary",
  },

  [`& .${classNames.inputWrapper}`]: {
    display: "flex",
    alignItems: "stretch",
  },

  [`& .${classNames.inputButton}`]: {
    borderRadius: 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    p: 0,
    px: 2.5,
    flexShrink: 0,
  },
};

/**
 * ?
 */
const Input = memo(() => {
  const inputValue = videoStore((s) => s.inputValue);
  const loading = videoStore((s) => s.loading);

  return (
    <div className={classNames.inputWrapper}>
      <TextField
        id="link-input"
        placeholder="貼上 YouTube 網址 (支援 youtu.be 或 watch?v=)"
        variant="outlined"
        size="small"
        fullWidth
        disabled={loading}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{ input: { className: "link-outlined-input" } }}
        sx={inputStyle}
      />
      <Button
        className={classNames.inputButton}
        variant="contained"
        loading={loading}
        onClick={handleSubmit}
        disableElevation
      >
        <Typography variant="button">解析</Typography>
      </Button>
    </div>
  );
});

/**
 * ?
 */
const DropArea = memo(() => {
  const dropActive = videoStore((s) => s.dropActive);

  return (
    <div
      className={classNames.dropArea + (dropActive ? " active" : "")}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className={classNames.dropAreaLayout}>
        <AddLinkRoundedIcon sx={{ fontSize: 40, color: "inherit" }} />
        <Typography variant="subtitle1" component="p" sx={{ color: "inherit" }}>
          將影片連結拖曳至此處
        </Typography>
      </div>
    </div>
  );
});

/**
 * ?
 */
const FormSection = memo(() => (
  <Box sx={style}>
    <DropArea />

    <Divider className={classNames.divider} flexItem>
      <Typography className={classNames.dividerText} variant="body1">
        或者
      </Typography>
    </Divider>

    <Input />
  </Box>
));

export { FormSection };
