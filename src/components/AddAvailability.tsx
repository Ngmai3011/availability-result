import React, {useState} from "react";
import {
  Grid,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import {daysInWeek, calendar, Calendar, Data} from "../types";

const AddAvailability: React.FC<Data> = ({onDataAdded}) => {
  const [busyDays, setBusyDays] = useState<boolean[][]>(
    Array(7)
      .fill([])
      .map(() => Array(7).fill(false))
  );
  const [busyWeeks, setBusyWeeks] = useState<boolean[]>(Array(7).fill(false));
  const [data, setData] = useState<Calendar>(calendar);
  const [message, setMessage] = useState<string | null>(null);

  const saveData = (week: string, row: number) => {
    const freeDays = busyDays[row]
      .map((isBusy, i) => {
        if (!isBusy) {
          return i;
        }
        return null;
      })
      .filter((item) => item !== null)
      .map((dayIndex) => daysInWeek[dayIndex!]);

    setData((prevState) => ({
      ...prevState,
      [week]: freeDays,
    }));
  };

  const handleBusyDayCheck = (week: string, row: number, col: number) => {
    const updatedBusyDays = [...busyDays];
    updatedBusyDays[row][col] = !busyDays[row][col];
    setBusyDays(updatedBusyDays);

    saveData(week, row);
  };

  const isBusyDayChecked = (rowIndex: number, colIndex: number) =>
    busyDays[rowIndex][colIndex];

  const handleBusyWeekCheck = (week: string, row: number) => {
    const updatedBusyWeeks = [...busyWeeks];
    updatedBusyWeeks[row] = !busyWeeks[row];

    const updatedBusyDays = [...busyDays];
    updatedBusyDays[row] = updatedBusyDays[row].map(
      () => updatedBusyWeeks[row]
    );

    setBusyWeeks(updatedBusyWeeks);
    setBusyDays(updatedBusyDays);

    saveData(week, row);
  };

  const isBusyWeekChecked = (rowIndex: number) => busyWeeks[rowIndex];

  const handleSave = () => {
    setMessage("AVAILABILITY UPDATED SUCCESSFULLY!!!");
    setTimeout(() => {
      setMessage(null);
    }, 3000);
    onDataAdded(data);
  };

  return (
    <div>
      <h2 style={{color: "rgb(242, 113, 28)", marginLeft: "36px"}}>
        MY AVAILABILITY FOR THE NEXT 7 WEEKS
      </h2>
      <Grid container spacing={2} style={{margin: "18px auto 36px"}}>
        {Object.entries(calendar).map((value, rowIndex) => (
          <Grid container item key={rowIndex}>
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  style={{marginRight: "72px"}}
                  checkedIcon={<EventBusyIcon />}
                  checked={isBusyWeekChecked(rowIndex)}
                  onChange={() => handleBusyWeekCheck(value[0], rowIndex)}
                />
              }
              label={
                <Typography
                  variant="h6"
                  component="div"
                  style={{color: "rgb(242, 113, 28)", fontWeight: "bold"}}>
                  {value[0]}
                </Typography>
              }
              labelPlacement="start"
            />

            {value[1].map((day, colIndex) => (
              <Grid item xs={1} key={colIndex}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<HighlightOffIcon />}
                      checked={isBusyDayChecked(rowIndex, colIndex)}
                      onChange={() =>
                        handleBusyDayCheck(value[0], rowIndex, colIndex)
                      }
                    />
                  }
                  label={
                    <Typography
                      variant="h6"
                      component="div"
                      style={{
                        color: isBusyDayChecked(rowIndex, colIndex)
                          ? "lightgrey"
                          : "rgb(30, 85, 107)",
                      }}>
                      {day}
                    </Typography>
                  }
                  labelPlacement="start"
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="warning"
        size="large"
        style={{margin: "0 0 36px 36px"}}
        onClick={handleSave}>
        Save
      </Button>

      <Snackbar
        open={message !== null}
        anchorOrigin={{horizontal: "left", vertical: "bottom"}}
        message={message}
        ContentProps={{
          sx: {
            background: "rgb(242, 113, 28)",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default AddAvailability;
