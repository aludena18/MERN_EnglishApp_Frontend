import React, { useState, useEffect } from "react";
import axios from "../axios.js";

export const Search = function () {
  const [message, setMessage] = useState("...");
  const [word, setWord] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/sync");
    console.log(res.data);
    // setMessage(res.data.search);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    sendData(word);
    setWord("");
    getData();
  };

  const sendData = async (data) => {
    try {
      await axios.post("/search", {
        query: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = function (e) {
    setWord(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" value={word} />
        <button type="submit">Submit</button>
      </form>
      <h2>{message}</h2>
    </div>
  );
};
