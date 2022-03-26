import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  FilledInput,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

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
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-body">Body</InputLabel>
            <FilledInput
              id="filled-adornment-body"
              type={"text"}
              value={post.body}
              onChange={onChange("body")}
              label="Body"
              multiline
              rows={4}
              sx={{ input: { color: 'red' } }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-body">Image</InputLabel>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
};

export default NewPostForm;
