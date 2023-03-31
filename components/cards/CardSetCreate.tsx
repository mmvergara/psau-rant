import { useRef, useState } from "react";
import { Card } from "@/types/models/card_types";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CardCreateBox from "./CardCreateBox";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CircularProgress } from "@mui/material";

const CardSetCreate = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      card_id: "1",
      card_term: "",
      card_definition: "",
    },
    {
      card_id: "2",
      card_term: "",
      card_definition: "",
    },
  ]);

  const handleCardChange = (
    card_id: string,
    { fieldType, value }: { fieldType: "Term" | "Definition"; value: string }
  ) => {
    const newCards = cards.map((card) => {
      if (card.card_id === card_id) {
        if (fieldType === "Term") {
          card.card_term = value;
        } else if (fieldType === "Definition") {
          card.card_definition = value;
        }
      }
      return card;
    });
    setCards(newCards);
  };

  const handleAddCard = () => {
    const newCards = [
      ...cards,
      {
        card_id: cards.length + 1 + "",
        card_term: "",
        card_definition: "",
      },
    ];
    setCards(newCards);
    setTimeout(() => scrollToBottom(), 100);
  };

  const handleDeleteCard = (card_id: string) => {
    const newCards = cards.filter((card) => card.card_id !== card_id);
    newCards.forEach((card, index) => {
      card.card_id = index + 1 + "";
    });

    setCards(newCards);
  };


  const addCardRef = useRef<HTMLButtonElement | null>(null);
  const scrollToBottom = () =>
    addCardRef.current?.scrollIntoView({ behavior: "smooth" });
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 12 }}
    >
      <Box
        sx={{
          padding: 1,
          my: 1,
          p: 4,
          bgcolor: "white",
          boxShadow: 1,
          borderTop: "10px solid #0b4619",
          borderBottom: "10px solid #0b4619",
        }}
      >
        <Typography fontWeight="bold">Create New Card Set</Typography>
        <TextField
          label="Card set name"
          variant="filled"
          sx={{
            my: 1,
            width: "100%",
            maxWidth: "250px",
          }}
        />{" "}
        <Button
          type="button"
          onClick={() => scrollToBottom()}
          variant="contained"
          sx={{
            display: "flex",
            py: 1,
            width: "100%",
            maxWidth: "250px",
          }}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} /> Create Card Set
        </Button>
      </Box>
      {cards.map((card) => {
        return (
          <CardCreateBox
            CardData={card}
            onCardChange={handleCardChange}
            onCardDelete={handleDeleteCard}
          />
        );
      })}
      <Button
        type="button"
        onClick={handleAddCard}
        variant="contained"
        sx={{ py: 4, fontSize: 20, border: "12px solid #0B4619" }}
      >
        Add Card
      </Button>{" "}
      <Button
        ref={addCardRef}
        type="button"
        onClick={handleAddCard}
        variant="contained"
        sx={{
          width: "200px",
          py: 2,
          ml: "auto",
          bgcolor: "#e2b41d",
          border: "1px solid #0B4619",
        }}
      >
        <AddCircleOutlineIcon sx={{ mr: 1 }} /> Create Card Set
        <CircularProgress size={24} color="inherit" />
      </Button>
    </Container>
  );
};

export default CardSetCreate;