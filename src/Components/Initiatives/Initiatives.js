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
import InitiativeHelper from "./InitiativeHelper";

const Initiatives = () => {
  const [info, setInfo] = useState(null);
  const [search, setSearch] = useState({
    location: "x",
    tag: "x",
    topic: "x",
  });

  return (
    <InitiativeHelper setInfo={setInfo} info={info} search={search} setSearch={setSearch}/>
  );
};

export default Initiatives;
