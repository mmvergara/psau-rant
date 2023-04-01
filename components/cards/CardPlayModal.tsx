import { deleteCardSetById } from "@/firebase/services/cards_services";
import { CardSet } from "@/types/models/card_types";
import { Modal, Box, Typography, Button, Stack, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  activeCardSet: CardSet | null;
  handleActiveCardSet: (cardSet: CardSet | null) => void;
  onCardDelete: () => void;
};
const style = {
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

const CardPlayModal = ({
  activeCardSet,
  handleActiveCardSet,
  onCardDelete,
}: Props) => {
  if (!activeCardSet) return null;
  const router = useRouter();
  const { card_set_id, card_set_name } = activeCardSet;

  const handleCardPlay = ({
    shuffled,
    termFirst,
  }: {
    shuffled: boolean;
    termFirst: boolean;
  }) => {
    const path = `/cards/${card_set_id}/quiz?${
      shuffled ? "shuffled=true" : ""
    }${termFirst ? "&termFirst=true" : ""}`;
    router.push(path);
  };

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDeleteCardSet = async () => {
    setIsDeleting(true);
    const { error } = await deleteCardSetById(card_set_id);
    setIsDeleting(false);
    onCardDelete();
    if (error) return toast.error(error);
    toast.success("Card Set Deleted");
  };
  return (
    <Modal open={true} onClose={() => handleActiveCardSet(null)}>
      <Box sx={style}>
        <Typography mb={2} fontSize={20}>
          Card Set : {card_set_name}
        </Typography>
        <Stack spacing={2}>
          <Divider />
          <Button
            variant="contained"
            onClick={() => {
              handleCardPlay({ shuffled: false, termFirst: false });
            }}
          >
            Definition First
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCardPlay({ shuffled: false, termFirst: true });
            }}
          >
            Term First{" "}
          </Button>
          <Divider />
          <Button
            variant="contained"
            onClick={() => {
              handleCardPlay({ shuffled: true, termFirst: false });
            }}
          >
            Definition First + Shuffled
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCardPlay({ shuffled: true, termFirst: true });
            }}
          >
            Term First + Shuffled
          </Button>
          <Divider />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleCardPlay({ shuffled: true, termFirst: true });
            }}
          >
            Edit Card Set
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
