import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Grow, Paper, Popper, ClickAwayListener } from "@mui/material";
import { Button, ButtonGroup, MenuItem, MenuList } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { CONVERT_SIZE, CONVERT_TYPE } from "../../../utils/store";
import { CONVERT_INPUT } from "../../../utils/store";

function Menu({ onClose, TransitionProps, placement }) {
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

export default function SplitButton() {
  const [input, setInput] = useRecoilState(CONVERT_INPUT);
  const type = useRecoilValue(CONVERT_TYPE);
  const size = useRecoilValue(CONVERT_SIZE);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    console.info(input, type, size);
    setInput([]);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
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
      <ButtonGroup variant="contained" ref={anchorRef} size="small">
        <Button
          onClick={handleClick}
          sx={(theme) => ({ ...theme.typography.caption, flex: 1 })}
        >
          {`To ${type}`}
        </Button>
        <Button onClick={handleToggle} size="small">
          <ArrowDropDownRoundedIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Menu
            onClose={handleClose}
            TransitionProps={TransitionProps}
            placement={placement}
          />
        )}
      </Popper>
    </React.Fragment>
  );
}
