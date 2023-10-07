import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardExportModal from "@/components/Cards/CardExportModal";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import StyleIcon from "@mui/icons-material/Style";
import QuizIcon from "@mui/icons-material/Quiz";
import TuneIcon from "@mui/icons-material/Tune";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { deleteCardSetById } from "@/firebase/services/cards_services";
import { useUserData } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { CardSet, ChoicesType } from "@/types/models/card_types";
import { toast } from "react-toastify";

type Props = {
  cardSet: CardSet;
  onCardDelete: () => void;
};

const CardPreviewContent = ({ cardSet, onCardDelete }: Props) => {
  const router = useRouter();
  const { user } = useUserData();
  const { card_set_id, card_set_name } = cardSet;

  const [shuffled, setShuffled] = useState(true);
  const handleCardPlay = (questionFirst: boolean) => {
    const path = `/cards/${card_set_id}/flashcards?${
      shuffled ? "shuffled=true" : ""
    }${questionFirst ? "&questionFirst=true" : ""}`;
    router.push(path);
  };

  const handleTakeQuiz = (choiceType: ChoicesType) => {
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

  const handleCopyLink = () => {
    const url = `https://psaurant.vercel.app/cards/${card_set_id}/preview`;
    navigator.clipboard.writeText(url);
    toast.success("Link Copied to clipboard!");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(card_set_id);
    toast.success("ID Copied to clipboard!");
  };

  const [CardExportModalOpen, setCardExportModalOpen] = useState(false);

  const cardsText = cardSet.card_set_cards
    .map((card) => {
      return `${card.card_question}\n${card.card_answer}\n\n`;
    })
    .join("\n");

  const isOwner = cardSet.card_set_author_id === user?.uid;
  const isPublic = cardSet.card_set_isPublic;
  return (
    <>
      <CardExportModal
        TextValue={cardsText}
        open={CardExportModalOpen}
        onClose={() => setCardExportModalOpen(false)}
        children={<></>}
      />
      <Typography fontSize={20}>Card Set : {card_set_name}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormGroup
          sx={{
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
        <ButtonGroup variant="contained" color="inherit">
          <Button
            color="info"
            startIcon={<InsertLinkIcon />}
            onClick={handleCopyLink}
            disabled={!isPublic}
          >
            Link
          </Button>
          <Button
            color="info"
            startIcon={<InsertLinkIcon />}
            onClick={handleCopyId}
            disabled={!isPublic}
          >
            ID
          </Button>
        </ButtonGroup>
      </Stack>
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
            Question First
          </Button>
          <Button variant="contained" onClick={() => handleCardPlay(false)}>
            Answer First
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
            onClick={() => handleTakeQuiz("question")}
          >
            Question as choices
          </Button>
          <Button variant="contained" onClick={() => handleTakeQuiz("answer")}>
            Answer as choices
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
          {isOwner && (
            <Button
              variant="contained"
              color="info"
              onClick={() => router.push(`/cards/${card_set_id}/add`)}
            >
              Add Cards
            </Button>
          )}
          <Button
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, py: 4 }}
            variant="contained"
            onClick={() => setCardExportModalOpen(true)}
            startIcon={<FileDownloadIcon />}
          >
            Export Cards
          </Button>{" "}
          {isOwner && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteCardSet}
              >
                {isDeleting ? "Deleting..." : "Delete Card Set"}
              </Button>
            </>
          )}
        </ButtonGroup>
      </Stack>
    </>
  );
};

export default CardPreviewContent;
