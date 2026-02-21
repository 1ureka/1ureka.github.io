import { Box, Button, Divider, type SxProps, TextField, Typography } from "@mui/material";
import AddLinkRoundedIcon from "@mui/icons-material/AddLinkRounded";
import { generateMuiColorMix } from "@/utils/commonSx";
import { memo } from "react";

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
const Input = memo(() => {
  return (
    <TextField
      id="link-input"
      placeholder="貼上 YouTube 網址 (支援 youtu.be 或 watch?v=)"
      variant="outlined"
      size="small"
      fullWidth
      slotProps={{ input: { className: "link-outlined-input" } }}
      sx={inputStyle}
    />
  );
});

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
const style: SxProps = {
  borderRadius: 2,
  bgcolor: "background.paper",
  p: 3,
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
const FormSection = memo(() => (
  <Box sx={style}>
    <div className={classNames.dropArea}>
      <div className={classNames.dropAreaLayout}>
        <AddLinkRoundedIcon sx={{ fontSize: 40, color: "inherit" }} />
        <Typography variant="subtitle1" component="p" sx={{ color: "inherit" }}>
          將影片連結拖曳至此處
        </Typography>
      </div>
    </div>

    <Divider className={classNames.divider} flexItem>
      <Typography className={classNames.dividerText} variant="body1">
        或者
      </Typography>
    </Divider>

    <div className={classNames.inputWrapper}>
      <Input />
      <Button className={classNames.inputButton} variant="contained" disableElevation>
        <Typography variant="button">解析</Typography>
      </Button>
    </div>
  </Box>
));

export { FormSection };
