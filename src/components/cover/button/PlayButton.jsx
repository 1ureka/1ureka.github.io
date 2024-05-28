import { Checkbox, Tooltip } from "@mui/material";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

export default function PlayButton({ value, onChange }) {
  return (
    <Tooltip
      title={value ? "Play Animation" : "Pause Animation"}
      placement="left"
    >
      <Checkbox
        icon={<PauseRoundedIcon />}
        checkedIcon={<PlayArrowRoundedIcon />}
        onChange={({ target }) => onChange(target.checked)}
        checked={value}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
      />
    </Tooltip>
  );
}
