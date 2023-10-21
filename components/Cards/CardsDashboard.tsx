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
import StyleIcon from "@mui/icons-material/Style";
import { Paper } from "@mui/material";

const CardsDashboard = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Paper>
        <Box
          sx={{
            bgcolor: "primary.main",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              ml: 2,
              py: 2,
              display: "flex",
              justifyContent: "center",
              gap:1,
              alignItems: "center", 
            }}
          >
            My Flash Cards <StyleIcon />
          </Typography>
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

            <Divider />
            <CardsList />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default CardsDashboard;
