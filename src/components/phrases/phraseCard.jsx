import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function PhraseCard(props) {
  const handleDeleteCard = function (i) {
    props.deletePhrase(i);
  };
  return (
    <Box key={index} sx={{ position: "relative", minWidth: 275, mb: 2 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6">"{props.phrase.phrase}"</Typography>
          <Typography variant="body2">{props.phrase.meaning}</Typography>
        </CardContent>
      </Card>
      <IconButton
        sx={{ position: "absolute", right: 4, bottom: 4 }}
        aria-label="delete"
        onClick={() => {
          handleDeleteCard(index);
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}
