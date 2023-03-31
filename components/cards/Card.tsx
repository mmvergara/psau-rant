import type { Card, CardExamConfig } from "@/types/models/card_types";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  cardData: Card;
  config: CardExamConfig;
};

function Card({ cardData, config }: Props) {
  const { card_term, card_definition, card_id } = cardData;
  const [flipped, setFlipped] = useState(!config.termFirst);

  const handleClick = () => {
    setFlipped(!flipped);
  };
  if (config.activeCardId !== cardData.card_id) return <></>;

  return (
    <Box
      className={`flippable-card ${
        config.actionDirection === "previous"
          ? "animateCardOnMountFromRight"
          : "animateCardOnMountFromLeft"
      } ${flipped ? "flipped" : ""}`}
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Box className="front">
        <Typography sx={{ fontSize: { sm: 16, md: 24 } }}>
          {card_term}
        </Typography>
      </Box>
      <Box className="back">
        <Typography sx={{ fontSize: { sm: 16, md: 24 } }}>
          {card_definition}
        </Typography>
      </Box>
    </Box>
  );
}

export default Card;
