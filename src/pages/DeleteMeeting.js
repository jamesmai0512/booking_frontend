import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import MeetingPost from "../components/MeetingPost.js";
import "../styles/Home.css";
import "../styles/General.css";

const DeleteMeeting = () => {
	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
	const [meetings, setMeetings] = useState([]);

	const deleteMeeting = meetings.map((item) => <MeetingPost key={item.id} />);

	useEffect(() => {
		// axios.get("http://localhost:3001/meetings").then((response) => {
		axios.get(`${BASE_URL}/meetings`).then((response) => {
			const { data } = response;
			setMeetings(data);
		});
	}, []);

	return (
		<>
			<Container className="home-container">
				<div className="content">
					<div className="table">
						<div className="info">
							<div className="title">
								<h5>Delete Post</h5>
							</div>
							<br />
						</div>

						<Row>
							<Col style={{ textAlign: "center" }}>{deleteMeeting}</Col>
						</Row>
					</div>
				</div>
			</Container>
		</>
	);
};

export default DeleteMeeting;
