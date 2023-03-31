import { useUserData } from "@/context/AuthContext";
import { getAllCardsByUserId } from "@/firebase/services/cards_services";
import { CardSet } from "@/types/models/card_types";
import { truncateString } from "@/utilities/StringFormatter";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CardsList = () => {
  const { user } = useUserData();
  const [cardSets, setCardSets] = useState<CardSet[]>([]);
  const fetchAllCardSets = async () => {
    if (!user) return;
    const { data, error } = await getAllCardsByUserId(user.uid);
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
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {cardSets.map((cardSet) => {
        return (
          <Paper
            component={Link}
            href={`/cards/${cardSet.card_set_id}/quiz`}
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
            }}
          >
            <Typography>{truncateString(cardSet.card_set_name, 90)}</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default CardsList;
