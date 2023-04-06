import { CardQuiz } from "@/types/models/card_types";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Paper,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  cardQuiz: CardQuiz;
  choicesType: "term" | "definition";
  index: number;
};
const Question = ({ cardQuiz, choicesType, index }: Props) => {
  const question =
    cardQuiz[`card_${choicesType === "term" ? "definition" : "term"}`];

  const choices = Object.entries(cardQuiz.card_choices);
  console.log(choices);
  return (
    <Paper sx={{ bgcolor: "white", p: 2, boxShadow: 4 }}>
      <Typography>
        {index + 1}. {question}
      </Typography>
      <Divider sx={{ width: "100%", my: 2 }} />
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {choices.map(([letter, choice], index) => {
          return (
            <FormControlLabel
              value={letter}
              control={<Radio />}
              label={`${choice}`}
            />
          );
        })}
      </RadioGroup>
    </Paper>
  );
};

export default Question;
