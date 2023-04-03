import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Item = function (props) {
  const [selected, setSelected] = React.useState(false);

  const handleClick = function () {
    console.log(props.id, props.speech);
    if (!selected) {
      props.setdefs((prev) => [
        ...prev,
        {
          id: props.id,
          speech: props.speech,
          definition: props.definition
        }
      ]);
    } else {
      props.setdefs((prev) => {
        const prev_ = prev.filter(
          (item) => item.definition !== props.definition
        );
        console.log(prev_);
        return prev_;
      });
    }
    setSelected((prev) => !prev);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} selected={selected}>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        <Typography variant="body2">{props.definition}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default Item;
