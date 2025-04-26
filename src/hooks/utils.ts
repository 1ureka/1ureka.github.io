import { useCallback, useEffect, useRef, useState } from "react";

const useAnchorEl = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl((prev) => (prev ? null : event.currentTarget)),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);

  return { anchorEl, handleOpen, handleClose };
};

export { useAnchorEl };
