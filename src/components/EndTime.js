import { setHours, setMinutes } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/NewMeeting.css";

const EndTime = (props) => {
	const { Col, Label, endTime, setEndTime, setNewMeeting, newMeeting } = props;

	return (
		<Col>
			<DatePicker
				className="end-time"
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
				timeIntervals={60}
				timeCaption="Time"
				dateFormat="hh:mm aa"
			/>
			{console.log(newMeeting.end_time)}
		</Col>
	);
};

export default EndTime;
