import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

const Initiative = ({info}) => {
    console.log("TESTING: ", info.link.split('&ved'))

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
    >
      {/* <Typography variant={'h3'}>Initiative Component</Typography> */}
      <Card sx={{ maxWidth: 250, backgroundColor: "primary.main" }}>
      <CardHeader
        subheader={info.title}
      />
        <CardContent>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Typography variant="caption" component="div" align="center" style={{maxHeight: '100%', overflow: 'auto'}}>
              {info.snippet}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button target={"_blank"} href={info.link.split('/&ved')[0]} sx={{ flexGrow: 1 }}>
            Visit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Initiative;
