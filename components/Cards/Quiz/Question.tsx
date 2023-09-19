import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Radio from "@mui/material/Radio";
import { AnsweredResults, CardQuiz } from "@/types/models/card_types";

type Props = {
  index: number;
  isSubmitted: boolean;
  onAnswer: (result: AnsweredResults) => void;
  cardQuiz: CardQuiz;
  choicesType: "Question" | "Answer";
  answeredQuestions: AnsweredResults[];
};
const Question = ({
  index,
  isSubmitted,
  onAnswer,
  cardQuiz,
  choicesType,
  answeredQuestions,
}: Props) => {
  const question =
    cardQuiz[`card_${choicesType === "Question" ? "Answer" : "Question"}`];
  const Answer = cardQuiz[`card_${choicesType}`];
  const AnsweredResults: AnsweredResults | null =
    answeredQuestions.find((v) => v.card_id === cardQuiz.card_id) || null;

  const choices = Object.entries(cardQuiz.card_choices);

  const isCorrect = isSubmitted && AnsweredResults && AnsweredResults.isCorrect;
  const borderColor = !isSubmitted
    ? "green"
    : isSubmitted && !AnsweredResults
    ? "teal"
    : isCorrect
    ? "green"
    : "red";
  const correctAnswer =
    (isSubmitted && AnsweredResults && AnsweredResults.correct_answer) || null;

  const border = !isSubmitted
    ? { borderTop: `3px solid green` }
    : { border: `2px solid ${borderColor}` };
  return (
    <Paper
      sx={{
        bgcolor: "white",
        p: 2,
        boxShadow: 2,
        ...border,
      }}
    >
      <Typography>
        {index + 1}. {question}
      </Typography>
      <Divider sx={{ width: "100%", my: 2 }} />
      <RadioGroup
        defaultValue={
          answeredQuestions.find((v) => {
            return v.card_id === cardQuiz.card_id;
          })?.Answer || null
        }
        onChange={(e) => {
          onAnswer({
            card_id: cardQuiz.card_id,
            isCorrect: e.target.value === Answer,
            Answer: e.target.value,
            correct_answer: Answer,
          });
        }}
      >
        {choices.map(([letter, choice], index) => {
          return (
            <FormControlLabel
              value={choice}
              control={<Radio />}
              label={choice}
              disabled={isSubmitted}
            />
          );
        })}
      </RadioGroup>
      {correctAnswer && AnsweredResults && (
        <Alert severity={AnsweredResults.isCorrect ? "success" : "error"}>
          {AnsweredResults.isCorrect
            ? "Correct!"
            : `Correct Answer is: ${correctAnswer}`}
        </Alert>
      )}
    </Paper>
  );
};

export default Question;
