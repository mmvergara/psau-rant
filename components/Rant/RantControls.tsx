import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

const RantControls = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderTop: "12px solid green",
        borderRadius: 1,
        mt: 4,
        p: "20px",
      }}
    >
      <TextField sx={{ borderRadius: 10 }} label="Search Rants" />
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => router.push("/rant/create")}
        >
          Create Rant
        </Button>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => router.push("/cards/")}
        >
          Flip Cards
        </Button>
      </Box>
    </Box>
  );
};

export default RantControls;
