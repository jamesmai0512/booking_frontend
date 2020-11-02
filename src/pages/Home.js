import React, { useEffect, useState } from "react";
import "../components/Home.css";
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
    <div className="home">
      <Jumbotron className="jumbotron">
        <Container>
          <p>James Mai</p>
          <Row style={{ textAlign: "center" }}>{listMeetings}</Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
