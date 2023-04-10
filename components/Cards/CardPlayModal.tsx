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
import CardPreviewContent from "./CardPreviewBox";

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

  return (
    <Modal open={true} onClose={() => handleActiveCardSet(null)}>
      <Box sx={modalContainerStyle}>
        <CardPreviewContent
          cardSet={activeCardSet}
          onCardDelete={onCardDelete}
        />
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
