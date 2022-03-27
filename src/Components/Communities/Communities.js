import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Parse from "parse/lib/browser/Parse";
import { Typography, Box, Stack } from "@mui/material";
import VerticalTabs from "../../Common/VerticalTabs/VerticalTabs";

import { getAllCommunities } from "../../Services/community.service";
import { UserContext } from "../../Context/userContext";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const { localUser } = useContext(UserContext);

  useLayoutEffect(() => {
    let currentUser = Parse.User.current();
    if (currentUser) {
      getAllCommunities(currentUser.id).then((res) => {
        console.log("Communities: ", res);
        setCommunities(res);
      });
    }
  }, [localUser]);

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
        justifyContent="start"
        alignItems="start"
        spacing={2}
      >
        <VerticalTabs data={communities} />
      </Stack>
    </Box>
  );
};

export default Communities;
