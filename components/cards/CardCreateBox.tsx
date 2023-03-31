import { Card } from "@/types/models/card_types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  CardData: Card;
  onCardDelete: (card_id: string) => void;
  onCardChange: (
    card_id: string,
    {
      fieldType,
      value,
    }: {
      fieldType: "Term" | "Definition";
      value: string;
    }
  ) => void;
};

const CardCreateBox = ({ CardData, onCardChange, onCardDelete }: Props) => {
  const { card_id, card_definition, card_term } = CardData;
  return (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography>Card #{card_id}</Typography>
        <Box
          sx={{
            cursor: "pointer",
            color: "rgb(244, 67, 54)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0.5,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={() => onCardDelete(card_id)}
        >
          <CloseIcon />
        </Box>
      </Box>
      <TextField
        label="Term"
        onChange={(e) =>
          onCardChange(card_id, {
            fieldType: "Term",
            value: e.target.value || "",
          })
        }
        value={card_term}
        sx={{ width: "100%", my: 1 }}
      />{" "}
      <br />
      <TextField
        label="Definition"
        multiline
        onChange={(e) =>
          onCardChange(card_id, {
            fieldType: "Definition",
            value: e.target.value || "",
          })
        }
        value={card_definition}
        sx={{ width: "100%", my: 1 }}
      />
    </Box>
  );
};

export default CardCreateBox;
