import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const Home = () => {
  const { localUser } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localUser) {
      setAuth(true);
    }
  }, [localUser]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      minHeight="100vh"
      sx={{padding: '5rem'}}
    >
      <Stack>
        <h1>Home Page</h1>
        {!auth && (
          <div>
            <Button onClick={() => navigate("/login")}>Login</Button>{" "}
            <Button onClick={() => navigate("/register")}>Register</Button>
          </div>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
