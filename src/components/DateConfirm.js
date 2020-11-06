import React from "react";
import DatePicker from "react-datepicker";

const DateConfirm = (props) => {
  const {
    dateMeeting,
    setDateMeeting,
    setMeetingConfirm,
    meetingConfirm,
    setYear,
    setMonth,
    setDate,
    timeInput,
  } = props;

  return (
    <DatePicker
      selected={dateMeeting}
      onChange={(dateMeeting) => {
        setDateMeeting(dateMeeting);
        setMeetingConfirm({
          ...meetingConfirm,
          dateMeeting: dateMeeting,
        });
      }}
      minDate={setYear(
        setMonth(
          setDate(new Date(), timeInput.startDate),
          timeInput.startMonth - 1
        ),
        timeInput.startYear
      )}
      maxDate={setYear(
        setMonth(
          setDate(new Date(), timeInput.endDate),
          timeInput.endMonth - 1
        ),
        timeInput.endYear
      )}
      dateFormat="MMMM d, yyyy"
    />
  );
};

export default DateConfirm;
