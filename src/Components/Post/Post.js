import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import Parse from "parse/lib/browser/Parse";
import styled from "@emotion/styled";
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Stack,
  Button,
  Popover,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  useTheme,
  useMediaQuery,
  CardActionArea,
  Slide,
  Box,
} from "@mui/material";
import {
  Favorite,
  ExpandMore as Expand,
  Share,
  DeleteForever,
  Check,
  Close,
} from "@mui/icons-material";

import { getMonth, getTime } from "../../Constants/dates";
import { getAllComments } from "../../Services/comment.service";
import Comment from "../Comment/Comment";
import { UserContext } from "../../Context/userContext";
import {
  createNewComment,
  deleteComment,
} from "../../Services/comment.service";

const ExpandMore = styled((props) => {
  const { onClick, expand, ...other } = props;
  return (
    <Button
      onClick={onClick}
      sx={{ bgcolor: "primary.main", color: "text.primary" }}
      variant="text"
      endIcon={<Expand {...other} />}
    >
      Comments
    </Button>
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Post({ info, handleDeletePost }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPop = Boolean(anchorEl);
  const { localUser } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = useState({
    body: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openImage, setOpenImage] = React.useState(false);

  useLayoutEffect(() => {
    if (comments && deleted) {
      getAllComments(info.id).then((res) => {
        setComments(res);
        setDeleted(false);
      });
    }
  }, [deleted, info.id, comments, localUser]);

  const handleDeleteComment = async (id) => {
    console.log("delete post ", id);
    await deleteComment(id).then(() => {
      setDeleted(true);
    });
  };

  // Reply
  const handleNewComment = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Image
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const onChangeHandler = (prop) => (event) => {
    console.log(prop);
    console.log(event);
    setNewComment({ ...newComment, [prop]: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("New Comment: ", newComment);

    await createNewComment(Parse.User.current(), info.id, newComment).then(
      () => {
        setNewComment({
          body: "",
          image: "",
        });
        handleClose();
        getAllComments(info.id).then((res) => {
          console.log(`comments: `, res);
          setComments(res);
        });
      }
    );
  };

  const handleExpandClick = () => {
    getAllComments(info.id)
      .then((res) => {
        console.log(`comments: `, res);
        setComments(res);
      })
      .then(setExpanded(!expanded));
  };

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleDeletePost(info.id);
    handlePopOverClose();
  };

  return (
    <Card sx={{ minWidth: 500, bgcolor: "primary.main" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "text.primary", color: "text.secondary" }}
          >{`${info.authorFirstName.charAt(0)}${info.authorLastName.charAt(
            0
          )}`}</Avatar>
        }
        action={
          info.createdBy.id === localUser.id && (
            <>
              <IconButton aria-label="settings" onClick={handlePopOverClick}>
                <DeleteForever />
              </IconButton>
              <Popover
                open={openPop}
                anchorEl={anchorEl}
                onClose={handlePopOverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography sx={{ p: 2 }}>
                    Are you sure you want to delete this post?
                  </Typography>
                  <Typography variant="h6">
                    {"Yes"}
                    <IconButton aria-label="check" onClick={handleDelete}>
                      <Check color="success" />
                    </IconButton>
                  </Typography>
                  <Typography variant="h6">
                    {"No"}
                    <IconButton aria-label="check" onClick={handlePopOverClose}>
                      <Close color="error" />
                    </IconButton>
                  </Typography>
                </Stack>
              </Popover>
            </>
          )
        }
        title={`${info.createdAt.getDate()} ${getMonth(
          info.createdAt.getMonth() + 1
        )} ${info.createdAt.getFullYear()} at ${getTime(info.createdAt)}`}
      />
      {info.image && (
        <CardActionArea onClick={handleOpenImage}>
          <CardMedia
            component="img"
            height="200"
            image={info.image._url}
            alt="Post Image"
          />
        </CardActionArea>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontFamily: "inherit" }}>{info.body}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-label="show more"
        >
          <Expand />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <Typography component="h6">Comments:</Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="start"
            spacing={2}
          >
            {comments &&
              comments.map((data, idx) => {
                return (
                  <Comment
                    info={data}
                    key={idx}
                    onDelete={handleDeleteComment}
                  />
                );
              })}
            {open && (
              <Comment
                info={localUser}
                inputType={true}
                handleHide={handleClose}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
              />
            )}
            <Button onClick={handleNewComment}>Reply</Button>
          </Stack>
        </CardContent>
      </Collapse>
      <Dialog
        fullScreen={fullScreen}
        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
        keepMounted
      >
        <Stack direction="row" justifyContent="center" alignItems="start">
          <DialogTitle
            sx={{ flexGrow: 1, pt: "2rem" }}
            id="responsive-dialog-title"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography maxWidth={"30%"} component={"p"} variant="h6" sx={{}}>
                {info.body}
              </Typography>
              <Typography variant="body1">
                By {`${info.authorFirstName} ${info.authorLastName}`}
              </Typography>
            </Stack>
          </DialogTitle>
          <IconButton
            sx={{ m: "2rem", mb: 0, position: 'absolute', right: 10 }}
            aria-label="delete"
            onClick={handleCloseImage}
          >
            <Close />
          </IconButton>
        </Stack>
        <DialogContent>
          {info.image && (
            <Box width={"100%"} sx={{ flexGrow: 1 }}>
              <img
                style={{ maxWidth: "100%" }}
                src={info.image._url}
                alt="post"
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
