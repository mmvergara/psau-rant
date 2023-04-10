import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import { getCardSetById } from "@/firebase/services/cards_services";
import { CardQuiz, ChoicesType } from "@/types/models/card_types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import QuizControl from "./QuizControl";
import { generateCardQuiz } from "@/utilities/QuizGenerators";
const Quiz = () => {
  const router = useRouter();
  const cardsetid = router.query.cardsetid as string;
  const choiceType = (router.query.choiceType || "definition") as ChoicesType;
  const shuffled = !!router.query.shuffled;

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [cardSet, setCardSet] = useState<CardQuiz[]>([]);

  const fetchCardSet = async () => {
    setIsFetching(true);
    const { data, error } = await getCardSetById(cardsetid);
    setIsFetching(false);
    if (error) return toast.error(error);
    if (data) {
      let cardSet = data.card_set_cards;
      if (shuffled) {
        cardSet.sort(() => Math.random() - 0.5);
        cardSet = cardSet.map((card, index) => ({
          ...card,
          card_id: String(index + 1),
        }));
        cardSet.sort((a, b) => +a.card_id - +b.card_id);
      }
      return setCardSet(generateCardQuiz(cardSet, choiceType));
    }
    router.push("/cards");
  };
  useEffect(() => {
    fetchCardSet();
  }, []);

  if (isFetching) return <CenterCircularProgress />;
  if (!isFetching && cardSet.length === 0) {
    toast.error("Card set not found");
    router.push("/cards");
  }

  return (
    <Container>
      {!isFetching && cardSet.length !== 0 && (
        <QuizControl cardsSet={cardSet} choiceType={choiceType} />
      )}
    </Container>
  );
};

export default Quiz;
