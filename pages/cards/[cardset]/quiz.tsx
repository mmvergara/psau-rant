import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Container from "@mui/material/Container";
import Card from "@/components/cards/Card";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import { CardExamConfig } from "@/types/models/card_types";
import { getCardSetById } from "@/firebase/services/cards_services";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CardSetExamPage: React.FC = () => {
  const router = useRouter();
  const cardset = router.query.cardset as string;
  const termFirst = !!router.query.termFirst;
  const shuffled = !!router.query.shuffled;

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [cardData, setCardData] = useState<Card[]>([]);
  const [config, setConfig] = useState<CardExamConfig>({
    termFirst,
    activeCardId: "1",
    actionDirection: "previous",
  });

  const showNextCard = () => {
    const nextCardId = cardData.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId + 1 >= cardData.length) return;
    setConfig({
      ...config,
      activeCardId: cardData[nextCardId + 1].card_id,
      actionDirection: "next",
    });
  };

  const showPreviousCard = () => {
    const nextCardId = cardData.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId - 1 < 0) return;
    setConfig({
      ...config,
      activeCardId: cardData[nextCardId - 1].card_id,
      actionDirection: "previous",
    });
  };

  const getCardSet = async () => {
    const { data, error } = await getCardSetById(cardset as string);
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
      setCardData(cardSet);
    }
  };

  useEffect(() => {
    getCardSet();
  }, []);

  // Keyboard events
  const rightArrow = useKeyPress("ArrowRight");
  const leftArrow = useKeyPress("ArrowLeft");
  useEffect(() => {
    if (rightArrow) showNextCard();
    if (leftArrow) showPreviousCard();
  }, [rightArrow, leftArrow]);

  // Render
  if (isFetching) return <CenterCircularProgress />;
  if (!isFetching && cardData.length === 0) {
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
      >{`${config.activeCardId} / ${cardData.length}`}</Typography>
      {cardData.map((card) => {
        return <Card cardData={card} config={config} />;
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 3,
          mt: 2,
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{ width: "150px" }}
          onClick={showPreviousCard}
          disabled={config.activeCardId === "1"}
        >
          <KeyboardArrowLeftIcon />
        </Fab>

        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{ width: "150px" }}
          onClick={showNextCard}
          disabled={
            config.activeCardId === cardData[cardData.length - 1].card_id
          }
        >
          <KeyboardArrowRightIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default CardSetExamPage;

// Hook
function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  function upHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", upHandler);
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
