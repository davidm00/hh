import React, { useState } from "react";
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
  Button
} from "@mui/material";
import {
  Favorite,
  ExpandMore as Expand,
  Share,
  MoreVert,
} from "@mui/icons-material";

import { getMonth, getTime } from "../../Constants/dates";
import { getAllComments } from "../../Services/comment.service";
import Comment from "../Comment/Comment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <Button sx={{bgcolor: 'primary.main', color: 'text.primary'}} variant="text" endIcon={ <Expand {...other} />}>
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

export default function Post({ info }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null);

  const handleExpandClick = () => {
    getAllComments(info.id)
      .then((res) => {
        console.log(`comments: `, res);
        setComments(res);
      })
      .then(setExpanded(!expanded));
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
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`${info.createdAt.getDate()} ${getMonth(
          info.createdAt.getMonth() + 1
        )} ${info.createdAt.getFullYear()} at ${getTime(info.createdAt)}`}
      />
      {info.image && (
        <CardMedia
          component="img"
          height="200"
          image={info.image._url}
          alt="Post Image"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {info.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }}/>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          // aria-expanded={expanded}
          aria-label="show more"
        >
          <Expand />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <Typography h6>Comments:</Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="start"
            spacing={2}
          >
            {comments &&
              comments.map((data, idx) => {
                return <Comment info={data} key={idx} />;
              })}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
