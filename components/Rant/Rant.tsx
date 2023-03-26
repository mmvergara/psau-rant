import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getTimeElapsedString } from "@/utilities/Date";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const Rant = () => {
  const timeElapsed = getTimeElapsedString(
    new Date("Sun Mar 26 2023 07:38:18 GMT+0800 (Singapore Standard Time)")
  );
  return (
    <Box
      component="article"
      sx={{
        bgcolor: "transparent",
        mt: 5,
        width: "100%",
        maxWidth: "1000px",
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          padding: 1.5,
          bgcolor: "#0b4619e1",
          color: "white",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <Typography variant="h5">Rant Title</Typography>
      </Box>
      <Box
        sx={{
          padding: 1.5,
          pt: 2,
          bgcolor: "#eef5ef",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptate quae quibusdam voluptatem quos
          voluptatum quas quidem quas quidem quas quidem quas quidem quas quidem
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: 2,
            py: 1,
            pt: 2,
          }}
        >
          <Box
            color="dimgray"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography sx={{ fontSize: "13px" }}>Author Name </Typography>
            <Typography sx={{ display: "inline", fontSize: 10 }}>
              <Divider />
              {timeElapsed}
            </Typography>
          </Box>

          <Button
            color="error"
            variant="contained"
            sx={{ display: "flex", gap: 1 }}
          >
            <FavoriteBorderIcon /> 2
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Rant;