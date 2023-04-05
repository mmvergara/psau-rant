import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import { getCardSetById } from "@/firebase/services/cards_services";
import { Card, CardQuiz } from "@/types/models/card_types";
import { generateCardQuiz } from "@/utilities/Parsers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
type ChoicesType = "terms" | "definitions";
const Quiz = () => {
  const router = useRouter();
  const cardsetid = router.query.cardsetid as string;
  const choices = router.query.choices as ChoicesType;
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
      return setCardSet(generateCardQuiz(cardSet, choices));
    }
    router.push("/cards");
  };
  console.log(cardSet);
  useEffect(() => {
    fetchCardSet();
  }, []);

  if (isFetching) return <CenterCircularProgress />;
  if (!isFetching && cardSet.length === 0) {
    toast.error("Card set not found");
    router.push("/cards");
  }

  return <></>;
};

export default Quiz;
