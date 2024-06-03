import { useRecoilState } from "recoil";
import { MANAGER_DRY_MODE } from "../../../utils/store";
import { Typography, Switch } from "@mui/material";
import { FormControl, FormControlLabel, FormHelperText } from "@mui/material";

export default function DryModeSwitch() {
  const [isDry, setDry] = useRecoilState(MANAGER_DRY_MODE);

  return (
    <FormControl variant="standard">
      <FormControlLabel
        control={
          <Switch checked={isDry} onChange={(e) => setDry(e.target.checked)} />
        }
        label={"dry mode"}
      />
      <FormHelperText>
        <Typography variant="caption">
          Simulates actions without affecting backend data.
        </Typography>
      </FormHelperText>
    </FormControl>
  );
}
