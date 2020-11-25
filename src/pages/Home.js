import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container, Button } from "reactstrap";
import Meeting from "../components/Meeting";
import "../styles/Home.css";
import "../styles/General.css";

const Home = () => {
	const [meetings, setMeetings] = useState([]);
	const isAuthenticated = localStorage.getItem("account");
	const listMeetings = meetings.map((item) => (
		<Meeting key={item.id} item={item} />
	));
	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
	const refreshPage = () => {
		window.location.reload(false);
	};

	useEffect(() => {
		// axios.get("http://localhost:3001/meetings").then((response) => {
		axios.get(`${BASE_URL}/meetings`).then((response) => {
			const { data } = response;
			setMeetings(data);
		});
	}, []);

	return isAuthenticated ? (
		<>
			<Container className="home-container">
				<Button
					className="logout"
					onClick={() => {
						localStorage.removeItem("account");
						refreshPage();
					}}
				>
					Logout
				</Button>

				<div className="content">
					<div className="table">
						<div className="info">
							<div className="name">
								<h5>James Mai</h5>
							</div>
							<br />
							<div className="text">
								<p>
									Welcome to my scheduling page. Please follow the instructions
									to add an event to my calendar.
								</p>
							</div>
						</div>

						<Row>
							<Col style={{ textAlign: "center" }}>{listMeetings}</Col>
						</Row>
					</div>
				</div>
			</Container>
		</>
	) : (
		<Container className="home-container">
			<div className="content">
				<div className="table">
					<div className="info">
						<div className="name">
							<h5>James Mai</h5>
						</div>
						<br />
						<div className="text">
							<p>
								Welcome to my scheduling page. Please follow the instructions to
								add an event to my calendar.
							</p>
						</div>
					</div>

					<Row>
						<Col style={{ textAlign: "center" }}>{listMeetings}</Col>
					</Row>
				</div>
			</div>
		</Container>
	);

	// return (

	// );
};

export default Home;
