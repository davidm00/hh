import React from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  Stack,
  Button,
  FilledInput,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Check } from "@mui/icons-material";

const NewPostForm = ({ post, onChange, onSubmit }) => {

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
              value={post.body}
              onChange={onChange("body")}
              label="Body"
              multiline
              rows={5}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <Button variant="contained" component="label">
              <Typography variant={"body1"}>Add Image</Typography>
              <input onChange={onChange("image")} type="file" hidden />
              {post.image && (
                <Check sx={{color: "secondary.light"}}/>
              )}
            </Button>
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
};

export default NewPostForm;
