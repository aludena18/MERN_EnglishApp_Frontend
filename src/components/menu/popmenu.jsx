import React, { useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = ["Dictionary", "Vocab", "Phrases"];

export default function SplitButton(props) {
  const anchorRef = props.anchor;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (options.indexOf(props.title) < 0) return;
    updateSelectedIndex(options.indexOf(props.title));
  });

  const updateSelectedIndex = function (index) {
    setSelectedIndex(index);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    props.changeTitle(options[index]);
    props.toggle();
    props.routes(options[index]);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    props.toggle();
  };

  return (
    <Popper
      sx={{
        zIndex: 1
      }}
      open={props.open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement="bottom-start"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList id="split-button-menu" autoFocusItem>
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
