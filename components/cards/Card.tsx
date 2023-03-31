import type { Card } from "@/types/models/card_types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  cardData: {
    card_id: string;
    card_term: string;
    card_definition: string;
  };
  config: {
    termFirst: boolean;
    activeCardId: string;
  };
};

function Card({ cardData, config }: Props) {
  const [flipped, setFlipped] = useState(false);
  const { card_term, card_definition } = cardData;

  const handleClick = () => {
    setFlipped(!flipped);
  };
  if (config.activeCardId !== cardData.card_id) return <></>;

  return (
    <Box
      className={`flippable-card ${flipped ? "flipped" : ""}`}
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Box
        className="front"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: { sm: 16, md: 24 } }}>
          {card_term}
        </Typography>
      </Box>
      <Box
        className="back"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: { sm: 16, md: 24 } }}>
          {card_definition}
        </Typography>
      </Box>
    </Box>
  );
}

export default Card;
