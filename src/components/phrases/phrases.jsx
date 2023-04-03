import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import CardApp from "../card/cardapp";
import { v4 as uuidv4 } from "uuid";

export default function Phrases(props) {
  const [input, setInput] = React.useState({
    idPhrase: "",
    phrase: "",
    meaning: "",
  });

  const handleSubmit = function () {
    props.addPhrase(input);
    setInput({
      idPhrase: "",
      phrase: "",
      meaning: "",
    });
  };

  const handleOnChange = function (e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, ["idPhrase"]: uuidv4(), [name]: value };
    });
  };

  const handleDeleteCard = function (id) {
    props.deletePhrase(id);
  };

  return (
    <Container maxWidth="xl">
      <div>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            margin: "auto",
            py: 5,
          }}
        >
          <Paper
            onSubmit={handleSubmit}
            component="form"
            sx={{
              position: "relative",
              p: 1,
              width: "100%",
            }}
          >
            <InputBase
              name="phrase"
              onChange={handleOnChange}
              sx={{ px: 1, display: "block", width: "100%" }}
              placeholder="Add a phrase..."
              value={input.phrase}
            />
            <InputBase
              name="meaning"
              onChange={handleOnChange}
              sx={{ px: 1, display: "block", width: "100%" }}
              placeholder="Add the meaning..."
              value={input.meaning}
            />
            <Fab
              onClick={handleSubmit}
              size="small"
              color="primary"
              aria-label="add"
              sx={{ position: "absolute", right: -18, bottom: -18 }}
            >
              <AddIcon />
            </Fab>
          </Paper>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {props.phrases.map((phrase, index) => (
          <CardApp
            key={index}
            title={phrase.phrase}
            example={phrase.meaning}
            id={phrase.idPhrase}
            deleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </Container>
  );
}
