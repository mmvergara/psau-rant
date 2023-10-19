import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { CardField } from "@/types/models/card_types";
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
    <>
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
      />
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
      <Button
        onClick={handleAddCard}
        variant="contained"
        sx={{
          width: "100%",
          mt: 1,
          height: "50px",
        }}
      >
        Add Card
      </Button>
    </>
  );
};

export default CardCreateBox;
