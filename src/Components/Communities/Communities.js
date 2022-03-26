import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import VerticalTabs from "../../Common/VerticalTabs/VerticalTabs";

const Communities = () => {
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
        <Typography variant="h1" component="div">Communities Component</Typography>
        <VerticalTabs />
      </Stack>
    </Box>
  );
};

export default Communities;
