import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  BackdropRoot,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Paper,
} from "@mui/material";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { borderRadius } from "@mui/system";
import NavDrawer from "./Drawer/NavDrawer";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((o) => !o);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Button
            color="secondary"
            variant="contained"
            style={{ fontWeight: 600, color: "primary.main" }}
          >
            Login
          </Button>
          <IconButton size="large" color="inherit" onClick={handleClick}>
            <AccountCircle />
          </IconButton>
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
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
