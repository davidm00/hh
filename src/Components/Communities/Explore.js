import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import Parse from "parse/lib/browser/Parse";
import {
  Stack,
  Box,
  Typography,
  Button,
  Skeleton,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
} from "@mui/material";
import { getAllComm, joinCommunity } from "../../Services/community.service";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [forums, setForums] = useState(null);
  const navigate = useNavigate();

  const handleJoin = async (data) => {
      console.log(data)
      console.log("JOINING")
      await joinCommunity(data.id).then(() => {
          navigate("/", {replace: true})
      })
  };

  useLayoutEffect(() => {
    getAllComm().then((res) => {
      setForums(res);
    });
  }, []);

  return forums ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      minHeight="100vh"
      minWidth={"800px"}
      sx={{ pt: "2.5rem" }}
    >
      <Grid container spacing={4} sx={{ pl: "10vw" }}>
        {forums[0].attributes &&
          forums.map((data) => {
            return (
              <Grid key={data.id} item>
                <Card sx={{ maxWidth: 250, backgroundColor: "primary.main" }}>
                  <CardContent>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "text.primary",
                          color: "text.secondary",
                        }}
                      >{`${data.attributes.name.charAt(0)}`}</Avatar>
                      <Typography variant="h5" component="div" align="center">
                        {data.attributes.name}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button sx={{ flexGrow: 1 }} onClick={() => handleJoin(data)}>
                      Join
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  ) : (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {[1, 2, 3].map((idx) => {
        return (
          <Grid key={idx} item>
            <Skeleton variant="rectangular" width={"250px"} height={"250px"} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Explore;
