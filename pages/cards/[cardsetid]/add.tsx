import { addCardToCardSet } from "@/firebase/services/cards_services";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Card } from "@/types/models/card_types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Head from "next/head";
import Box from "@mui/material/Box";

const AddCardToCardSet = () => {
  const router = useRouter();
  const cardsetid = router.query.cardsetid as string;

  const [card, setCard] = useState<Card>({
    card_id: new Date().getTime() + "",
    card_answer: "",
    card_question: "",
  });

  const addCard = async () => {
    const { error } = await addCardToCardSet(cardsetid, card);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Card added");

    setCard({
      card_id: new Date().getTime() + "",
      card_answer: "",
      card_question: "",
    });
  };

  return (
    <>
      <Head>
        <title>Edit </title>
      </Head>
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
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <TextField
          label="Question"
          multiline
          onChange={(e) =>
            setCard({ ...card, card_question: e.target.value || "" })
          }
          value={card.card_question}
          sx={{ width: "100%", my: 1 }}
        />{" "}
        <br />
        <TextField
          label="Answer"
          multiline
          onChange={(e) =>
            setCard({ ...card, card_answer: e.target.value || "" })
          }
          value={card.card_answer}
          sx={{ width: "100%", my: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={addCard}
          sx={{ width: "fit-content" }}
        >
          Add Card
        </Button>
      </Box>
    </>
  );
};
export default AddCardToCardSet;
