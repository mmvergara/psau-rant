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
import StyleIcon from "@mui/icons-material/Style";
import QuizIcon from "@mui/icons-material/Quiz";
import TuneIcon from "@mui/icons-material/Tune";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CardExportModal from "@/components/Cards/CardExportModal";

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
  // const choiceType = (router.query.choices || "definition") as ChoicesType;
  // const shuffled = !!router.query.shuffled;

  const handleTakeQuiz = (choiceType: "term" | "definition") => {
    const path = `/cards/${card_set_id}/quiz?choiceType=${choiceType}${
      shuffled ? "&shuffled=true" : ""
    }`;
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
            bgcolor: "ivory",
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
        <Divider sx={{ marginY: 2 }} />
        <Stack>
          <Typography
            align="center"
            fontSize={20}
            sx={{
              bgcolor: "ivory",
              boxShadow: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <StyleIcon htmlColor="green" /> Flash Cards
          </Typography>
          <ButtonGroup orientation="vertical">
            <Button
              variant="contained"
              onClick={() => handleCardPlay(true)}
              sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            >
              Term First
            </Button>
            <Button variant="contained" onClick={() => handleCardPlay(false)}>
              Definition First
            </Button>
          </ButtonGroup>
          <Typography
            align="center"
            fontSize={20}
            sx={{
              bgcolor: "ivory",
              boxShadow: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <QuizIcon htmlColor="green" /> Take a Quiz
          </Typography>
          <ButtonGroup orientation="vertical">
            <Button
              sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              variant="contained"
              onClick={() => handleTakeQuiz("term")}
            >
              Terms as choices
            </Button>
            <Button
              variant="contained"
              onClick={() => handleTakeQuiz("definition")}
            >
              Definitions as choices
            </Button>
          </ButtonGroup>
          <Divider sx={{ marginY: 2 }} />
          <Typography
            align="center"
            fontSize={20}
            sx={{
              bgcolor: "ivory",
              boxShadow: 1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <TuneIcon htmlColor="green" /> More Options
          </Typography>
          <ButtonGroup orientation="vertical">
            <Button
              sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              variant="contained"
              onClick={() => setCardExportModalOpen(true)}
              startIcon={<FileDownloadIcon />}
            >
              Export Cards
            </Button>{" "}
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCardSet}
            >
              {isDeleting ? "Deleting..." : "Delete Card Set"}
            </Button>
          </ButtonGroup>
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
