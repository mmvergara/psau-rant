import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createCardSet } from "@/firebase/services/cards_services";
import { useUserData } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardField } from "@/types/models/card_types";
import CardCreateBox from "@/components/Cards/CardCreateBox";
import Head from "next/head";

const CreateCardSetPage = () => {
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

  const handleAddCard = (cardField: CardField) => {
    const newCards: Card[] = [
      ...cards,
      {
        card_id: cards.length + 1 + "",
        ...cardField,
      },
    ];
    setCards(newCards);
    console.log(newCards);
  };

  const handleDeleteCard = (card_id: string) => {
    let newCards = cards.filter((card) => card.card_id !== card_id);
    // fix card_id
    newCards = newCards.map((card, index) => {
      return {
        ...card,
        card_id: index + 1 + "",
      };
    });

    setCards(newCards);
  };

  return (
    <>
      <Head>
        <title>Create Card Set | Flashcards</title>
        <meta name="description" content="Create a new card set" />
      </Head>
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
                  Privacy -{" "}
                  <b>{cardSetIsPublic ? "Public 🔓" : "Private 🔐"}</b>
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
            onClick={handleSubmitCardSet}
          >
            {isLoading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              <>
                <AddCircleOutlineIcon sx={{ mr: 1 }} /> Create Card Set
              </>
            )}
          </Button>
        </Box>
        <Box
          sx={{
            padding: 1,
            my: 1,
            p: 4,
            pt: 3,
            bgcolor: "white",
            boxShadow: 3,
            borderTop: "10px solid #0f5f22",
            borderRadius: 1,
          }}
        >
          <CardCreateBox onCardAdd={handleAddCard} />
          <Divider
            sx={{
              my: 2,
              width: "100%",
            }}
          />
          {cards.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 1,
              }}
            >
              {cards
                .slice()
                .reverse()
                .map((card) => (
                  <Box
                    key={card.card_id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 1,
                      borderRadius: 1,
                      border: "1px solid #0f5f22",
                    }}
                  >
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteCard(card.card_id)}
                    >
                      Delete #{card.card_id}
                    </Button>
                    <Divider />

                    <Typography>{card.card_question}</Typography>
                    <Divider />
                    <Typography>{card.card_answer}</Typography>
                  </Box>
                ))}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default CreateCardSetPage;
