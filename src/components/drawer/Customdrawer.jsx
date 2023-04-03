import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function CustomDrawer(props) {
  const handleItemClick = function (i) {
    props.handleRoutes(props.routes[i].route);
  };

  const handleSettingsClick = function (i) {
    console.log(i);
    props.changeThemeMode(i);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        {props.routes.map((route, index) => (
          <ListItem key={route.title} disablePadding>
            <ListItemButton onClick={() => handleItemClick(index)}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.settingsLabels.map((label, index) => (
          <ListItem key={label.name} disablePadding>
            <ListItemButton onClick={() => handleSettingsClick(index)}>
              <ListItemIcon>{label.icon}</ListItemIcon>
              <ListItemText primary={label.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor="left"
          open={props.state}
          onClose={props.toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
