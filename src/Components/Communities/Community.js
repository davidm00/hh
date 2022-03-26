import React, { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";

import Post from "../Post/Post";

import { getAllPosts } from "../../Services/post.service";

const Community = ({ data, idx }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getAllPosts(data.id).then((res) => {
      console.log(`posts: `, res);
      setPosts(res);
    });
  }, [data.id]);

  return (
    <Stack>
      {data.name}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        minHeight="100vh"
        minWidth={"100%"}
        sx={{ padding: "5rem", flexGrow: 1 }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {posts && posts.length < 1 &&  (
          <Typography h5>No posts in this thread!</Typography>
          )}
          {posts &&
            posts.map((info, idx) => {
              return <Post key={idx} info={info} />;
            })}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Community;
