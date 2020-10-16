import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StartDate = (props) => {
  const {
    FormGroup,
    startDate,
    setStartDate,
    setNewMeeting,
    newMeeting,
    endDate,
  } = props;

  return (
    <div>
      <FormGroup>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setNewMeeting({
              ...newMeeting,
              start_date: date,
            });
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </FormGroup>
    </div>
  );
};

export default StartDate;
