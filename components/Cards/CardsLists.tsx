import CenterCircularProgress from "../Layout/CenterCircularProgress";
import CardPlayModal from "./CardPlayModal";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { getAllCardsByUserId } from "@/firebase/services/cards_services";
import { useEffect, useState } from "react";
import { truncateString } from "@/utilities/StringFormatter";
import { useUserData } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { CardSet } from "@/types/models/card_types";
import { toast } from "react-toastify";

const CardsList = () => {
  const router = useRouter();
  const { activeCard } = router.query;
  const { user } = useUserData();
  const [loading, setLoading] = useState<boolean>(true);
  const [cardSets, setCardSets] = useState<CardSet[]>([]);
  const [activeCardSet, setActiveCardSet] = useState<CardSet | null>(null);

  const handleActiveCardSet = (cardSet: CardSet | null) =>
    setActiveCardSet(cardSet);

  const fetchAllCardSets = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await getAllCardsByUserId(user.uid);
    setLoading(false);
    if (error) {
      return toast.error(error);
    }
    if (data) {
      setCardSets(data);
      setActiveCardSet(
        data.find((cardSet) => cardSet.card_set_id === activeCard || "") || null
      );
    }
  };
  useEffect(() => {
    fetchAllCardSets();
  }, []);

  const onCardDelete = () => {
    setCardSets(
      cardSets.filter(
        (cardSet) => cardSet.card_set_id !== activeCardSet?.card_set_id
      )
    );
    setActiveCardSet(null);
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pb: 8 }}>
      {activeCardSet && (
        <CardPlayModal
          onCardDelete={onCardDelete}
          activeCardSet={activeCardSet}
          handleActiveCardSet={handleActiveCardSet}
        />
      )}
      {loading && <CenterCircularProgress />}
      {!loading && cardSets.length === 0 && (
        <Typography>Your created cards will show here</Typography>
      )}
      {cardSets.map((cardSet) => {
        return (
          <Paper
            component="button"
            elevation={5}
            variant="outlined"
            sx={{
              height: "140px",
              width: "280px",
              p: 2,
              borderColor: "forestgreen",
              cursor: "pointer",
              overflow: "hidden",
              ":hover": { bgcolor: "#d1ffbd", boxShadow: 4 },
              textDecoration: "none",
              display: "flex",
            }}
            onClick={() => handleActiveCardSet(cardSet)}
          >
            <Typography>{truncateString(cardSet.card_set_name, 90)}</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default CardsList;
