import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Community from "../../Components/Communities/Community";

const ycLabel = {
  name: "Your Communities",
};

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
          <Typography component="span">{children}</Typography>
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

export default function VerticalTabs({ data = [] }) {
  console.log("data: ", data);
  const [value, setValue] = useState(1);

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
      {data.length > 1 && (
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Communities"
          sx={{ borderRight: 2, borderColor: "divider", overflow: "visible" }}
        >
          {/* [ycLabel, ...data] */}
          {[ycLabel, ...data].map((item, idx) => {
            return item.name === "Your Communities" ? (
              <Box
                key={idx}
                display="flex"
                justifyContent="start"
                alignItems="start"
              >
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ pr: 2.5, pl: 2.5 }}
                  align="center"
                >
                  Your Communities
                </Typography>
              </Box>
            ) : (
              <Tab
                key={idx}
                label={`${item.name} Community`}
                {...a11yProps(idx)}
              />
            );
          })}
        </Tabs>
      )}
      {data.length > 0 &&
        [ycLabel, ...data].map((community, idx) => {
          return (
            <TabPanel
              sx={{ minWidth: "1000px" }}
              key={idx + "_tab"}
              value={value}
              index={idx}
            >
              <Community data={community} idx={idx} />
            </TabPanel>
          );
        })}
    </Box>
  );
}
