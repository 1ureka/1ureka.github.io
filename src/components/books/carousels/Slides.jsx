import { useRecoilValue } from "recoil";
import { MotionStack } from "../../Motion";
import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import SlidesImage from "../image/SlidesImage";
import { Stack } from "@mui/material";

function Item({ category, name, selected }) {
  const sx = {
    opacity: selected ? 1 : 0.85,
    scale: selected ? "0.9" : "0.65",
    translate: "0 -50%",
    transformOrigin: "right",
  };
  return <SlidesImage category={category} name={name} sx={sx} />;
}

export default function Slides() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);

  return (
    <MotionStack
      sx={{
        position: "absolute",
        right: "1%",
        top: 0,
        width: "12.5%",
        translate: `0 calc(50vh + (-100% / ${rows.length}) * ${selected})`,
      }}
    >
      {rows.map(({ category, name }, i) => (
        <Item
          key={name}
          category={category}
          name={name}
          selected={i === selected}
        />
      ))}
    </MotionStack>
  );
}
