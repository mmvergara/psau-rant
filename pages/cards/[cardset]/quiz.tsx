import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Container from "@mui/material/Container";
import Card from "@/components/cards/Card";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { CardExamConfig } from "@/types/models/card_types";
import { getCardSetById } from "@/firebase/services/cards_services";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import useKeyPress from "@/utilities/hooks/useKeyPress";

const CardSetExamPage: React.FC = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 600px");

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

    // if it's the last card, show the result
    if (nextCardId + 1 >= cardSet.length) {
      setEnded
      return;
    }

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
    setIsFetching(false);
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: 3,
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: "primary.main",
          borderRadius: 1,
          textAlign: "center",
          mb: 2,
        }}
      >{`${config.activeCardId} / ${cardSet.length}`}</Typography>
      {cardSet.map((card) => {
        return <Card cardData={card} config={config} />;
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: isMobile ? "100%" : "60%",
          mt: 2,
        }}
      >
        <ButtonGroup disableElevation variant="contained">
          <Button
            sx={{ py: 2, borderRadius: 8 }}
            onClick={() => showPreviousCard()}
          >
            <KeyboardArrowLeftIcon sx={{ mr: isMobile ? 0 : 0.5 }} />
            {!isMobile && "Back"}
          </Button>
        </ButtonGroup>
        <ButtonGroup disableElevation variant="contained">
          <Button
            sx={{ py: 2, borderRadius: 10 }}
            onClick={() => showNextCard("StillLearning")}
          >
            Still Learning
          </Button>
          <Button
            sx={{ py: 2, borderRadius: 10 }}
            onClick={() => showNextCard("Know")}
          >
            I know <KeyboardArrowRightIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default CardSetExamPage;
