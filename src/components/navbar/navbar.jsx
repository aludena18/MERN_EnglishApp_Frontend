// import * as React from "react";
// import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Popmenu from "../menu/popmenu";
import Customdrawer from "../drawer/Customdrawer";

// icons
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NoteIcon from "@mui/icons-material/Note";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// axios
import axios from "../axios.js";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  // const [open, setOpen] = React.useState(false);
  const [stateDrawer, setStateDrawer] = React.useState(false);
  const [title, setTitle] = React.useState("App");
  const [input, setInput] = React.useState("");
  const anchorPopMenuRef = React.useRef(null);

  const iconStyle = {
    fontSize: 20,
  };

  const routes = [
    // {
    //   route: "main",
    //   title: "App",
    //   icon: <HomeIcon sx={iconStyle} />,
    // },
    {
      route: "dic",
      title: "Dictionary",
      icon: <LocalLibraryIcon sx={iconStyle} />,
    },
    {
      route: "vcards",
      title: "Vocabulary",
      icon: <NoteIcon sx={iconStyle} />,
    },
    {
      route: "pcards",
      title: "Phrases",
      icon: <FavoriteIcon sx={iconStyle} />,
    },
  ];

  const appSettingsLabels = [
    {
      name: "Change Mode",
      icon: <Brightness4Icon sx={iconStyle} />,
    },
    {
      name: "Help",
      icon: <HelpOutlineIcon sx={iconStyle} />,
    },
  ];

  useEffect(() => {
    const r = routes.filter((route) => route.route === props.title.slice(1));
    if (!r[0]) return;
    changeTitle(r[0].title);
  });

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };
  const changeThemeMode = function (index) {
    if (index === 0) props.handleThemeMode();
  };

  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setStateDrawer(open);
  };

  const handleInputChange = function (e) {
    setInput(e.target.value);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    //console.log(input);
    props.sendRequest("getMeaning", input);
    // sendRequest(input);
    setInput("");
    // getResponse();
  };

  const sendRequest = async (data) => {
    try {
      await axios.post("/search", {
        query: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getResponse = async () => {
    const res = await axios.get("/sync");
    console.log(res.data);
    // setMessage(res.data.search);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} ref={anchorPopMenuRef}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {title}
            </Typography>
            <Search onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleInputChange}
                placeholder="Search…"
                value={input}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Customdrawer
        state={stateDrawer}
        toggleDrawer={toggleDrawer}
        routes={routes}
        handleRoutes={props.handleRoutes}
        settingsLabels={appSettingsLabels}
        changeThemeMode={changeThemeMode}
      />
    </div>
  );
}
