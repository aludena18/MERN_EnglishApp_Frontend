import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CardApp(props) {
  const stylesExample = {
    mt: 1.5,
    fontStyle: "italic",
  };

  const wordStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
  };

  const handleDeleteCard = function (id) {
    props.deleteCard(id);
  };

  return (
    <Card sx={{ minWidth: 275, width: 350, mb: 2, mx: 1 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDeleteCard(props.id);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subtitle}
        </Typography>
        <Typography variant="body2">{props.content}</Typography>
        <Typography sx={stylesExample}>
          {props.example?.split(" ").map((el, i) => {
            if (el === props.title.toLowerCase())
              return (
                <span key={i} style={wordStyle}>
                  {el}{" "}
                </span>
              );
            return props.example.split(" ").length - 1 === i
              ? `${el}`
              : `${el} `;
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}
