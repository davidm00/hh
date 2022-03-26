import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { text } from "../../Constants/lorem";

const test = ["Notre Dame Campus", "South Bend", "Elkhart"];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="start"
      minHeight="100vh"
      sx={{ flexGrow: 1, bgcolor: "inherit" }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Communities"
        sx={{ borderRight: 2, borderColor: "divider", overflow: "visible" }}
      >
        {test.map((name, idx) => {
          return (
            <Tab key={idx} label={`${name} Community`} {...a11yProps(idx)} />
          );
        })}
      </Tabs>
      {test.map((name, idx) => {
        return (
          <TabPanel key={idx + "_tab"} value={value} index={idx}>
            <Stack>{name}</Stack>
            <Box>
              <Typography variant="body1" component="span">
                {text.substr(0, text.length / (idx * 1.5) )}
              </Typography>
            </Box>
          </TabPanel>
        );
      })}
    </Box>
  );
}
