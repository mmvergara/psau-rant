import Typography from "@mui/material/Typography";
import StyleIcon from "@mui/icons-material/Style";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AnsweredResults, CardQuiz } from "@/types/models/card_types";
import { useRouter } from "next/router";

type Props = {
  questions: CardQuiz[];
  answeredQuestions: AnsweredResults[];
};

const QuizResultBox = ({ answeredQuestions, questions }: Props) => {
  const router = useRouter();
  const totalCorrect = answeredQuestions.filter((v) => v.isCorrect).length;
  const totalQuestions = questions.length;
  const noWrongAnswers =
    answeredQuestions.filter((v) => !v.isCorrect).length === 0;
  return (
    <Box>
      <Typography>
        Total Correct: {totalCorrect} / {totalQuestions}
      </Typography>
      {!noWrongAnswers && (
        <Typography>
          Wrong Answers on :{" "}
          {answeredQuestions
            .filter((v) => !v.isCorrect)
            .map((v) => v.card_id)
            .join(" ")}
        </Typography>
      )}
      <Button
        onClick={() => router.push("/cards")}
        variant="outlined"
        color="info"
        sx={{ mt: 2 }}
        startIcon={<StyleIcon />}
      >
        Go Back to my cards
      </Button>
    </Box>
  );
};

export default QuizResultBox;
