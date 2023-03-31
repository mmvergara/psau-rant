import Card from "@/components/cards/Card";
import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CardExamConfig } from "@/types/models/card_types";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Typography } from "@mui/material";

const CardSetExamPage: React.FC = () => {
  const cardData = [
    {
      card_id: "1",
      card_term: "React",
      card_definition: "A JavaScript library for building user interfaces.",
    },
    {
      card_id: "2",
      card_term: "Node.js",
      card_definition:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    },
    {
      card_id: "3",
      card_term: "HTML",
      card_definition:
        "Hypertext Markup Language is the standard markup language for creating web pages and web applications.",
    },
    {
      card_id: "4",
      card_term: "CSS",
      card_definition:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in HTML or XML.",
    },
    {
      card_id: "5",
      card_term: "JavaScript",
      card_definition:
        "A high-level, interpreted programming language that conforms to the ECMAScript specification.",
    },
    {
      card_id: "6",
      card_term: "JSON",
      card_definition:
        "JavaScript Object Notation is an open standard format that uses human-readable text to transmit data objects consisting of attribute–value pairs.",
    },
  ];

  const [config, setConfig] = useState<CardExamConfig>({
    termFirst: true,
    activeCardId: "1",
    actionDirection: "previous",
  });

  const showNextCard = () => {
    const nextCardId = cardData.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId + 1 >= cardData.length) return;
    setConfig({
      ...config,
      activeCardId: cardData[nextCardId + 1].card_id,
      actionDirection: "next",
    });
  };
  const showPreviousCard = () => {
    const nextCardId = cardData.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId - 1 < 0) return;
    setConfig({
      ...config,
      activeCardId: cardData[nextCardId - 1].card_id,
      actionDirection: "previous",
    });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: 3,
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: "primary.main",
          borderRadius: 1,
          textAlign: "center",
          mb: 2,
        }}
      >{`${config.activeCardId} / ${cardData.length}`}</Typography>
      {cardData.map((card) => {
        return <Card cardData={card} config={config} />;
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 3,
          mt: 2,
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{ width: "150px" }}
          onClick={showPreviousCard}
          disabled={config.activeCardId === "1"}
        >
          <KeyboardArrowLeftIcon />
        </Fab>

        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{ width: "150px" }}
          onClick={showNextCard}
          disabled={
            config.activeCardId === cardData[cardData.length - 1].card_id
          }
        >
          <KeyboardArrowRightIcon />
        </Fab>
        {/* <Button variant="contained" sx={{flexGrow:1,borderRadius:0}}onClick={showPreviousCard}>
          previous card
        </Button>
        <Button variant="contained" sx={{flexGrow:1,borderRadius:0}}onClick={showNextCard}>
          next card
        </Button> */}
      </Box>
    </Container>
  );
};

export default CardSetExamPage;
