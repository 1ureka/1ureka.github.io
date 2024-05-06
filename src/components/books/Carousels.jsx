import { useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";

import { BOOKS_OPEN } from "../../utils/store";
import Backdrop from "./carousels/Backdrop";
import CarouselsImage from "./image/CarouselsImage";
import Info from "./carousels/Info";
import Slides from "./carousels/Slides";

export default function Carousels() {
  const open = useRecoilValue(BOOKS_OPEN);
  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <CarouselsImage />
          <Slides />
          <Info />
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
