import { useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";

import { BOOKS_SELECTED } from "../../utils/store";
import Backdrop from "./carousels/Backdrop";
import CarouselsImage from "./image/CarouselsImage";

export default function Carousels() {
  const selected = useRecoilValue(BOOKS_SELECTED);
  const open = selected !== -1;
  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <CarouselsImage />
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
