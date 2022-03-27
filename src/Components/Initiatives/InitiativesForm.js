import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  Stack,
  Button,
} from "@mui/material";

import { Tags, Topics, Locations } from "../../Constants/searchTerms";

const InitiativesForm = ({ handleSubmit, onChange, data }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      minWidth="100vw"
      sx={{ padding: "5rem"}}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="start"
        spacing={2}
        sx={{ padding: "1.5rem", bgcolor: "secondary.dark", borderRadius: 15 }}
      >
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Location
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={data.location}
            onChange={onChange("location")}
          >
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="end"
              spacing={2}
            >
              {Locations.map((name, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={name}
                    control={<Radio sx={{color: 'primary.dark'}} />}
                    label={name}
                  />
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Tag</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={data.tag}
            onChange={onChange("tag")}
          >
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="end"
              spacing={2}
            >
              {Tags.map((name, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={name}
                    control={<Radio />}
                    label={name}
                  />
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Topic of Interest
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={data.topic}
            onChange={onChange("topic")}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="end"
              spacing={2}
            >
              {Topics.map((name, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={name}
                    control={<Radio />}
                    label={name}
                  />
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
        <Button onClick={handleSubmit} sx={{left: "45%"}}>Search</Button>
      </Stack>
    </Box>
  );
};

export default InitiativesForm;
