import {
  AnsweredResults,
  CardQuiz,
  ChoicesType,
} from "@/types/models/card_types";
import { useState } from "react";
import { Stack, Button } from "@mui/material";
import Question from "./Question";

type Props = {
  cardsSet: CardQuiz[];
  choiceType: ChoicesType;
};

const QuizControl = ({ cardsSet, choiceType }: Props) => {
  const [questions, setQuestions] = useState<CardQuiz[]>(cardsSet);
  const [answeredQuestions, setAnswered] = useState<AnsweredResults[]>([]);

  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const handleOnlyQuestionThatIAnsweredIncorrectly = () => {
    const answeredIncorrectlyIds = answeredQuestions.filter(
      (v) => !v.isCorrect
    );
    const newQuestions = questions.filter((v) => {
      return answeredIncorrectlyIds.some((a) => a.card_id === v.card_id);
    });
    setQuestions(newQuestions);
    handleResetQuiz();
  };

  const handleResetQuiz = () => {
    setAnswered([]);
    setDidSubmit(false);
  };

  const handleAnswer = (result: AnsweredResults) => {
    setAnswered((p) => [
      ...p.filter((v) => v.card_id !== result.card_id),
      result,
    ]);
  };

  const totalCorrect = answeredQuestions.filter((v) => v.isCorrect).length;
  const totalQuestions = questions.length;
  console.log(didSubmit);
  return (
    <Stack spacing={5} mt={5}>
      {cardsSet.map((card, index) => (
        <Question
          index={index}
          isSubmitted={didSubmit}
          onAnswer={handleAnswer}
          cardQuiz={card}
          choicesType={choiceType}
          answeredQuestions={answeredQuestions}
        />
      ))}
      <Button onClick={() => setDidSubmit(true)}>Submit</Button>
      {didSubmit && (
        <div>
          <button>Repeat Quiz Incorrectly</button>
          <button>Repeat Quiz</button>
        </div>
      )}
    </Stack>
  );
};

export default QuizControl;
