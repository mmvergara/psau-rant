import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import StyleIcon from "@mui/icons-material/Style";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  shuffled: boolean;
  isStillLearningCardsId: string[];
  iKnowCardsId: string[];
  onResetCards: (id: string[] | null, shuffle: boolean) => void;
};

const FlashCardsResults = ({
  onResetCards,
  iKnowCardsId,
  isStillLearningCardsId,
  shuffled,
}: Props) => {
  const router = useRouter();
  const [isShuffled, setIsShuffled] = useState<boolean>(shuffled);
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
      <Button
        onClick={() => router.push("/cards")}
        variant="outlined"
        color="info"
        sx={{ mt: 2, width: "fit-content" }}
        startIcon={<StyleIcon />}
      >
        Go Back to my cards
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

export default FlashCardsResults;
