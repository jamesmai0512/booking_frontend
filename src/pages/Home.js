import React, { useEffect, useState } from "react";
import axios from "axios";
import { Jumbotron, Row, Container } from "reactstrap";
import ListMeeting from "../components/ListMeeting";

const Home = () => {
  const [meetings, setMeetings] = useState([]);
  const listMeetings = meetings.map((item) => (
    <ListMeeting key={item.id} item={item} />
  ));

  useEffect(() => {
    axios.get("http://localhost:3001/meetings").then((response) => {
      const { data } = response;
      setMeetings(data);
    });
  }, []);

  return (
    <Jumbotron fluid>
      <Container fluid>
        <h2 style={{ textAlign: "center", color: "black" }}>James Mai</h2>
        <Row style={{ textAlign: "center" }}>{listMeetings}</Row>
      </Container>
    </Jumbotron>
  );
};

export default Home;
