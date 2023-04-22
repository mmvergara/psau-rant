import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ButtonGroup from "@mui/material/ButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = {
  showNextCard: (quiz: "StillLearning" | "Know") => void;
  showPreviousCard: () => void;
};
const FlashCardsControls = ({ showNextCard, showPreviousCard }: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: isMobile ? "100%" : "60%",
        mt: 2,
      }}
    >
      <ButtonGroup disableElevation variant="contained">
        <Button
          sx={{ py: 2, borderRadius: 8 }}
          onClick={() => showPreviousCard()}
        >
          <KeyboardArrowLeftIcon sx={{ mr: isMobile ? 0 : 0.5 }} />
          {!isMobile && "Back"}
        </Button>
      </ButtonGroup>
      <ButtonGroup disableElevation variant="contained">
        <Button
          sx={{ py: 2, borderRadius: 10 }}
          onClick={() => showNextCard("StillLearning")}
        >
          Still Learning
        </Button>
        <Button
          sx={{ py: 2, borderRadius: 10 }}
          onClick={() => showNextCard("Know")}
        >
          I know <KeyboardArrowRightIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default FlashCardsControls;
