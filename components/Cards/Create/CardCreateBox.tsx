import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Card, CardField, ChoicesType } from "@/types/models/card_types";
import { useState } from "react";
import { Button } from "@mui/material";

type Props = {
  onCardAdd: (cardData: CardField) => void;
};
const emptyCard = {
  card_answer: "",
  card_question: "",
};

const CardCreateBox = ({ onCardAdd }: Props) => {
  const [cardContent, setCardContent] = useState<CardField>(emptyCard);

  const handleAddCard = () => {
    onCardAdd(cardContent);
    setCardContent(emptyCard);
  };
  return (
    <Box
      sx={{
        padding: 1,
        my: 1,
        p: 4,
        pt: 3,
        bgcolor: "white",
        boxShadow: 3,
        borderTop: "10px solid #0f5f22",
        borderRadius: 1,
      }}
    >
      <TextField
        label="Question"
        name="question"
        multiline
        onChange={(e) => {
          setCardContent({
            ...cardContent,
            card_question: e.target.value || "",
          });
        }}
        value={cardContent.card_question}
        sx={{ width: "100%", my: 1 }}
      />{" "}
      <br />
      <TextField
        label="Answer"
        name="answer"
        multiline
        onChange={(e) => {
          setCardContent({
            ...cardContent,
            card_answer: e.target.value || "",
          });
        }}
        value={cardContent.card_answer}
        sx={{ width: "100%", my: 1 }}
      />
      <Button onClick={handleAddCard}>Add Card</Button>
    </Box>
  );
};

export default CardCreateBox;
