import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import MeetingPost from "../components/MeetingPost.js";
import "../styles/DeleteMeeting.css";
import "../styles/General.css";

const DeleteMeeting = () => {
	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
	const [meetings, setMeetings] = useState([]);

	const deleteMeeting = meetings.map((item) => (
		<MeetingPost key={item.id} item={item} />
	));

	useEffect(() => {
		// axios.get("http://localhost:3001/meetings").then((response) => {
		axios.get(`${BASE_URL}/meetings`).then((response) => {
			const { data } = response;
			setMeetings(data);
		});
	}, []);

	return (
		<>
			<Container className="delete-container">
				<div className="delete-content">
					<div className="delete-table">
						<div className="delete-info">
							<div className="delete-title">
								<h3>Delete Post</h3>
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
