import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EndTime = (props) => {
  const { Col, Label, endTime, setEndTime, setNewMeeting, newMeeting } = props;

  return (
    <Col>
      <Label sm="2">To</Label>

      <DatePicker
        selected={endTime}
        onChange={(endTime) => {
          setEndTime(endTime);
          setNewMeeting({
            ...newMeeting,
            end_time: endTime,
          });
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="hh:mm aa"
      />
      {console.log(newMeeting.end_time)}
    </Col>
  );
};

export default EndTime;
