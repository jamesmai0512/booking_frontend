import React from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { CardBody, CardTitle, Button, Col } from "reactstrap";
import "../styles/MeetingPost.css";

const MeetingPost = (props) => {
	const { item } = props;
	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
	const token = localStorage.getItem("account");

	let history = useHistory();
	const handleDeleteButton = () => {
		axios
			.delete(`${BASE_URL}/meetings/${item.id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				if (response.status === 201) {
					history.push("/");
				}
			});
	};

	return (
		<>
			<Col md="6">
				<CardBody>
					<div className="delete-circle"></div>
					<CardTitle>{item.title}</CardTitle>
					<Button
						className="delete-button"
						onClick={() => {
							handleDeleteButton();
						}}
					>
						Delete
					</Button>
				</CardBody>
			</Col>
		</>
	);
};

export default MeetingPost;
