import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import {
	FormFeedback,
	Col,
	Container,
	InputGroup,
	Button,
	Input,
} from "reactstrap";

const Login = () => {
	// const [usernameRequire, setUsernameRequire] = useState(false);
	// const [passwordRequire, setPasswordRequire] = useState(false);
	const [login, setLogin] = useState({
		username: "",
		password: "",
	});

	let history = useHistory();
	const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

	const handleLoginButton = () => {
		// localStorage.setItem("username", `${login.username}`);
		const { username, password } = login;

		if ((username !== "", password !== "")) {
			axios
				.post(`${BASE_URL}/sessions`, { username, password })
				.then((response) => {
					const { data } = response;
					if (response.status == 201) {
						// axios.post(`${BASE_URL}/meetings`, {headers: {"Authorization" : `Bearer ${response.auth_token}`}})

						localStorage.setItem("account", `${data.auth_token}`);
						history.push("/meeting/create");
					}
				});
		}
	};

	return (
		<>
			<Container className="login-container">
				<div className="login-form">
					<div className="login-text">
						<h1>Login Form</h1>
					</div>

					<InputGroup>
						<Col>
							<Input
								onChange={(event) => {
									setLogin({
										...login,
										username: event.target.value,
									});
								}}
								className="username"
								placeholder="Username"
								invalid={usernameRequire}
							/>
							{usernameRequire && (
								<FormFeedback>Username is require.</FormFeedback>
							)}
						</Col>
					</InputGroup>

					<InputGroup>
						<Col>
							<Input
								type="password"
								onChange={(event) => {
									setLogin({
										...login,
										password: event.target.value,
									});
								}}
								className="password"
								placeholder="Password"
								invalid={passwordRequire}
							/>
							{passwordRequire && (
								<FormFeedback>Password is require.</FormFeedback>
							)}
						</Col>
					</InputGroup>

					<Button
						onClick={() => {
							handleLoginButton();
						}}
						type="button"
						className="login-button"
					>
						<h5>Login</h5>
					</Button>
				</div>
			</Container>
		</>
	);
};

export default Login;
