import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();
  const [isShuffled, setIsShuffled] = useState<boolean>(shuffled);
  console.log("isShuffled", isShuffled);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        p: 2,
        borderTop: "10px solid green",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <Typography>Result</Typography>
      <Typography>
        {isStillLearningCardsId.length} "Still Learning" Cards.
      </Typography>
      <Typography>{iKnowCardsId.length} "I Know" Cards</Typography>
      <Button variant="outlined" onClick={() => router.push("/cards")}>
        Go Back to My Cards
      </Button>
      <Divider sx={{ my: 2 }} />
      <Typography>Take a quiz again!</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={shuffled}
              onChange={(e) => setIsShuffled(e.target.checked)}
            />
          }
          label="Shuffled"
        />
      </FormGroup>
      {isStillLearningCardsId.length !== 0 && (
        <Button
          sx={{ my: 1 }}
          variant="contained"
          onClick={() => onResetCards(isStillLearningCardsId, isShuffled)}
        >
          "Still Learning" Cards
        </Button>
      )}
      <Button
        sx={{ my: 1 }}
        variant="contained"
        onClick={() => onResetCards(null, isShuffled)}
      >
        All Cards
      </Button>
      {iKnowCardsId.length !== 0 && (
        <Button
          sx={{ my: 1 }}
          variant="outlined"
          onClick={() => onResetCards(iKnowCardsId, isShuffled)}
        >
          "I Know" Cards
        </Button>
      )}
    </Box>
  );
};

export default QuizResult;
