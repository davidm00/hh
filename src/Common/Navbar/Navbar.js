import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  Button,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Avatar,
} from "@mui/material";
import {
  Forum,
  Handshake,
  QuestionMark,
  Home,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../../Context/userContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: "black",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: 240,
      boxSizing: "border-box",
      backgroundColor: theme.palette.secondary.main,
      color: "black",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { localUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className={classes.appBar}
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Button
            disableElevation
              variant="text"
              onClick={() => navigate("/", { replace: true })}
              startIcon={<Home />}
            >
              EcoSource
            </Button>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            {localUser && localUser.attributes && (
              <IconButton
                size={"large"}
                edge="start"
                color="inherit"
                aria-label="home"
                onClick={() => navigate("/account", { replace: true })}
              >
                <Avatar sx={{bgcolor: 'text.primary', color: 'text.secondary'}}>{`${localUser.attributes.firstName.charAt(0)}${localUser.attributes.lastName.charAt(0)}`}</Avatar>
              </IconButton>
            )}
            {!localUser && (
              <Button
                sx={{
                  visibility:
                    (location.pathname === "/login" ||
                      location.pathname === "/register") &&
                    "hidden",
                }}
                color="inherit"
                onClick={() => navigate("/login", { replace: true })}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          open={openDrawer}
          onClose={toggleDrawer}
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Communities", "Initiatives", "About"].map((text) => (
                <Link
                  to={`/${text.toLowerCase()}`}
                  key={text}
                  onClick={() => toggleDrawer()}
                >
                  <ListItem button>
                    <ListItemIcon sx={{ color: "black" }}>
                      {text === "Communities" && <Forum />}
                      {text === "Initiatives" && <Handshake />}
                      {text === "About" && <QuestionMark />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <Box sx={{ flexGrow: 1 }}>
              <Typography align="center" sx={{ paddingTop: 5 }}>
                <img
                  height={"200px"}
                  src={process.env.PUBLIC_URL + "/recycle.png"}
                  alt="recycleLogo"
                />
              </Typography>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
