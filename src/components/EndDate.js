import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/NewMeeting.css";

const EndDate = (props) => {
  const { endDate, setEndDate, setNewMeeting, newMeeting, startDate } = props;

  return (
    <div>
      <DatePicker
        className="end-date"
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
    </div>
  );
};

export default EndDate;
