import Card from "@/components/cards/Card";
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CardExamConfig, CardSet } from "@/types/models/card_types";
import Fab from "@mui/material/Fab";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Typography } from "@mui/material";
import { getCardSetById } from "@/firebase/services/cards_services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";

const CardSetExamPage: React.FC = () => {
  const router = useRouter();
  const cardset = router.query.cardset;
  const [cardData, setCardData] = useState<Card[]>([]);
  const getCardSet = async () => {
    const { data, error } = await getCardSetById(cardset as string);
    if (error) return toast.error(error);
    if (data) return setCardData(data.card_set_cards);
    router.push("/");
  };
  useEffect(() => {
    getCardSet();
  }, []);

  const [config, setConfig] = useState<CardExamConfig>({
    termFirst: true,
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
  if (cardData.length === 0) return <CenterCircularProgress />;
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
        {/* <Button variant="contained" sx={{flexGrow:1,borderRadius:0}}onClick={showPreviousCard}>
          previous card
        </Button>
        <Button variant="contained" sx={{flexGrow:1,borderRadius:0}}onClick={showNextCard}>
          next card
        </Button> */}
      </Box>
    </Container>
  );
};

export default CardSetExamPage;
