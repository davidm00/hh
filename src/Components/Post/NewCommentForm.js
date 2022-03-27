import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Stack,
  Button,
  FilledInput,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  inputField: {
    backgroundColor: "red",
    padding: 100,
  },
}));

const NewCommentForm = ({ comment, onChange, onSubmit }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ flexWrap: "wrap" }}
    >
      <form onSubmit={onSubmit} autoComplete="off">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <FormControl sx={{ m: 1, width: "40ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-body">Body</InputLabel>
            <FilledInput
              id="filled-adornment-body"
              type={"text"}
              value={comment.body}
              onChange={onChange("body")}
              label="Body"
              multiline
              rows={5}
              className={classes.inputField}
            />
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
};

export default NewCommentForm;
