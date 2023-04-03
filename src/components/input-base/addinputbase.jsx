import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";

export default function AddInputBase(props) {
  const [input, setInput] = React.useState("");

  const styles = {
    display: "flex",
    alignItems: "center",
    p: "2px 4px",
    minWidth: 275,
    mx: "auto"
  };

  const stylesContainer = {
    py: 2
    // bgcolor: "background.default"
  };

  const handleOnChange = function (e) {
    setInput(e.target.value);
    props.example(e.target.value);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    props.add();
    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: props.enable ? "block" : "none"
      }}
    >
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, py: 0.5 }}
      >
        <Paper onSubmit={handleSubmit} component="form" sx={styles}>
          <InputBase
            onChange={handleOnChange}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Example"
            inputProps={{ "aria-label": "search google maps" }}
            value={input}
          />
          <IconButton
            type="button"
            onClick={handleSubmit}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <AddIcon />
          </IconButton>
        </Paper>
      </AppBar>
    </div>
  );
}
