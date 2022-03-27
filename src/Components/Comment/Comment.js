import React, {useContext} from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Avatar,
  TextField,
  Stack,
  Button,
  Popover
} from "@mui/material";
import { Close, DeleteForever, Check } from "@mui/icons-material";

import { getMonth, getTime } from "../../Constants/dates";
import { UserContext } from "../../Context/userContext";

export default function Comment({
  info,
  inputType = false,
  handleHide = null,
  onChange = false,
  onSubmit = false,
  onDelete = false,
}) {
  const { localUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPop = Boolean(anchorEl);

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(info.id);
    handlePopOverClose();
  };

  return !inputType ? (
    <Card sx={{ width: "100%", bgcolor: "primary.light" }}>
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
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {info.body}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <Card sx={{ width: "100%", bgcolor: "primary.light" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "text.primary", color: "text.secondary" }}
          >{`${info.get("firstName").charAt(0)}${info
            .get("lastName")
            .charAt(0)}`}</Avatar>
        }
        action={
          <IconButton aria-label="delete" onClick={handleHide}>
            <Close />
          </IconButton>
        }
        title={"Reply to thread"}
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField onChange={onChange("body")} sx={{ flexGrow: 1 }} />
          <Button onClick={onSubmit}>Reply</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
