import { AnsweredResults, CardQuiz } from "@/types/models/card_types";
import { Divider, Paper, Typography, Alert } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  index: number;
  isSubmitted: boolean;
  onAnswer: (result: AnsweredResults) => void;
  cardQuiz: CardQuiz;
  choicesType: "term" | "definition";
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
    cardQuiz[`card_${choicesType === "term" ? "definition" : "term"}`];
  const answer = cardQuiz[`card_${choicesType}`];
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
          })?.answer || null
        }
        onChange={(e) => {
          onAnswer({
            card_id: cardQuiz.card_id,
            isCorrect: e.target.value === answer,
            answer: e.target.value,
            correct_answer: answer,
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
            : `Correct answer is: ${correctAnswer}`}
        </Alert>
      )}
    </Paper>
  );
};

export default Question;
