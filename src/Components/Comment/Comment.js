import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  IconButton,
  Avatar,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import { getMonth, getTime } from "../../Constants/dates";

export default function Comment({ info }) {
  return (
    <Card sx={{ width: '100%', bgcolor: 'primary.light' }}>
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
        // subheader={info.body}
      />
      {info.image && (
        <CardMedia
          component="img"
          height="140"
          image={info.image._url}
          alt="Post Image"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {info.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
