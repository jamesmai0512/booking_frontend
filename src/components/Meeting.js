import React from "react";
import { CardBody, CardTitle, CardImg } from "reactstrap";
import "../styles/ListMeeting.css";

const ListMeeting = (props) => {
  const { item } = props;

  return (
    // <Col md="5" className="col">
    <a md="6" className="button" href={`/meeting/${item.id}/confirmmeeting`}>
      <CardBody>
        <div className="circle"></div>
        <CardTitle>{item.title}</CardTitle>
        <div className="triangle"></div>
      </CardBody>
    </a>
    // </Col>
  );
};

export default ListMeeting;
