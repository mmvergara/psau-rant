import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NavDrawer from "./Drawer/NavDrawer";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import AddUsernameModal from "./AddUsernameModal";
import { signOut } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { toast } from "react-toastify";
import { useUserData } from "@/context/useName";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { username, user } = useUserData();

  const [openAddUsernameModal, setOpenAddUsernameModal] = useState(false);

  const checkUsername = () => {
    // if user is logged in and username is not set, open add username modal
    if (user && !!username) setOpenAddUsernameModal(true);
  };

  useEffect(() => {
    checkUsername();
  }, [user]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleAccountIconClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => setDrawerOpen((o) => !o);

  const handleLogoutMenuBtnClick = async () => {
    try {
      await signOut(FirebaseAuth);
      toast.success("Signed Out Successfully");
      handleClose();
      router.push("/");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {openAddUsernameModal && <AddUsernameModal />}
      <AppBar position="static" color="primary">
        <NavDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PSAU Rant
          </Typography>
          {user ? (
            <IconButton
              size="large"
              color="inherit"
              onClick={handleAccountIconClick}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              style={{ fontWeight: 600, color: "primary.main" }}
              onClick={() => router.push("/auth/signin")}
            >
              Login
            </Button>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ borderRadius: "0px" }}
            PaperProps={{
              sx: { backgroundColor: "primary.100" },
            }}
            MenuListProps={{
              sx: {
                color: "secondary.100",
                fontWeight: 600,
              },
            }}
          >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogoutMenuBtnClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
