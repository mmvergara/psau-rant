import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import AndroidIcon from "@mui/icons-material/Android";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DownloadApp = () => {
  return (
    <Box
      sx={{
        padding: 1.5,
        bgcolor: "#eef5ef",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 3,
        maxWidth: "1000px",
        cursor: "pointer",
      }}
    >
      <InstallMobileIcon htmlColor="#0b4619" />
      <Typography variant="h5" color="#0b4619" fontSize={16}>
        Download App
      </Typography>
      <AndroidIcon htmlColor="#0b4619" />
    </Box>
  );
};

export default DownloadApp;
