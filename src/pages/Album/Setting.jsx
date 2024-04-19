import { Dialog, DialogContent, Tooltip } from "@mui/material";
import { IconButton, Typography, Slider, Stack } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExposureRoundedIcon from "@mui/icons-material/ExposureRounded";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";

import { useRecoilState } from "recoil";
import { ALBUM_FILTER } from "../../utils/store";

function CloseButton({ onClose }) {
  const closeButtonSx = { position: "absolute", top: 10, right: 10, zIndex: 1 };
  return (
    <Tooltip title={"Close"} placement="top">
      <IconButton size="small" onClick={onClose} sx={closeButtonSx}>
        <CloseRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

function Label({ icon, title }) {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
      {icon}
      <Typography>{title}</Typography>
    </Stack>
  );
}

function Control({ icon, title, value, onChange }) {
  const sliderProps = {
    min: 0.5,
    max: 1.5,
    step: 0.1,
    valueLabelDisplay: "auto",
  };
  return (
    <>
      <Label icon={icon} title={title} />
      <Slider value={value} marks {...sliderProps} onChange={onChange} />
    </>
  );
}

export default function Setting({ onClose, open }) {
  const iconProps = { fontSize: "small", sx: { color: "text.secondary" } };
  const exposureIcon = <ExposureRoundedIcon {...iconProps} />;
  const saturateIcon = <ColorLensRoundedIcon {...iconProps} />;
  const contrastIcon = <ColorLensRoundedIcon {...iconProps} />;

  const [filter, setFilter] = useRecoilState(ALBUM_FILTER);
  const handleBrightness = (_, val) =>
    setFilter((prev) => ({ ...prev, brightness: val }));
  const handleSaturate = (_, val) =>
    setFilter((prev) => ({ ...prev, saturate: val }));
  const handleContrast = (_, val) =>
    setFilter((prev) => ({ ...prev, contrast: val }));

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogContent sx={{ p: 3.5 }}>
        <CloseButton onClose={onClose} />
        <Control
          icon={exposureIcon}
          title={"Exposure"}
          value={filter.brightness}
          onChange={handleBrightness}
        />
        <Control
          icon={saturateIcon}
          title={"Saturation"}
          value={filter.saturate}
          onChange={handleSaturate}
        />
        <Control
          icon={contrastIcon}
          title={"Contrast"}
          value={filter.contrast}
          onChange={handleContrast}
        />
      </DialogContent>
    </Dialog>
  );
}
