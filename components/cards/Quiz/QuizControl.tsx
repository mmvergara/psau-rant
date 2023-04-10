import {
  AnsweredResults,
  CardQuiz,
  ChoicesType,
} from "@/types/models/card_types";
import { useState } from "react";
import StyleIcon from "@mui/icons-material/Style";
import { Stack, Button, Paper, Box, Typography } from "@mui/material";
import Question from "./Question";
import { toast } from "react-toastify";
import QuizResultBox from "./QuizResultBox";
type Props = {
  cardsSet: CardQuiz[];
  choiceType: ChoicesType;
};

const QuizControl = ({ cardsSet, choiceType }: Props) => {
  const [questions, setQuestions] = useState<CardQuiz[]>(cardsSet);
  const [answeredQuestions, setAnswered] = useState<AnsweredResults[]>([]);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const handleOnlyQuestionThatIAnsweredIncorrectly = () => {
    const answeredIncorrectlyIds = answeredQuestions
      .filter((aq) => {
        return aq.isCorrect;
      })
      .map((aq) => aq.card_id);

    setQuestions((p) => {
      const filtered = p.filter(
        (v) => !answeredIncorrectlyIds.includes(v.card_id)
      );
      return filtered;
    });
    handleResetQuiz();
  };

  const handleResetQuiz = () => {
    setAnswered([]);
    setQuestions((p) => [...p]);
    setDidSubmit(false);
  };
  const handleAnswer = (result: AnsweredResults) => {
    setAnswered((p) => [
      ...p.filter((v) => v.card_id !== result.card_id),
      result,
    ]);
  };
  
  const totalQuestions = questions.length;
  const handleSubmit = () => {
    if (answeredQuestions.length !== totalQuestions) {
      const unansweredQuestionsIndexes = questions
        .map((v, i) => {
          const answered = answeredQuestions.find(
            (aq) => aq.card_id === v.card_id
          );
          if (!answered) {
            return i + 1;
          }
          return null;
        })
        .filter((v) => v !== null) as number[];
      toast.error(
        `Unanswered Questions : ${unansweredQuestionsIndexes.join("\n")}`,
        { position: "top-right" }
      );
      return;
    }
    setDidSubmit(true);
  };
  const noWrongAnswers =
    answeredQuestions.filter((v) => !v.isCorrect).length === 0;
  return (
    <Stack spacing={5} mt={5}>
      {questions.map((card, index) => (
        <Question
          key={Math.random().toString()}
          index={index}
          isSubmitted={didSubmit}
          onAnswer={handleAnswer}
          cardQuiz={card}
          choicesType={choiceType}
          answeredQuestions={answeredQuestions}
        />
      ))}
      {!didSubmit && (
        <Button variant="contained" color="info" onClick={handleSubmit}>
          Submit
        </Button>
      )}
      {didSubmit && (
        <Paper sx={{ p: 2 }}>
          <QuizResultBox
            answeredQuestions={answeredQuestions}
            questions={questions}
          />
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pt: 2 }}>
            {!noWrongAnswers && (
              <Button
                variant="contained"
                sx={{ flexGrow: 1 }}
                onClick={handleOnlyQuestionThatIAnsweredIncorrectly}
              >
                Retake Questions That I Answered Incorrectly
              </Button>
            )}
            <Button
              variant="outlined"
              sx={{ flexGrow: 1 }}
              onClick={handleResetQuiz}
            >
              Retake All
            </Button>
          </Box>
        </Paper>
      )}
    </Stack>
  );
};

export default QuizControl;
