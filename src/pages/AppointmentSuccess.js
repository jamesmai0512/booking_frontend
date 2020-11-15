import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Container, Button } from "reactstrap";
import "../styles/General.css";
import "../styles/MeetingConfirm.css";
import { MdWatchLater } from "react-icons/md";
import { AiTwotoneCalendar } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiTwotoneMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import moment from "moment";

const AppointmentSuccess = () => {
	const { meetingId } = useParams();
	const [bookingInfo, setBookingInfo] = useState([]);
	const [meetingInfo, setMeetingInfo] = useState([]);
	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

	useEffect(() => {
		axios.get(`${BASE_URL}/bookings/${meetingId}`).then((response) => {
			const { data } = response;
			setBookingInfo(data);
		});
	}, []);

	useEffect(() => {
		axios.get(`${BASE_URL}/meetings/${meetingId}`).then((response) => {
			const { data } = response;
			setMeetingInfo(data);
		});
	}, []);

	const time = () => bookingInfo.time;
	// const timeEnd = () => bookingInfo.time + 30;
	const date = () => bookingInfo.date;
	var startTime = moment(time()).format("HH:mm");
	var dateTime = moment(date()).format("MMMM DD, YYYY");
	// var endTime = moment(timeEnd()).format("HH:mm");
	let history = useHistory();
	return (
		<>
			<Container className="booking-container">
				<div className="meeting-confirm">
					<div className="confirm-text">
						<h1>
							<AiOutlineCheckCircle />
							Your appointment has been confirmed.
						</h1>
					</div>
					<div className="show-detail-appointment">
						<h5 className="user-name-appointment">James Mai</h5>
						<h2 className="title"> {meetingInfo.title}</h2>
						<h6 className="time-meeting">
							<MdWatchLater /> {meetingInfo.time_meeting} min
						</h6>
						<h6 className="time-meeting-confirm">
							<AiTwotoneCalendar /> {startTime}, {dateTime}
						</h6>
						<h6 className="user-info-name">
							<AiTwotoneMessage /> {bookingInfo.name}
						</h6>
						<h6 className="user-message">
							<FaUser /> {bookingInfo.message}
						</h6>
					</div>
					<div className="home-button">
						<Button
							type="button"
							className="button-back-home"
							onClick={() => {
								history.push("/");
							}}
						>
							Back Home
						</Button>
					</div>
				</div>
			</Container>
		</>
	);
};

export default AppointmentSuccess;
