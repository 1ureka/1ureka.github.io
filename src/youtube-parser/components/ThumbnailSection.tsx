import { videoStore } from "@/youtube-parser/utils/store";
import { Box, type SxProps, Typography } from "@mui/material";
import { memo } from "react";

/** ThumbnailSection 內部的 CSS class 名稱，用於區分「無縮圖」與「有縮圖」兩種佈局 */
const classNames = {
  nothing: "thumbnail-section-nothing",
  hasThumbnails: "thumbnail-section-has-thumbnails",
};

/**
 * ThumbnailSection 根元素樣式。
 * - `.nothing`：置中顯示提示文字
 * - `.hasThumbnails`：2 欄 grid，第一張（large）橫跨整列
 */
const style: SxProps = {
  borderRadius: 2,
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "border.main",
  p: 3,
  display: "grid",

  [`&.${classNames.nothing}`]: {
    placeItems: "center",
    "& .MuiTypography-root": {
      color: "text.secondary",
    },
  },

  [`&.${classNames.hasThumbnails}`]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 2.5,
  },

  [`&.${classNames.hasThumbnails} > div`]: {
    display: "grid",
    placeItems: "center",
  },

  [`&.${classNames.hasThumbnails} > div img`]: {
    maxWidth: 1,
    maxHeight: 300,
    borderRadius: 2,
  },

  [`&.${classNames.hasThumbnails} > div:first-of-type`]: {
    gridColumn: "1 / -1",
  },

  [`&.${classNames.hasThumbnails} > div:first-of-type img`]: {
    maxWidth: 1,
    maxHeight: 500,
  },
};

/** 縮圖展示區塊：顯示 large / medium / small 三種尺寸的影片縮圖預覽 */
const ThumbnailSection = memo(() => {
  const thumbnails = videoStore((s) => s.thumbnails);

  if (!thumbnails) {
    return (
      <Box className={classNames.nothing} sx={style}>
        <Typography variant="subtitle1">影片縮圖會在成功解析後顯示</Typography>
      </Box>
    );
  }

  return (
    <Box className={classNames.hasThumbnails} sx={style}>
      <div>
        <img src={thumbnails.large} alt="Large Thumbnail" />
      </div>
      <div>
        <img src={thumbnails.medium} alt="Medium Thumbnail" />
      </div>
      <div>
        <img src={thumbnails.small} alt="Small Thumbnail" />
      </div>
    </Box>
  );
});

export { ThumbnailSection };
