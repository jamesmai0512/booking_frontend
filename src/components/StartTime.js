import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StartTime = (props) => {
  const {
    Col,
    Label,
    startTime,
    setStartTime,
    setNewMeeting,
    newMeeting,
  } = props;

  return (
    <Col>
      <Label sm="3">From</Label>
      <DatePicker
        selected={startTime}
        onChange={(startTime) => {
          setStartTime(startTime);
          setNewMeeting({
            ...newMeeting,
            start_time: startTime,
          });
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="hh:mm aa"
      />
      {console.log(startTime)}
    </Col>
  );
};

export default StartTime;
