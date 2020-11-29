import React, { useState } from "react";
import StartDate from "../components/StartDate";
import EndDate from "../components/EndDate";
import StartTime from "../components/StartTime";
import EndTime from "../components/EndTime";
import axios from "axios";
import {
	Col,
	Button,
	Form,
	Label,
	Input,
	FormFeedback,
	Container,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "../styles/NewMeeting.css";
import "../styles/General.css";

const NewMeetings = () => {
	// const [nameRequire, setNameRequire] = useState(false);
	const [titleRequire, setTitleRequire] = useState(false);
	const [timeRequire, setTimeRequire] = useState(false);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const token = localStorage.getItem("account");

	const [newMeeting, setNewMeeting] = useState({
		// user_name: "",
		title: "",
		time_meeting: "",
		start_date: "",
		end_date: "",
		start_time: "",
		end_time: "",
	});

	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

	const createMeeting = () => {
		const {
			title,
			time_meeting,
			start_date,
			end_date,
			start_time,
			end_time,
		} = newMeeting;

		if (title !== "" && time_meeting !== "") {
			const data = {
				title: title,
				time_meeting: time_meeting,
				start_date: start_date,
				end_date: end_date,
				start_time: start_time,
				end_time: end_time,
			};

			// console.log(data);

			axios
				// .post("http://localhost:3001/meetings", data)
				.post(`${BASE_URL}/meetings`, data, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					// console.log(response);
					if (response.status === 201) {
						history.push("/");
					}
				});
		} else {
			if (title === "") {
				setTitleRequire(true);
			}
			if (time_meeting === "") {
				setTimeRequire(true);
			}
		}
	};

	let history = useHistory();

	return (
		<Container className="new-meeting-container">
			<div className="fill-info">
				<Form>
					<Container>
						<div className="new-meeting">
							<div className="name-user">
								<h1>James Mai</h1>
							</div>

							<div>
								<Col md="6">
									<Label for="titleMeeting">Title</Label>

									<Input
										type="string"
										name="title"
										id="titleMeeting"
										placeholder="Type your title"
										onChange={(event) => {
											setNewMeeting({
												...newMeeting,
												title: event.target.value,
											});
										}}
										invalid={titleRequire}
									/>
									{titleRequire && (
										<FormFeedback>Title is require</FormFeedback>
									)}
								</Col>
							</div>

							<div>
								<Col style={{ paddingTop: "15px" }} md="6">
									<Label>Meeting Times</Label>

									<Input
										type="text"
										placeholder="30"
										onChange={(event) => {
											setNewMeeting({
												...newMeeting,
												time_meeting: event.target.value,
											});
										}}
										invalid={timeRequire}
									></Input>
									{timeRequire && <FormFeedback>Time is require</FormFeedback>}
								</Col>
							</div>

							<Col style={{ paddingTop: "15px" }} md="6">
								<Label style={{ paddingBottom: "15px" }}>
									When people can book this event?
								</Label>
								<br />
								<Col>
									<Label
										style={{ paddingRight: "20px", paddingBottom: "10px" }}
									>
										From
									</Label>

									<StartDate
										startDate={startDate}
										setStartDate={setStartDate}
										setNewMeeting={setNewMeeting}
										newMeeting={newMeeting}
										endDate={endDate}
									/>
								</Col>

								<Col>
									<Label style={{ paddingRight: "39px" }}>To</Label>

									<EndDate
										endDate={endDate}
										setEndDate={setEndDate}
										setNewMeeting={setNewMeeting}
										newMeeting={newMeeting}
										startDate={startDate}
									/>
								</Col>
							</Col>

							<Col style={{ paddingTop: "15px" }} md="6">
								<Label style={{ paddingBottom: "15px" }}>Time Available</Label>
								<br />
								<Col style={{ paddingBottom: "10px" }}>
									<Label style={{ paddingRight: "5px" }}>From</Label>

									<StartTime
										Col={Col}
										Label={Label}
										startTime={startTime}
										setStartTime={setStartTime}
										setNewMeeting={setNewMeeting}
										newMeeting={newMeeting}
									/>
								</Col>
								<Col>
									<Label style={{ paddingRight: "24px" }}>To</Label>

									<EndTime
										Col={Col}
										Label={Label}
										endTime={endTime}
										setEndTime={setEndTime}
										setNewMeeting={setNewMeeting}
										newMeeting={newMeeting}
									/>
								</Col>
							</Col>

							<Button
								className="button-create"
								type="button"
								// color="primary"
								onClick={() => {
									createMeeting();
								}}
							>
								Create
							</Button>
						</div>
					</Container>
				</Form>
			</div>
		</Container>
	);
};

export default NewMeetings;
