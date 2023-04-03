import * as React from "react";
import Container from "@mui/material/Container";
import CardApp from "./cardapp";

export default function Cardslist(props) {
  const handleDeleteCard = function (id) {
    props.deleteCard(id);
  };
  return (
    <div>
      <Container
        maxWidth="xl"
        key={1}
        sx={{
          pt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {props.cards.map((card, index) => (
          <CardApp
            key={index}
            title={card.word}
            subtitle={card.partOfSpeech}
            content={card.definition}
            example={card.example}
            id={card.idCard}
            deleteCard={handleDeleteCard}
          />
        ))}
      </Container>
    </div>
  );
}
