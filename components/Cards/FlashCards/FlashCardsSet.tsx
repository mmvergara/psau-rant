import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import FlashCardsControls from "./FlashCardsControls";
import FlashCardsResults from "./FlashCardsResults";
import useKeyPress from "@/utilities/hooks/useKeyPress";
import FlashCard from "./FlashCard";
import Container from "@mui/material/Container";
import { Card, CardExamConfig } from "@/types/models/CardTypes";
import { useEffect, useState } from "react";
import { getCardSetById } from "@/firebase/services/CardsService";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMainTheme } from "@/theme/ThemeContextProvider";

const FlashCardsSet = () => {
  const { mode } = useMainTheme();
  const router = useRouter();
  const cardsetid = router.query.cardsetid as string;
  const questionFirst = !!router.query.questionFirst;
  const shuffled = !!router.query.shuffled;

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [cardSet, setCardSet] = useState<Card[]>([]);
  const [config, setConfig] = useState<CardExamConfig>({
    questionFirst,
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
    if (nextCardId + 1 >= cardSet.length) return setEnded(true);

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
      return setCardSet(cardSet);
    }
    router.push("/cards");
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

    // filter the cards
    if (filterdCards) {
      newCardSet = newCardSet.filter((card) =>
        filterdCards.includes(card.card_id)
      );
    }

    // shuffle the cards
    if (shuffled) newCardSet.sort(() => Math.random() - 0.5);

    // set the card ids
    newCardSet = newCardSet.map((card, index) => ({
      ...card,
      card_id: String(index + 1),
    }));

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
    router.push("/cards");
  }
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        pt: 3,
        pb: 2,
      }}
    >
      {ended && (
        <FlashCardsResults
          iKnowCardsId={iKnowCardsId}
          isStillLearningCardsId={isStillLearningCardsId}
          onResetCards={handleResetCards}
          shuffled={shuffled}
        />
      )}
      {!ended && (
        <>
          <Typography
            sx={{
              fontWeight: 600,
              borderRadius: 1,
              textAlign: "center",
              mb: 2,
              color: mode === "light" ? "black" : "white",
            }}
          >
            {`${config.activeCardId} / ${cardSet.length}`}
          </Typography>
          {cardSet.map((card) => {
            return <FlashCard cardData={card} config={config} />;
          })}
          <FlashCardsControls
            showNextCard={showNextCard}
            showPreviousCard={showPreviousCard}
          />
        </>
      )}
    </Container>
  );
};

export default FlashCardsSet;
