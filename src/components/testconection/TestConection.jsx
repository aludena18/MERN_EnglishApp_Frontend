import React from "react";
import { Container, AppBar, Typography } from "@mui/material";
import { Search } from "./Search.jsx";

const testConection = function (props) {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="primary">
        <Typography variant="h6" align="left">
          {props.barLabel}
        </Typography>
      </AppBar>
      <Search />
    </Container>
  );
};

export default testConection;
