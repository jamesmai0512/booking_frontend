import React from "react";
import { CardBody, CardTitle } from "reactstrap";
import "../styles/ListMeeting.css";

const ListMeeting = (props) => {
	const { item } = props;

	return (
		<a className="button" href={`/meeting/${item.id}/confirmmeeting`}>
			<CardBody>
				<div className="circle"></div>
				<CardTitle>{item.title}</CardTitle>
				<div className="triangle"></div>
			</CardBody>
		</a>
	);
};

export default ListMeeting;
