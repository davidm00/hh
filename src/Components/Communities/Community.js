import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import Parse from "parse/lib/browser/Parse";
import {
  Stack,
  Box,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Add, ExitToApp } from "@mui/icons-material";

import Post from "../Post/Post";
import NewPostForm from "./NewPostForm";

import { createNewPost, deletePost } from "../../Services/post.service";
import { leaveCommunity } from "../../Services/community.service";
import { getAllPosts } from "../../Services/post.service";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

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

const Community = ({ data, idx }) => {
  const [posts, setPosts] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const [newPost, setNewPost] = useState({
    body: "",
    image: "",
  });
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { localUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeletePost = async (id) => {
    console.log("delete post ", id);
    await deletePost(id).then(() => {
      setDeleted(true);
    });
  };

  const handleNewPost = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (prop) => (event) => {
    console.log(prop);
    console.log(event);
    if (prop === "image") {
      const files = Array.from(event.target.files);
      console.log("files:", files);
      setNewPost({ ...newPost, [prop]: event.target.files[0] });
    } else {
      setNewPost({ ...newPost, [prop]: event.target.value });
    }
  };

  const handleLeave = (id) => {
    leaveCommunity(id).then(() => {
      navigate("/", {replace: true})
    });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("New Post: ", newPost);

    await createNewPost(Parse.User.current(), data.id, newPost).then(() => {
      setNewPost({
        body: "",
        image: "",
      });
      handleClose();
      setUpdate(true);
    });
  };

  useLayoutEffect(() => {
    if (newPost && update) {
      setUpdate(false);
    }
  }, [newPost, update]);

  useLayoutEffect(() => {
    if (posts && deleted) {
      getAllPosts(data.id).then((res) => {
        setPosts(res);
        setDeleted(false);
      });
    }
  }, [deleted, data.id, posts]);

  useLayoutEffect(() => {
    getAllPosts(data.id).then((res) => {
      setPosts(res);
    });
  }, [data.id, update, localUser]);

  return data ? (
    <Box>
      <Typography variant="h2" align="center">
        {data.name} Forum
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        minHeight="100vh"
        minWidth={"800px"}
        sx={{ pt: "2.5rem" }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {posts && posts.length < 1 && (
            <Typography component={"h5"}>No posts in this thread!</Typography>
          )}
          {posts &&
            posts.map((info, idx) => {
              return (
                <Post
                  key={idx}
                  info={info}
                  handleDeletePost={handleDeletePost}
                />
              );
            })}
        </Stack>
      </Box>
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
            <Button onClick={() => handleLeave(data.id)} endIcon={<ExitToApp/>}>Leave Forum</Button>
            <StyledFab
              color="inherit"
              sx={{ bgcolor: "primary.main", color: "text.primary" }}
              onClick={handleNewPost}
            />
          </Toolbar>
        </AppBar>
      </Box>
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
          <DialogContentText sx={{ color: "text.primary" }}>
            Want to increase awareness about an issue? Have some ideas on how to
            improve your local community? Write it here.
          </DialogContentText>
          <NewPostForm
            post={newPost}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
          />
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button onClick={onSubmitHandler} autoFocus>
              Submit
            </Button>
            <Button
              onClick={() => {
                setNewPost({
                  body: "",
                  image: "",
                });
              }}
              autoFocus
            >
              Clear
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={"800px"} height={"250px"} />
  );
};

export default Community;
