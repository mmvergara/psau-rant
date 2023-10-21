import QuizResultBox from "./QuizResultBox";
import Question from "./Question";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  AnsweredResults,
  CardQuiz,
  ChoicesType,
} from "@/types/models/CardTypes";
import { useState } from "react";
import { toast } from "react-toastify";

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
    <Stack spacing={5} mt={5} mb={10}>
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
        <Button
          variant="contained"
          color="info"
          onClick={handleSubmit}
          sx={{ p: 2 }}
        >
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
