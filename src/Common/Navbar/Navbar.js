import React, { useContext, useState } from "react";
import Parse from "parse/lib/browser/Parse";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
} from "@mui/material";
import {
  ArrowBack,
  ManageAccounts as Account,
  Forum,
  Handshake,
  QuestionMark,
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
  const { localUser, setLocalUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);


  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const logOut = () => {
    Parse.User.logOut();
    setLocalUser(null);
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NAME??
            </Typography>
            {localUser && (
              <Button color="inherit" onClick={() => logOut()}>
                Log Out
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
              {["Account", "Communities", "Initiatives", "About"].map((text) => (
                <Link
                  to={`/${text.toLowerCase()}`}
                  key={text}
                  onClick={() => toggleDrawer()}
                >
                  <ListItem button>
                    <ListItemIcon sx={{ color: "black" }}>
                      {text === "Account" && <Account />}
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
                  src={process.env.PUBLIC_URL + '/recycle.png'}
                  alt="recycleLogo"
                />
              </Typography>
            </Box>
          </Box>
        </Drawer>
      </Box>
      {/* <Button
        sx={{
          top: 65,
          left: 0,
          marginBottom: 2.5,
          visibility:
            (location.pathname === "/") &&
            "hidden",
        }}
        onClick={() => navigate(-1)}
        color="inherit"
      >
        <ArrowBack /> Back
      </Button> */}
    </Box>
  );
};

export default Navbar;
