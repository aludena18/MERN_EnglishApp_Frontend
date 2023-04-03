import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Item from "./item";

export default function Cardlist(props) {
  return (
    <Container>
      {props.meanings[0].meanings.map((group, index) => (
        <Container key={index} sx={{ pt: 2 }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.meanings[0].word}
              </Typography>
              <Typography color="text.secondary">
                {group.partOfSpeech}
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <List>
                {group.definitions.map((word, index) => (
                  <Item
                    key={index}
                    id={index}
                    speech={group.partOfSpeech}
                    definition={word.definition}
                    setdefs={props.setdefs}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </Container>
      ))}
    </Container>
  );
}
