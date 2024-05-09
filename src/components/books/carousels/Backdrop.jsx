import { useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";

import { BOOKS_OPEN, BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { THEME } from "../../../utils/store";

export default function Backdrop({ children }) {
  const setOpen = useSetRecoilState(BOOKS_OPEN);
  const setSelected = useSetRecoilState(BOOKS_SELECTED);
  const rows = useRecoilValue(BOOKS_ROWS);
  const theme = useRecoilValue(THEME);

  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        zIndex: theme.zIndex.drawer - 1,
        background: theme.palette.custom.backdrop,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        inset: 0,
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setOpen(false);
      }}
      onWheel={(e) => {
        const change = e.deltaY > 0 ? 1 : -1;
        setSelected((prev) => (prev + change + rows.length) % rows.length);
      }}
    >
      {children}
    </motion.div>
  );
}
