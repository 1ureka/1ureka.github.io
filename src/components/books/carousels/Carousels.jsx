import { Backdrop } from "@mui/material";
import { useRecoilState } from "recoil";
import { BOOKS_SELECTED } from "../../../utils/store";

export default function Carousels() {
  const [selected, setSelected] = useRecoilState(BOOKS_SELECTED);
  const open = selected !== -1;
  return (
    <Backdrop
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer - 1,
        bgcolor: "custom.backdrop",
      })}
      open={open}
      onClick={() => setSelected(-1)}
    ></Backdrop>
  );
}
