import { useUserData } from "@/context/AuthContext";
import { getAllCardsByUserId } from "@/firebase/services/cards_services";
import { CardSet } from "@/types/models/card_types";
import { truncateString } from "@/utilities/StringFormatter";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CenterCircularProgress from "../Layout/CenterCircularProgress";
import CardPlayModal from "./CardPlayModal";

const CardsList = () => {
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
      toast.error(error);
    }
    if (data) {
      setCardSets(data);
    }
  };
  useEffect(() => {
    fetchAllCardSets();
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pb: 8 }}>
      {activeCardSet && (
        <CardPlayModal
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
