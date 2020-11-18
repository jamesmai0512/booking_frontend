import React from "react";
import DatePicker from "react-datepicker";
import { FormFeedback } from "reactstrap";
import "../styles/MeetingConfirm.css";

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
    dateRequire,
  } = props;

  return (
    <div>
      <DatePicker
        className="date-confirm"
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
        invalid={dateRequire}
      />
      {dateRequire && <FormFeedback>Chose one day</FormFeedback>}
    </div>
  );
};

export default DateConfirm;
