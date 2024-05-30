import { useState } from "react";
import { MotionBox, booksItemVar } from "../../../components/Motion";
import { Badge, ButtonBase } from "@mui/material";
import { GalleryImage } from "../../../components/books";

export default function BooksContentItem({ category, name, onClick, amount }) {
  const [hover, setHover] = useState(false);

  return (
    <MotionBox
      layout
      variants={booksItemVar}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02, filter: "brightness(1.05)", rotate: 2 }}
    >
      <Badge badgeContent={amount} color="primary" sx={{ width: 1 }}>
        <ButtonBase
          sx={{ display: "block", width: 1, borderRadius: 1, overflow: "clip" }}
          onClick={onClick}
        >
          <GalleryImage category={category} name={name} reflect={hover} />
        </ButtonBase>
      </Badge>
    </MotionBox>
  );
}
