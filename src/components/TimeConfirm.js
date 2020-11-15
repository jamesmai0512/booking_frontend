import React from "react";
import DatePicker from "react-datepicker";
import "../styles/MeetingConfirm.css";

const TimeConfirm = (props) => {
  const {
    time,
    setTime,
    setMeetingConfirm,
    meetingConfirm,
    meetingDetail,
    setHours,
    setMinutes,
    timeInput,
  } = props;

  return (
    <DatePicker
      className="time-confirm"
      selected={time}
      onChange={(time) => {
        setTime(time);
        setMeetingConfirm({
          ...meetingConfirm,
          time: time,
        });
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={meetingDetail.time_meeting}
      minTime={setHours(
        setMinutes(new Date(), timeInput.startMinutes),
        timeInput.startHours
      )}
      maxTime={setHours(
        setMinutes(new Date(), timeInput.endMinutes),
        timeInput.endHours
      )}
      dateFormat="h:mm aa"
    />
  );
};

export default TimeConfirm;
