import Modal, { ModalProps } from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
type Props = ModalProps & { TextValue: string };
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "400px",
  bgcolor: "ivory",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const CardExportModal = (props: Props) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(props.TextValue);
    toast.success("Copied to Clipboard", { position: "top-right" });
    if (props.onClose) props.onClose({}, "escapeKeyDown");
  };
  return (
    <Modal {...props}>
      <Box sx={style}>
        <Button
          variant="contained"
          onClick={handleCopyToClipboard}
          sx={{ width: "100%", mb: 2 }}
        >
          Copy to Clipboard
        </Button>
        <TextField
          sx={{ width: "100%", maxHeight: "400px", overflowY: "scroll" }}
          multiline
          disabled
          value={props.TextValue}
        />
      </Box>
    </Modal>
  );
};

export default CardExportModal;
