import CardPreviewContent from "./CardPreviewBox";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { CardSet } from "@/types/models/card_types";

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
