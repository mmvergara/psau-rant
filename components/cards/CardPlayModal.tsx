import { CardSet } from "@/types/models/card_types";
import { Modal, Box, Typography, Button, Stack, Divider } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  activeCardSet: CardSet | null;
  handleActiveCardSet: (cardSet: CardSet | null) => void;
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

const CardPlayModal = ({ activeCardSet, handleActiveCardSet }: Props) => {
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
    const path = `/cards/${card_set_id}/quiz?${shuffled ? "shuffled=true" : ""}${
      termFirst ? "&termFirst=true" : ""
    }`;
    console.log(path);
    router.push(path);
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
        </Stack>
      </Box>
    </Modal>
  );
};

export default CardPlayModal;
