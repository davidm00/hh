import { CircularProgress, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../Context/searchContext";
import Initiative from "./Initiative";
import InitiativesForm from "./InitiativesForm";

const useStyles = makeStyles(() => ({
  grid: {
    margin: 20,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridAutoRows: "minmax(100px, auto)",
    justifyContent: "center",
    alignContent: "end",
    gridGap: 10,
  },
}));

const InitiativeHelper = ({ info, search, setInfo, setSearch }) => {
  const [update, setUpdate] = useState(false);
  const { setLocalInfo, localInfo } = useContext(SearchContext);
  const classes = useStyles();

  const onChangeHandler = (prop) => (event) => {
    // console.log(prop);
    // console.log(event);
    setSearch({ ...search, [prop]: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("SERCH", search);
    setLocalInfo(null);
    let res = await fetch(
      `http://127.0.0.1:5000/api?term=${search.topic.replaceAll(
        " ",
        "-"
      )}&tag=${search.tag.replaceAll(
        " ",
        "-"
      )}&location=${search.location.replaceAll(" ", "-")}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUpdate(true);
        console.log(data);
        // setInfo(data);
        setLocalInfo(data);
      });
  };

  useEffect(() => {
    console.log("rendered");
    console.log("infoooo: ", localInfo);
    if (update) {
      setUpdate(false);
    }
  }, [localInfo, update]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      // minHeight="100vh"
      minWidth="100vw"
      sx={{ padding: "1rem" }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="start"
        spacing={2}
      >
        <InitiativesForm
          data={search}
          handleSubmit={onSubmitHandler}
          onChange={onChangeHandler}
        />
        <Box height={"auto"} sx={{ flexGrow: 1 }} className={classes.grid}>
          {localInfo &&
            localInfo.map((data, idx) => {
              return <Initiative info={data} key={idx} />;
            })}
          {!localInfo && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="start"
              minHeight="100vh"
              minWidth="100vw"
              sx={{ padding: "1rem" }}
            >
              <CircularProgress size={40} color="inherit" />
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default InitiativeHelper;
