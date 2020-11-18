import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
	Row,
	Col,
	Container,
	Button,
	Form,
	FormGroup,
	Input,
	FormFeedback,
} from "reactstrap";
import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DateConfirm from "../components/DateConfirm";
import TimeConfirm from "../components/TimeConfirm";
import "../styles/General.css";
import "../styles/MeetingConfirm.css";
import { MdWatchLater } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const MeetingConfirm = () => {
	const { meetingId } = useParams();
	const [meetingDetail, setMeetingDetail] = useState([]);
	const [nameRequire, setNameRequire] = useState(false);
	const [emailRequire, setEmailRequire] = useState(false);
	const [messageRequire, setMessagRequire] = useState(false);
	const [dateRequire, setDateRequire] = useState(false);
	const [timeRequire, setTimeRequire] = useState(false);
	const [timeInput, setTimeInput] = useState({});

	const [dateMeeting, setDateMeeting] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [meetingConfirm, setMeetingConfirm] = useState({
		date: "",
		time: "",
		name: "",
		email: "",
		message: "",
	});

	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

	// useEffect(() => {
	// 	axios.get("kiijiiijiiijiiijjji");
	// }, []);

	useEffect(() => {
		axios
			// .get(`${BASE_URL}/meetings/${meetingId}`)
			.get(`http://localhost:3001/meetings/${meetingId}`)
			.then((response) => {
				console.log(response);

				const { data } = response;
				const startYear = moment(data.start_date).format("YYYY");
				const endYear = moment(data.end_date).format("YYYY");

				const startMonth = moment(data.start_date).format("MM");
				const endMonth = moment(data.end_date).format("MM");

				const startDate = moment(data.start_date).format("DD");
				const endDate = moment(data.end_date).format("DD");

				const startHours = moment(data.start_time).format("HH");
				const endHours = moment(data.end_time).format("HH");
				const startMinutes = moment(data.start_time).format("mm");
				const endMinutes = moment(data.end_time).format("mm");

				const timeRange = {
					startYear,
					endYear,
					startMonth,
					endMonth,
					startDate,
					endDate,
					startHours,
					endHours,
					startMinutes,
					endMinutes,
				};
				setTimeInput(timeRange);

				setDateMeeting(
					setYear(
						setMonth(
							setDate(new Date(), timeRange.startDate),
							timeRange.startMonth - 1
						),
						timeRange.startYear
					)
				);

				setTime(
					setHours(
						setMinutes(new Date(), timeRange.startMinutes),
						timeRange.startHours
					)
				);

				console.log(timeRange);
				setMeetingDetail(data);
			});
	}, []);

	let history = useHistory();
	const handleConfirmBooking = () => {
		const { dateMeeting, time, name, email, message } = meetingConfirm;

		console.log(meetingConfirm);

		if (
			dateMeeting !== "" &&
			time !== "" &&
			name !== "" &&
			email !== "" &&
			message !== ""
		) {
			const dataConfirm = {
				booking: {
					date: dateMeeting,
					time: time,
					name: name,
					email: email,
					message: message,
				},
			};
			// .post(`http://localhost:3001/bookings`, dataConfirm)
			axios.post(`${BASE_URL}/bookings`, dataConfirm).then((response) => {
				if (response.status === 201) {
					history.push("/");
					// history.push(`/meeting/${meetingId}/confirmmeeting/success`);
				}
			});
		} else {
			if (dateMeeting === "") {
				setDateRequire(true);
			}
			if (time === "") {
				setTimeRequire(true);
			}
			if (name === "") {
				setNameRequire(true);
			}
			if (email === "") {
				setEmailRequire(true);
			}
			if (message === "") {
				setMessagRequire(true);
			}
		}
	};

	return (
		<>
			<Container className="booking-container">
				<div className="meeting-confirm">
					<Row>
						<Col className="booking-detail" md="6">
							<div className="show-detail">
								<a className="back-button" href="/">
									<BiArrowBack />
								</a>
								<h5 className="user-name">James Mai</h5>

								<h2 className="title">{meetingDetail.title}</h2>
								<h5 className="time-meeting">
									<MdWatchLater /> {meetingDetail.time_meeting} min
								</h5>
							</div>
						</Col>

						<Col className="booking-time" md="6">
							<Form>
								<FormGroup className="select-time">
									<h5 className="lable">Select Date</h5>
									<DateConfirm
										dateMeeting={dateMeeting}
										setDateMeeting={setDateMeeting}
										setMeetingConfirm={setMeetingConfirm}
										meetingConfirm={meetingConfirm}
										setYear={setYear}
										setMonth={setMonth}
										setDate={setDate}
										timeInput={timeInput}
										dateRequire={dateRequire}
									/>
									<br />
									<br />

									<h5 className="lable">Select Time</h5>
									<TimeConfirm
										time={time}
										setTime={setTime}
										setMeetingConfirm={setMeetingConfirm}
										meetingConfirm={meetingConfirm}
										meetingDetail={meetingDetail}
										setHours={setHours}
										setMinutes={setMinutes}
										timeInput
									/>
								</FormGroup>
								<FormGroup>
									<Col>
										<Input
											className="name-input"
											type="text"
											name="name"
											placeholder="Your Name"
											onChange={(event) => {
												setMeetingConfirm({
													...meetingConfirm,
													name: event.target.value,
												});
											}}
											invalid={nameRequire}
										/>
										{nameRequire && (
											<FormFeedback>You need to type you name</FormFeedback>
										)}
									</Col>
								</FormGroup>
								<FormGroup>
									<Col>
										<Input
											type="email"
											name="email"
											placeholder="Your Email"
											onChange={(event) => {
												setMeetingConfirm({
													...meetingConfirm,
													email: event.target.value,
												});
											}}
											invalid={emailRequire}
										/>
										{emailRequire && (
											<FormFeedback>Email is require</FormFeedback>
										)}
									</Col>
								</FormGroup>
								<FormGroup>
									<Col>
										<Input
											type="textarea"
											name="message"
											placeholder="Message"
											onChange={(event) => {
												setMeetingConfirm({
													...meetingConfirm,
													message: event.target.value,
												});
											}}
											invalid={messageRequire}
										/>
										{messageRequire && (
											<FormFeedback>Message is require</FormFeedback>
										)}
									</Col>
								</FormGroup>
								<div className="button-confirm">
									<Button
										type="button"
										color="primary"
										onClick={() => {
											handleConfirmBooking();
										}}
									>
										Confirm
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default MeetingConfirm;
