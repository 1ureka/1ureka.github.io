import * as React from "react";
import { Grow, Paper, Popper, ClickAwayListener } from "@mui/material";
import { Button, ButtonGroup, MenuItem, MenuList } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const options = ["To webp", "To jpg", "To png"];

function Menu({ selected, onSelect, onClose, TransitionProps, placement }) {
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
                key={option}
                selected={i === selected}
                onClick={() => onSelect(i)}
                sx={(theme) => theme.typography.caption}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Grow>
  );
}

export default function SplitButton() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };
  const handleMenuItemClick = (i) => {
    setSelectedIndex(i);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (e) => {
    if (anchorRef.current?.contains(e.target)) return;
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} size="small">
        <Button
          onClick={handleClick}
          sx={(theme) => ({ ...theme.typography.caption, flex: 1 })}
        >
          {options[selectedIndex]}
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
            selected={selectedIndex}
            onSelect={handleMenuItemClick}
            onClose={handleClose}
            TransitionProps={TransitionProps}
            placement={placement}
          />
        )}
      </Popper>
    </React.Fragment>
  );
}
