import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { toast } from "react-toastify";
import { useUserData } from "@/context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  drawerOpen: boolean;
  toggleDrawer: () => void;
};
type DrawerLinks = {
  name: string;
  icon: JSX.Element;
  url: string;
};

const NavDrawer = ({ drawerOpen, toggleDrawer }: Props) => {
  const router = useRouter();
  const { username, user } = useUserData();
  const drawerLinks: DrawerLinks[] = [
    { name: "Home", icon: <HomeIcon htmlColor="#ffffff" />, url: "/" },
    {
      name: "Settings",
      icon: <SettingsIcon htmlColor="#ffffff" />,
      url: "/settings",
    },
  ];

  const linkClickHandler = (url: string) => {
    toggleDrawer();
    router.push(url);
  };
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = async () => {
    try {
      await signOut(FirebaseAuth);
      router.push("/");
      toggleDrawer();
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Paper
        sx={{
          backgroundColor: "secondary.100",
          width: "300px",
          height: "100%",
          borderRadius: "0px",
          display: "flex",
          padding: "0px 30px",
          paddingTop: "20px",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1em",
        }}
      >
        <List>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "primary.100",
              letterSpacing: "1px",
              mb: 1,
            }}
            align="left"
          >
            Hiya! {username}
          </Typography>
          <Typography>{formattedDate}</Typography>
          {drawerLinks.map((link) => {
            return (
              <ListItem key={link.name} sx={{ padding: 0 }}>
                <Button
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "primary.100",
                    opacity: 0.8,
                    fontSize: "1.2em",
                    gap: "2px",
                    borderRadius: "8px",
                    marginTop: "20px",
                    width: "100%",
                    padding: "10px 0px",
                  }}
                  variant="contained"
                  onClick={() => linkClickHandler(link.url)}
                >
                  <Box
                    sx={{
                      letterSpacing: "2px",
                      display: "flex",
                      gap: "1em",
                      width: "100%",
                      px: "22px",
                    }}
                  >
                    {link.icon}
                    <Typography mt="1px">{link.name}</Typography>
                  </Box>
                </Button>
              </ListItem>
            );
          })}
        </List>
        {user && (
          <Button
            sx={{
              opacity: 0.8,
              fontSize: "1.2em",
              gap: "2px",
              borderRadius: "8px",
              marginBottom: "20px",
              width: "100%",
              padding: "10px 0px",
            }}
            color="error"
            variant="contained"
            onClick={handleLogout}
          >
            <Box
              sx={{
                letterSpacing: "2px",
                display: "flex",
                gap: "1em",
                width: "100%",
                px: "22px",
              }}
            >
              <ExitToAppIcon />
              <Typography mt="1px">Sign Out</Typography>
            </Box>
          </Button>
        )}
      </Paper>
    </Drawer>
  );
};

export default NavDrawer;
