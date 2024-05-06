import { useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { BOOKS_OPEN, THEME } from "../../../utils/store";

export default function Backdrop({ children }) {
  const setOpen = useSetRecoilState(BOOKS_OPEN);
  const theme = useRecoilValue(THEME);
  return (
    <motion.div
      variants={{
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
      }}
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
      onClick={() => setOpen(false)}
    >
      {children}
    </motion.div>
  );
}
