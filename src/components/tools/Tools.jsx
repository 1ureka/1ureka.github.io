import { Stack } from "@mui/material";
import Convert from "./convert/Convert";

export default function Tools() {
  return (
    <Stack direction="row" flexWrap="wrap">
      <Convert />
    </Stack>
  );
}
