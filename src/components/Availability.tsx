import React, {useState} from "react";
import {Paper, Box, Tabs, Tab, Menu, List, MenuItem} from "@mui/material";
import AddAvailability from "./AddAvailability";
import {Calendar, calendar} from "../types";
import AvailabilityTable from "./AvailabilityTable";

const Availability: React.FC = () => {
  const [data, setData] = useState<Calendar>(calendar);
  const [tabValue, setTabValue] = useState<string>("thisWeek");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [week, setWeek] = useState<string>("Select Week");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleDataAdded = (addedData: Calendar) => {
    setData(addedData);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleWeekSelect = (week: string) => {
    setWeek(week);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          width: 900,
        },
      }}>
      <Paper elevation={3}>
        <AddAvailability onDataAdded={handleDataAdded} />
      </Paper>
      <Paper elevation={3}>
        <h2 style={{color: "rgb(242, 113, 28)", marginLeft: "36px"}}>
          MAI'S BEST FRIENDS
        </h2>
        <Box sx={{width: "100%"}}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth">
            <Tab value="thisWeek" label="This Week" />
            <Tab value="nextWeek" label="Next Week" />
            <Tab value="selectWeek" label={week} onClick={handleMenuOpen} />
          </Tabs>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            style={{height: "300px", marginTop: "16px"}}>
            <List>
              {Object.keys(data).map((week) => (
                <MenuItem key={week} onClick={() => handleWeekSelect(week)}>
                  {week}
                </MenuItem>
              ))}
            </List>
          </Menu>
          <div>
            {tabValue === "thisWeek" && (
              <AvailabilityTable week="Week1" data={data} />
            )}
            {tabValue === "nextWeek" && (
              <AvailabilityTable week="Week2" data={data} />
            )}
            {tabValue === "selectWeek" && (
              <AvailabilityTable week={week} data={data} />
            )}
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default Availability;
