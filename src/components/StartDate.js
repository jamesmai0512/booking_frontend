import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/NewMeeting.css";

const StartDate = (props) => {
  const { startDate, setStartDate, setNewMeeting, newMeeting, endDate } = props;

  return (
    <div>
      <DatePicker
        className="start-date"
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
        minDate={new Date() - 1}
      />
    </div>
  );
};

export default StartDate;
