import { useRecoilValue } from "recoil";
import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useBooksImageLoad } from "../../../utils/hooks";

export default function Thumbnail() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { category, name } = rows[selected];
  const [src, state] = useBooksImageLoad(category, name, "1K");

  const sx = {
    position: "absolute",
    width: "100%",
    height: "100%",
    scale: "1.1",
    filter: "blur(5px) brightness(0.8)",
  };

  return state && <img style={sx} src={src} alt={name}></img>;
}
