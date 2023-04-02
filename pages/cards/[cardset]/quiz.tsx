import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import QuizControls from "@/components/cards/QuizControls";
import useKeyPress from "@/utilities/hooks/useKeyPress";
import QuizResult from "@/components/cards/QuizResult";
import Container from "@mui/material/Container";
import Card from "@/components/cards/Card";
import { useEffect, useState } from "react";
import { CardExamConfig } from "@/types/models/card_types";
import { getCardSetById } from "@/firebase/services/cards_services";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CardSetExamPage: React.FC = () => {
  const router = useRouter();

  const cardsetid = router.query.cardset as string;
  const termFirst = !!router.query.termFirst;
  const shuffled = !!router.query.shuffled;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [cardSet, setCardSet] = useState<Card[]>([]);
  const [config, setConfig] = useState<CardExamConfig>({
    termFirst,
    activeCardId: "1",
    actionDirection: "previous",
  });

  const showNextCard = (quiz: "StillLearning" | "Know") => {
    const nextCardId = cardSet.findIndex(
      (card) => card.card_id === config.activeCardId
    );

    if (quiz === "Know") {
      setIKnowCardsId([...iKnowCardsId, config.activeCardId]);
    }
    if (quiz === "StillLearning") {
      setIsStillLearningCardsId([
        ...isStillLearningCardsId,
        config.activeCardId,
      ]);
    }

    setLastCardId(config.activeCardId);

    // if it's the last card, show the result
    if (nextCardId + 1 >= cardSet.length) {
      setEnded(true);
      return;
    }

    // show the next card
    setConfig({
      ...config,
      activeCardId: cardSet[nextCardId + 1].card_id,
      actionDirection: "next",
    });
  };

  const showPreviousCard = () => {
    const nextCardId = cardSet.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId - 1 < 0) return;

    setIsStillLearningCardsId((p) => p.filter((id) => id !== lastCardId));
    setIKnowCardsId((p) => p.filter((id) => id !== lastCardId));

    setConfig({
      ...config,
      activeCardId: cardSet[nextCardId - 1].card_id,
      actionDirection: "previous",
    });
  };

  const getCardSet = async () => {
    const { data, error } = await getCardSetById(cardsetid as string);
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
      setCardSet(cardSet);
    }
  };

  // Card Reset Functions
  const [ended, setEnded] = useState<boolean>(false);
  const [lastCardId, setLastCardId] = useState<string | null>(null);
  const [iKnowCardsId, setIKnowCardsId] = useState<string[]>([]);
  const [isStillLearningCardsId, setIsStillLearningCardsId] = useState<
    string[]
  >([]);
  const handleResetCards = (
    filterdCards: string[] | null,
    shuffled: boolean
  ) => {
    setIsFetching(true);
    let newCardSet = cardSet;
    if (filterdCards) {
      console.log("filterdCards", filterdCards);
      newCardSet = newCardSet.filter((card) =>
        filterdCards.includes(card.card_id)
      );
    }
    if (shuffled) {
      newCardSet.sort(() => Math.random() - 0.5);
      newCardSet = newCardSet.map((card, index) => ({
        ...card,
        card_id: String(index + 1),
      }));
      newCardSet.sort((a, b) => +a.card_id - +b.card_id);
    }

    setCardSet(newCardSet);
    setConfig({
      ...config,
      activeCardId: "1",
      actionDirection: "previous",
    });
    setIsStillLearningCardsId([]);
    setIKnowCardsId([]);
    setIsFetching(false);
    setEnded(false);
  };
  // Card Reset Functions

  useEffect(() => {
    getCardSet();
  }, []);

  // Keyboard events
  const rightArrow = useKeyPress("ArrowRight");
  const leftArrow = useKeyPress("ArrowLeft");
  useEffect(() => {
    if (rightArrow) showNextCard("StillLearning");
    if (leftArrow) showPreviousCard();
  }, [rightArrow, leftArrow]);

  // Render
  if (isFetching) return <CenterCircularProgress />;
  if (!isFetching && cardSet.length === 0) {
    toast.error("Card set not found");
    router.push("/");
  }

  return (
    <Container sx={containerStyles}>
      {ended ? (
        <QuizResult
          iKnowCardsId={iKnowCardsId}
          isStillLearningCardsId={isStillLearningCardsId}
          onResetCards={handleResetCards}
          shuffled={shuffled}
        />
      ) : (
        <>
          <Typography
            sx={quizCountStyles}
          >{`${config.activeCardId} / ${cardSet.length}`}</Typography>
          {cardSet.map((card) => {
            return <Card cardData={card} config={config} />;
          })}
          <QuizControls
            showNextCard={showNextCard}
            showPreviousCard={showPreviousCard}
          />
        </>
      )}
    </Container>
  );
};

export default CardSetExamPage;

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  pt: 3,
  overflow: "hidden",
};
const quizCountStyles = {
  fontWeight: 600,
  color: "primary.main",
  borderRadius: 1,
  textAlign: "center",
  mb: 2,
};
