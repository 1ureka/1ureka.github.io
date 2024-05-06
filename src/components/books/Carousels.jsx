import { useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";

import { BOOKS_OPEN } from "../../utils/store";
import Backdrop from "./carousels/Backdrop";
import Info from "./carousels/Info";
import Slides from "./carousels/Slides";
import Image from "./carousels/Image";

export default function Carousels() {
  const open = useRecoilValue(BOOKS_OPEN);
  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <Image />
          <Slides />
          <Info />
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
