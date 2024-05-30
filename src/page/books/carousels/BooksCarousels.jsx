import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence, useMotionValue } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";

import { MotionBox, carouselsVar } from "../../../components/Motion";
import { carouselsImageVar } from "../../../components/Motion";
import { carouselsSlidesVar } from "../../../components/Motion";

import { BOOKS_OPEN, BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";

import { LeftClickIcon, RightClickIcon } from "../../../components/books";
import { ImageSlides, IndexDisplay } from "../../../components/books";
import BooksCarouselsImage from "./BooksCarouselsImage";

export default function BooksCarousels() {
  const backdropSx = {
    zIndex: (theme) => theme.zIndex.drawer - 1,
    bgcolor: "custom.backdrop",
    position: "absolute",
    inset: 0,
  };

  const [open, setOpen] = useRecoilState(BOOKS_OPEN);
  const pointerEvents = useMotionValue("");
  const handleContextMenu = (e) => {
    e.preventDefault();
    setOpen(false);
    pointerEvents.set("none");
  };
  const handleAnimateStart = (e) => {
    if (e === "animate") pointerEvents.set("");
  };

  const rows = useRecoilValue(BOOKS_ROWS);
  const [selected, setSelected] = useRecoilState(BOOKS_SELECTED);
  const handleWheel = (e) => {
    const change = e.deltaY > 0 ? 1 : -1;
    setSelected((prev) => (prev + change + rows.length) % rows.length);
  };

  const selectedRow = rows[selected] || {};
  const { category, name } = selectedRow;

  return (
    <AnimatePresence>
      {open && (
        <MotionBox
          variants={carouselsVar}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ pointerEvents }}
          sx={backdropSx}
          onContextMenu={handleContextMenu}
          onWheel={handleWheel}
          onAnimationStart={handleAnimateStart}
        >
          <Box
            position="fixed"
            sx={{ inset: 0, display: "grid", placeItems: "center" }}
          >
            <MotionBox
              variants={carouselsImageVar}
              sx={{
                position: "relative",
                display: "grid",
                placeItems: "center",
                overflow: "clip",
                width: "75vw",
                height: "77.5vh",
                maxWidth: "calc(75vh * (16 / 9))",
                maxHeight: "calc(75vw * (9 / 16))",
              }}
            >
              {/* <BooksCarouselsImage category={category} name={name} /> */}
              <Box sx={{ bgcolor: "gray", position: "absolute", inset: 0 }} />
            </MotionBox>

            <Typography
              variant="h6"
              sx={{ position: "absolute", bottom: "3%" }}
            >
              {name}
            </Typography>
          </Box>

          <MotionBox
            sx={{ position: "absolute", inset: "0 1% auto auto" }}
            width="12.5%"
            variants={carouselsSlidesVar}
          >
            <ImageSlides rows={rows} selected={selected} />
          </MotionBox>

          <Box sx={{ position: "absolute", inset: "3% 10% 3% 2%" }}>
            <Stack
              direction="row"
              alignItems="ceter"
              spacing={3.5}
              sx={{ color: "text.secondary" }}
            >
              <Stack direction="row" alignItems="ceter" spacing={1}>
                <RightClickIcon fontSize="small" />
                <Typography variant="caption">exit</Typography>
              </Stack>

              <Stack direction="row" alignItems="ceter" spacing={1}>
                <LeftClickIcon fontSize="small" />
                <PhotoRoundedIcon fontSize="small" />
                <Typography variant="caption">fullscreen</Typography>
              </Stack>
            </Stack>

            <Typography
              variant="body2"
              sx={{ position: "absolute", inset: "auto 0 0 auto" }}
            >
              SCROLL TO DISCOVER MORE
            </Typography>

            <Box sx={{ position: "absolute", inset: "auto auto 0 0" }}>
              <IndexDisplay current={selected + 1} total={rows.length} />
            </Box>
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
