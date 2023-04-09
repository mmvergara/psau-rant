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
  const answer = cardQuiz.card_choices[cardQuiz.card_correct_choice];
  const AnsweredResults: AnsweredResults | null =
    answeredQuestions.find((v) => v.card_id === cardQuiz.card_id) || null;

  const choices = Object.entries(cardQuiz.card_choices);

  const isCorrect = isSubmitted && AnsweredResults && AnsweredResults.isCorrect;
  console.log({ isSubmitted });
  const borderColor = !isSubmitted
    ? "gray"
    : isSubmitted && !AnsweredResults
    ? "teal"
    : isCorrect
    ? "green"
    : "red";

  const correctAnswer =
    (isSubmitted && AnsweredResults && AnsweredResults.correct_answer) || null;
  console.log("rerender");
  return (
    <Paper
      sx={{
        bgcolor: "white",
        p: 2,
        boxShadow: 4,
        border: `4px solid ${borderColor}`,
      }}
    >
      <Typography>
        {index + 1}. {question}
      </Typography>
      <Divider sx={{ width: "100%", my: 2 }} />
      <RadioGroup
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
