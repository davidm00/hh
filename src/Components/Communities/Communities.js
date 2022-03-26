import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Parse from "parse/lib/browser/Parse";
import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import VerticalTabs from "../../Common/VerticalTabs/VerticalTabs";
import { useTheme } from "@emotion/react";

import { getAllCommunities } from "../../Services/community.service";
import { UserContext } from "../../Context/userContext";
import NewPostForm from "./NewPostForm";

const StyledFab = styled((props) => {
  const { ...other } = props;
  return (
    <Stack
      {...other}
      direction="column"
      justifyContent="center"
      alignItems="end"
    >
      <Button
        sx={{
          bgcolor: "primary.main",
          color: "text.primary",
          borderRadius: 8,
          padding: 2,
        }}
        endIcon={<Add />}
      >
        New Post
      </Button>
    </Stack>
  );
})(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: "auto",
  right: "5vw",
  margin: "0 auto",
  borderRadius: 50,
}));

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { localUser } = useContext(UserContext);
  const [add, setAdd] = useState(false);
  const [newPost, setNewPost] = useState({
    body: "",
    image: "",
    community: "",
    authorLastName: "",
    authorFirstName: "",
    createdBy: ""
  });

  const handleNewPost = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (prop) => (event) => {
    setNewPost({ ...newPost, [prop]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("submitted: ", e.target);
    setAdd(true);
  };

  useEffect(() => {
    if (newPost && add) {
      
      setAdd(false)
    }
  }, [newPost, add]);

  useEffect(() => {
    let currentUser = Parse.User.current();
    if (currentUser) {
      getAllCommunities(currentUser.id).then((res) => {
        console.log("Communities: ", res);
        setCommunities(res);
      });
    }
  }, [localUser]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      minHeight="100vh"
      minWidth="100vw"
      sx={{ padding: "5rem" }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h1" component="div">
          Communities
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              color: "text.primary",
              top: "auto",
              bottom: 0,
            }}
          >
            <Toolbar>
              <StyledFab
                color="inherit"
                sx={{ bgcolor: "primary.main", color: "text.primary" }}
                onClick={handleNewPost}
              />
            </Toolbar>
          </AppBar>
        </Box>
        <VerticalTabs data={communities} />
      </Stack>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Create New Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: 'text.primary'}}>
            Want to increase awareness about an issue? Have some ideas on how to improve your local community? Write it here.
          </DialogContentText>
          <NewPostForm post={newPost} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitHandler} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Communities;
