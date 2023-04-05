import { deleteCardSetById } from "@/firebase/services/cards_services";
import { CardSet } from "@/types/models/card_types";
import {
  Modal,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import CardExportModal from "./CardExportModal";

type Props = {
  activeCardSet: CardSet | null;
  handleActiveCardSet: (cardSet: CardSet | null) => void;
  onCardDelete: () => void;
};

const CardPlayModal = ({
  activeCardSet,
  handleActiveCardSet,
  onCardDelete,
}: Props) => {
  if (!activeCardSet) return null;
  const router = useRouter();
  const { card_set_id, card_set_name } = activeCardSet;

  const [shuffled, setShuffled] = useState(true);
  const handleCardPlay = (termFirst: boolean) => {
    const path = `/cards/${card_set_id}/flashcards?${
      shuffled ? "shuffled=true" : ""
    }${termFirst ? "&termFirst=true" : ""}`;
    router.push(path);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteCardSet = async () => {
    setIsDeleting(true);
    const { error } = await deleteCardSetById(card_set_id);
    setIsDeleting(false);
    if (error) return toast.error(error);
    onCardDelete();
    toast.success("Card Set Deleted");
  };

  const [CardExportModalOpen, setCardExportModalOpen] = useState(false);

  const cardsText = activeCardSet.card_set_cards
    .map((card) => {
      return `${card.card_term}\n${card.card_definition}\n\n`;
    })
    .join("\n");

  return (
    <Modal open={true} onClose={() => handleActiveCardSet(null)}>
      <Box sx={modalContainerStyle}>
        <CardExportModal
          TextValue={cardsText}
          open={CardExportModalOpen}
          onClose={() => setCardExportModalOpen(false)}
          children={<></>}
        />
        <Typography fontSize={20}>Card Set : {card_set_name}</Typography>
        <FormGroup
          sx={{
            width: "fit-content",
            pl: 1,
            my: 1,
            bgcolor: "background.paper",
            boxShadow: 1,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                defaultChecked={shuffled}
                onChange={(e) => setShuffled(e.target.checked)}
              />
            }
            label="Shuffled"
          />
        </FormGroup>
        <Stack spacing={2}>
          <Divider />
          <Typography align="center" mb={2} fontSize={20}>
            Flash Cards
          </Typography>
          <ButtonGroup orientation="vertical">
            <Button variant="contained" onClick={() => handleCardPlay(true)}>
              Term First
            </Button>
            <Button variant="contained" onClick={() => handleCardPlay(false)}>
              Definition First
            </Button>
          </ButtonGroup>
          <Divider />
          <Typography align="center" mb={2} fontSize={20}>
            Take a Quiz
          </Typography>
          <ButtonGroup orientation="vertical">
            <Button variant="contained" onClick={() => handleCardPlay(true)}>
              Terms as choices
            </Button>
            <Button variant="contained" onClick={() => handleCardPlay(true)}>
              Definitions as choices
            </Button>
          </ButtonGroup>
          <Divider />
          <Button
            variant="contained"
            color="success"
            onClick={() => handleCardPlay(true)}
          >
            Edit Card Set
          </Button>{" "}
          <Button
            variant="contained"
            color="info"
            onClick={() => setCardExportModalOpen(true)}
          >
            Export Cards
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteCardSet}
          >
            {isDeleting ? "Deleting..." : "Delete Card Set"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CardPlayModal;

const modalContainerStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "400px",
  bgcolor: "secondary.main",
  boxShadow: 24,
  p: 4,
  outline: "none",
};
