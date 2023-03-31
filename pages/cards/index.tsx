import CardsList from "@/components/cards/CardsLists";
import { truncateString } from "@/utilities/StringFormatter";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

const CardsPage = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ bgcolor: "white" }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography sx={{ color: "white" }}>Flip Cards </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Button
              LinkComponent={Link}
              href={"/cards/create"}
              variant="contained"
              sx={{ width: "fit-content" }}
            >
              Create New Card Set
            </Button>
            <TextField
              label="Search Flip Cards"
              sx={{ width: "fit-content" }}
            />
            <Divider />
            <CardsList />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default CardsPage;
