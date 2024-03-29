import AddUsernameModal from "./AddUsernameModal";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
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
import Link from "next/link";
import Box from "@mui/material/Box";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { useUserData } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useMainTheme } from "@/theme/ThemeContextProvider";

type Props = {
  authIsLoading: boolean;
  needToSetUsername: boolean;
};

const Navbar = ({ authIsLoading, needToSetUsername }: Props) => {
  const { toggleColorMode, mode } = useMainTheme();
  const router = useRouter();
  const { user } = useUserData();

  const openAddUsernameModal =
    needToSetUsername && router.pathname !== "/auth/signin";

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
        {user && (
          <NavDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        )}
        <Toolbar>
          {user && (
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
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link
              href="/"
              style={{
                flexGrow: 1,
                textDecoration: "none",
                color: "white",
              }}
            >
              PSAU Rant
            </Link>
          </Typography>
          <IconButton size="large" color="inherit" onClick={toggleColorMode}>
            {mode === "light" ? <DarkModeIcon /> : <Brightness7Icon />}
          </IconButton>

          {!authIsLoading && (
            <>
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
            </>
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
