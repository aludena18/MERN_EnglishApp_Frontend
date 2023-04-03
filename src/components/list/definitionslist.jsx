import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import { v4 as uuidv4 } from "uuid";

export default function Definitionslist(props) {
  const theme = useTheme();
  const [input, setInput] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState({
    idxSpch: null,
    idxDef: null,
  });
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [cardDetails, setCardDetails] = React.useState({
    idCard: "",
    word: "",
    partOfSpeech: "",
    definition: "",
    example: "",
  });

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleClick = function (e, index, indx, pSpeech) {
    setCardDetails({
      idCard: uuidv4(),
      word: props.meanings[0].word,
      partOfSpeech: pSpeech,
      definition: e.target.textContent,
      example: "",
    });
    setSelectedIndex({
      idxSpch: index,
      idxDef: indx,
    });
    setIsExpanded(true);
  };

  const handleOnChange = function (e) {
    setInput(e.target.value);
    setCardDetails((prev) => {
      return { ...prev, ["example"]: e.target.value };
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    props.add(cardDetails);
    setInput("");
    setCardDetails({
      idCard: "",
      word: "",
      partOfSpeech: "",
      definition: "",
      example: "",
    });
  };

  return (
    <div>
      {!props.warning ? (
        props.meanings[0].meanings.map((group, index) => (
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
                  {group.definitions.map((word, indx) => (
                    <ListItem key={indx} disablePadding>
                      <ListItemButton
                        onClick={(e) =>
                          handleClick(e, index, indx, group.partOfSpeech)
                        }
                        selected={
                          selectedIndex.idxSpch === index &&
                          selectedIndex.idxDef === indx
                        }
                      >
                        <ListItemIcon>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <Typography variant="body2">
                          {word.definition}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              {isExpanded && selectedIndex.idxSpch === index && (
                <div style={{}}>
                  <Divider />
                  <Paper
                    onSubmit={handleSubmit}
                    component="form"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      width: "100%",
                    }}
                  >
                    <InputBase
                      onChange={handleOnChange}
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Add an example..."
                      inputProps={{ "aria-label": "search google maps" }}
                      value={input}
                    />
                    <Zoom
                      in={true}
                      timeout={transitionDuration}
                      style={{
                        transitionDelay: `${transitionDuration.exit}ms`,
                      }}
                      unmountOnExit
                    >
                      <Fab
                        onClick={handleSubmit}
                        size="small"
                        color="primary"
                        aria-label="add"
                        sx={{ m: 1 }}
                      >
                        <AddIcon />
                      </Fab>
                    </Zoom>
                  </Paper>
                </div>
              )}
            </Card>
          </Container>
        ))
      ) : (
        <Container sx={{ textAlign: "center", pt: 4 }}>
          <Typography variant="h6" component="div">
            {props.meanings[0].message}
          </Typography>
        </Container>
      )}
    </div>
  );
}
