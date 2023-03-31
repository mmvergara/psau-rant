import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const CenterCircularProgress: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "10vh" ,flexGrow:1}}>
      <CircularProgress />
    </Box>
  );
};

export default CenterCircularProgress;
