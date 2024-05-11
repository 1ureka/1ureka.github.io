import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Grow, Paper, Popper, ClickAwayListener } from "@mui/material";
import { Button, ButtonGroup, MenuItem, MenuList } from "@mui/material";
import { CircularProgress } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { CONVERT_SIZE, CONVERT_TYPE } from "../../../utils/store";
import { CONVERT_INPUT, CONVERT_PROCESSING } from "../../../utils/store";
import { compressImage } from "../../../utils/utils";

function MenuItems({ onClose, TransitionProps, placement }) {
  const [type, setType] = useRecoilState(CONVERT_TYPE);

  const options = [
    { label: "To webp", type: "webp" },
    { label: "To jpg", type: "jpeg" },
    { label: "To png", type: "png" },
  ];

  const handleClick = (i) => () => {
    setType(options[i].type);
    onClose();
  };

  const anchorPos = {
    transformOrigin: placement === "bottom" ? "center top" : "center bottom",
  };

  return (
    <Grow {...TransitionProps} style={anchorPos}>
      <Paper elevation={10}>
        <ClickAwayListener onClickAway={onClose}>
          <MenuList autoFocusItem>
            {options.map((option, i) => (
              <MenuItem
                key={option.label}
                selected={type === option.type}
                onClick={handleClick(i)}
                sx={(theme) => theme.typography.caption}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Grow>
  );
}

function Menu({ open, onClose, anchorEl }) {
  return (
    <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps, placement }) => (
        <MenuItems
          onClose={onClose}
          TransitionProps={TransitionProps}
          placement={placement}
        />
      )}
    </Popper>
  );
}

function Progress() {
  return (
    <CircularProgress
      size={30}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      }}
    />
  );
}

function useAction() {
  const [loading, setLoading] = useRecoilState(CONVERT_PROCESSING);
  const [input, setInput] = useRecoilState(CONVERT_INPUT);
  const type = useRecoilValue(CONVERT_TYPE);
  const size = useRecoilValue(CONVERT_SIZE);

  const action = async () => {
    setLoading(true);

    /** @type {string[]} */
    const names = input.map((file) => file.name);
    const results = await Promise.all(
      input.map((file) => compressImage(file, type, size))
    );

    setInput([]);
    const list = results.map((result, i) => ({ name: names[i], ...result }));
    list.forEach(({ dataUrl, name }) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${name.substring(0, name.lastIndexOf("."))}.${type}`;
      link.click();
    });

    setLoading(false);
  };

  return { action, loading };
}

export default function SplitButton() {
  const type = useRecoilValue(CONVERT_TYPE);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { action, loading } = useAction();
  const handleClick = () => {
    setOpen(false);
    action();
  };

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (e) => {
    if (!anchorRef.current) {
      return;
    } else if (!e) {
      setOpen(false);
    } else if (!anchorRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        size="small"
        disabled={loading}
        sx={{ position: "relative" }}
      >
        <Button
          onClick={handleClick}
          sx={(theme) => ({ ...theme.typography.caption, flex: 1 })}
        >
          {`To ${type}`}
        </Button>
        <Button onClick={handleToggle} size="small">
          <ArrowDropDownRoundedIcon fontSize="small" />
        </Button>
        {loading && <Progress />}
      </ButtonGroup>
      <Menu open={open} onClose={handleClose} anchorEl={anchorRef.current} />
    </React.Fragment>
  );
}
