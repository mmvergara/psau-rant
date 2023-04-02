import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = {
  shuffled: boolean;
  isStillLearningCardsId: string[];
  iKnowCardsId: string[];
  onResetCards: (id: string[] | null, shuffle: boolean) => void;
};

const QuizResult = ({
  onResetCards,
  iKnowCardsId,
  isStillLearningCardsId,
  shuffled,
}: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button onClick={() => onResetCards(null, shuffled)}>Replay Cards</Button>
      <Button onClick={() => onResetCards(isStillLearningCardsId, true)}>
        Replay "Still Learning" Cards
      </Button>
      <Button onClick={() => onResetCards(iKnowCardsId, true)}>
        Replay "I Know" Cards
      </Button>
    </Box>
  );
};

export default QuizResult;
