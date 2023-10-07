import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CardsList from "./CardsLists";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Box from "@mui/material/Box";

const CardsDashboard = () => {
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
              endIcon={<CreateNewFolderIcon />}
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

export default CardsDashboard;
