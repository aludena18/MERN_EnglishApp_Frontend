import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar/navbar";
import Definitionslist from "./components/list/definitionslist";
import Cardslist from "./components/card/cardslist";
import Phrases from "./components/phrases/phrases";
import { useLocation, Route } from "wouter";
import useWebSocket from "react-use-websocket";
import axios from "./components/axios.js";

//const WS_URL = "ws://127.0.0.1:9000";
const WS_URL = "wss://engappbackend.onrender.com";

const App = function () {
  const [location, setLocation] = useLocation();
  const [warning, setWarning] = useState(true);
  const [definitions, setDefinitions] = React.useState([
    { message: "Please search for a word" },
  ]);
  const [cardsList, setCardsList] = React.useState([]);
  const [phrasesList, setPhrasesList] = React.useState([]);
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: themeMode,
    },
    width: 1,
  });

  // Websocket
  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage } =
    useWebSocket(WS_URL, {
      onOpen: () => {
        //console.log("WebSocket connection established.");
      },
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    });

  // Sending the request to the server through the Websocket
  function sendRequest(type, data) {
    sendJsonMessage({
      type: type,
      content: data,
    });
  }

  // Sending a request through Axios
  async function sendPostRequest(route, data) {
    await axios.post(`/${route}`, data);
  }
  async function sendDeleteRequest(route, id) {
    //console.log(id);
    await axios.post(`/${route}`, { id: id });
  }

  // Receiving the data from the server in real time
  useEffect(() => {
    // console.log("useEffect");
    setLocation("/dic");
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      //console.log(data);
      if (data.type === "usrRes") {
        setCardsList(data.content[0].cards);
        setPhrasesList(data.content[0].phrases);
      }
      if (data.type === "defRes") {
        setWarning(false);
        setDefinitions(data.content);
        setLocation("/dic");
      }
      if (data.type === "errRes") {
        setWarning(true);
        setDefinitions(data.content);
        setLocation("/dic");
      }
    }
  }, [lastMessage, setDefinitions]);

  // Manage the theme mode
  const handleThemeMode = function () {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Manage the routes
  const handleRoutes = function (route) {
    setLocation(`/${route}`);
  };

  // Add card
  const addCard = function (cardDetails) {
    // Add card to the local array
    setCardsList((prev) => [...prev, cardDetails]);
    setLocation(`/vcards`);

    // Send card to the server
    sendPostRequest("addCard", cardDetails);
  };

  // Delete card
  const deleteCard = function (id) {
    setCardsList((prev) => {
      return prev.filter((card, _) => card.idCard !== id);
    });
    sendDeleteRequest("delCard", id);
  };

  // Add phrase
  const addPhrase = function (phraseDetails) {
    // Add phrase to local array
    setPhrasesList((prev) => [...prev, phraseDetails]);

    // Send phrase to the server
    sendPostRequest("addPhrase", phraseDetails);
  };

  // Delete phrase
  const deletePhrase = function (id) {
    setPhrasesList((prev) => {
      return prev.filter((phrase, _) => phrase.idPhrase !== id);
    });
    sendDeleteRequest("delPhrase", id);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Navbar
          handleRoutes={handleRoutes}
          handleThemeMode={handleThemeMode}
          title={location}
          sendRequest={sendRequest}
        />
      </div>
      <div style={{ marginBottom: "100px" }}>
        <Route path="/dic">
          {() => (
            <Definitionslist
              warning={warning}
              meanings={definitions}
              add={addCard}
            />
          )}
        </Route>
        <Route path="/vcards">
          {() => <Cardslist cards={cardsList} deleteCard={deleteCard} />}
        </Route>
        <Route path="/pcards">
          {() => (
            <Phrases
              phrases={phrasesList}
              addPhrase={addPhrase}
              deletePhrase={deletePhrase}
            />
          )}
        </Route>
      </div>
    </ThemeProvider>
  );
};

export default App;
