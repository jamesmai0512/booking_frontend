import React from "react";
import Home from "./pages/Home";
import NewMeeting from "./pages/NewMeeting";
import MeetingConfirm from "./pages/MeetingConfirm";
import AppointmentSuccess from "./pages/AppointmentSuccess";
import Login from "./pages/Login";
import DeleteMeeting from "./pages/DeleteMeeting";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Switch } from "react-router-dom";

const App = () => {
	return (
		<div>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/meeting/:meetingId/confirmmeeting/success">
					<AppointmentSuccess />
				</Route>
				<Route path="/meeting/:meetingId/confirmmeeting">
					<MeetingConfirm />
				</Route>
				<ProtectedRoute path="/meeting/delete" component={DeleteMeeting} />
				<ProtectedRoute path="/meeting/create" component={NewMeeting} />
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
