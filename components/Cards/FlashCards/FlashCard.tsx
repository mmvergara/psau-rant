import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { Card, CardExamConfig } from "@/types/models/card_types";
import { useEffect, useState } from "react";

type Props = {
  cardData: Card;
  config: CardExamConfig;
};

const FlashCard = ({ cardData, config }: Props) => {
  const { card_question, card_answer } = cardData;
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [config.activeCardId]);

  const isCurrentCard = config.activeCardId === cardData.card_id;
  if (!isCurrentCard) return null;

  const frontContent = config.questionFirst ? card_question : card_answer;
  const backContent = !config.questionFirst ? card_question : card_answer;

  return (
    <Box
      className={`flippable-card ${
        config.actionDirection === "previous"
          ? "animateCardOnMountFromRight"
          : "animateCardOnMountFromLeft"
      } ${flipped ? "flipped" : ""}`}
      sx={{ cursor: "pointer" }}
      onClick={() => setFlipped(!flipped)}
    >
      <Box className="front">
        <Typography
          sx={{ fontSize: { sm: 16, md: 24 }, whiteSpace: "pre-line" }}
        >
          {frontContent}
        </Typography>
      </Box>
      <Box className="back">
        <Typography
          sx={{ fontSize: { sm: 16, md: 24 }, whiteSpace: "pre-line" }}
        >
          {backContent}
        </Typography>
      </Box>
    </Box>
  );
};

export default FlashCard;
