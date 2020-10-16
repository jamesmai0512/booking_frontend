import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EndDate = (props) => {
  const {
    FormGroup,
    endDate,
    setEndDate,
    setNewMeeting,
    newMeeting,
    startDate,
  } = props;

  return (
    <div>
      <FormGroup>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            setNewMeeting({
              ...newMeeting,
              end_date: date,
            });
          }}
          selectesEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </FormGroup>
    </div>
  );
};

export default EndDate;
