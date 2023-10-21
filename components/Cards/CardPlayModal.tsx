import CardPreviewContent from "./CardPreviewBox";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { CardSet } from "@/types/models/CardTypes";
import { useMainTheme } from "@/theme/ThemeContextProvider";

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
  const { mode } = useMainTheme();
  if (!activeCardSet) return null;

  return (
    <Modal open={true} onClose={() => handleActiveCardSet(null)}>
      <Paper
        sx={{
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
          backgroundColor: mode === "light" ? "#ecd8a4" : "#333",
        }}
      >
        <CardPreviewContent
          cardSet={activeCardSet}
          onCardDelete={onCardDelete}
        />
      </Paper>
    </Modal>
  );
};

export default CardPlayModal;
