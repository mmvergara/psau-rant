import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardCreateBox from "./CardCreateBox";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import { createCardSet } from "@/firebase/services/cards_services";
import { useUserData } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Card } from "@/types/models/card_types";

const CardSetCreate = () => {
  const router = useRouter();
  const { user } = useUserData();
  const [isLoading, setIsLoading] = useState(false);

  const [cardSetIsPublic, setCardSetIsPublic] = useState(true);
  const [cardSetName, setCardSetName] = useState("");
  const [cards, setCards] = useState<Card[]>([]);

  const handleSubmitCardSet = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await createCardSet({
      card_set_isPublic: cardSetIsPublic,
      card_set_name: cardSetName,
      card_set_author_id: user.uid,
      card_set_cards: cards,
    });
    setIsLoading(false);
    if (error) toast.error(error);
    if (data) {
      toast.success("Card set created");
      router.push(`/cards?activeCard=${data.id}`);
    }
  };

  const handleCardChange = (
    card_id: string,
    { fieldType, value }: { fieldType: "question" | "answer"; value: string }
  ) => {
    const newCards = cards.map((card) => {
      if (card.card_id === card_id) {
        if (fieldType === "question") card.card_question = value;
        if (fieldType === "answer") card.card_answer = value;
      }
      return card;
    });
    setCards(newCards);
  };
  const handleAddCard = () => {
    const newCards = [
      ...cards,
      {
        card_id: cards.length + 1 + "",
        card_question: "",
        card_answer: "",
      },
    ];
    setCards(newCards);
  };

  const addCardRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 12 }}
    >
      <Box
        sx={{
          padding: 1,
          my: 1,
          p: 4,
          bgcolor: "white",
          boxShadow: 1,
          borderTop: "10px solid #0b4619",
          borderBottom: "10px solid #0b4619",
        }}
      >
        <Typography fontWeight="bold">Create New Card Set</Typography>
        <TextField
          label="Card set name"
          variant="filled"
          sx={{
            mt: 1,
            width: "100%",
            maxWidth: "250px",
          }}
          value={cardSetName}
          onChange={(e) => setCardSetName(e.target.value)}
        />
        <FormGroup
          sx={{
            width: "100%",
            maxWidth: "250px",
            bgcolor: "secondary.main",
            p: 0.5,
            pl: 2,
            boxShadow: 2,
            my: 1,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                value={cardSetIsPublic}
                onChange={(e) => setCardSetIsPublic(e.target.checked)}
              />
            }
            label={
              <Typography>
                Privacy - <b>{cardSetIsPublic ? "Public 🔓" : "Private 🔐"}</b>
              </Typography>
            }
          />
        </FormGroup>
        <Button
          type="button"
          variant="contained"
          sx={{
            display: "flex",
            py: 1,
            width: "100%",
            maxWidth: "250px",
          }}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} /> Create Card Set
        </Button>
      </Box>
      <CardCreateBox onCardAdd={handleAddCard} />
    </Container>
  );
};

export default CardSetCreate;
