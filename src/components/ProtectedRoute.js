import React from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
	render() {
		const Component = this.props.component;
		const isAuthenticated = localStorage.getItem("account");

		if (isAuthenticated) {
			return <Component />;
		} else {
			return <Redirect to={{ pathname: "/login" }} />;
		}
	}
}

export default ProtectedRoute;
