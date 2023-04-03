import { ModalProps, Modal, TextField, Box, Button } from "@mui/material";
type Props = ModalProps & { TextValue: string };
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

const CardExportModal = (props: Props) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(props.TextValue);
  };
  return (
    <Modal {...props}>
      <Box sx={style}>
        <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
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
