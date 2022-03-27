import React, { useContext } from "react";
import Parse from "parse/lib/browser/Parse";
import { Box, Stack, Button } from "@mui/material";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { localUser, setLocalUser, localLogOut } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => {
    localLogOut();
    setLocalUser(null);
    navigate("/login", { replace: true });
  };
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
        <h1>Your Account</h1>
        <Button color="inherit" disabled>
          Favorites
        </Button>
        <Button color="inherit" disabled>
          Drafts
        </Button>
        <Button color="inherit" onClick={() => logOut()}>
          Log Out
        </Button>
      </Stack>
    </Box>
  );
};

export default Account;
