import React from "react";
import { Button, Card, CardBody, CardTitle, Col } from "reactstrap";
import { useParams } from "react-router-dom";

const ListMeeting = (props) => {
  const { item } = props;

  return (
    <Col xs="6" style={{ padding: "20px" }}>
      <Button
        style={{ backgroundColor: "white" }}
        href={`/meeting/${item.id}/confirmmeeting`}
      >
        <Card>
          <CardBody>
            <CardTitle style={{ color: "black" }}>{item.title}</CardTitle>;
          </CardBody>
        </Card>
      </Button>
    </Col>
  );
};

export default ListMeeting;
