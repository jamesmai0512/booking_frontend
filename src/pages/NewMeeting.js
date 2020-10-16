import React, { useState } from "react";
import StartDate from "../components/StartDate";
import EndDate from "../components/EndDate";
import axiox from "axios";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const NewMeetings = () => {
  const [nameRequire, setNameRequire] = useState(false);
  const [titleRequire, setTitleRequire] = useState(false);
  const [timeRequire, setTimeRequire] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [newMeeting, setNewMeeting] = useState({
    user_name: "",
    title: "",
    time_meeting: "",
    start_date: "",
    end_date: "",
  });

  // const [date, setDate] = useState(new Date());

  let history = useHistory();

  return (
    <Form>
      <FormGroup row>
        <Label for="userName" sm={2}>
          User Name
        </Label>
        <Col>
          <Input
            type="string"
            name="name"
            id="userName"
            placeholder="Type your Name"
            onChange={(event) => {
              setNewMeeting({
                ...newMeeting,
                user_name: event.target.value,
              });
            }}
            invalid={nameRequire}
          />
          {nameRequire && <FormFeedback>Name is require</FormFeedback>}
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="titleMeeting" sm={2}>
          Title
        </Label>
        <Col>
          <Input
            type="string"
            name="title"
            id="titleMeeting"
            placeholder="Type your title"
            onChange={(event) => {
              setNewMeeting({
                ...newMeeting,
                title: event.target.value,
              });
            }}
            invalid={titleRequire}
          />
          {titleRequire && <FormFeedback>Title is require</FormFeedback>}
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm="2">Meeting Times</Label>
        <Col>
          <Input
            type="text"
            placeholder="00:00:00"
            onChange={(event) => {
              setNewMeeting({
                ...newMeeting,
                time_meeting: event.target.value,
              });
            }}
            invalid={timeRequire}
          ></Input>
          {timeRequire && <FormFeedback>Time is require</FormFeedback>}
        </Col>
      </FormGroup>

      <StartDate
        FormGroup={FormGroup}
        startDate={startDate}
        setStartDate={setStartDate}
        setNewMeeting={setNewMeeting}
        newMeeting={newMeeting}
        endDate={endDate}
      />

      <EndDate
        FormGroup={FormGroup}
        endDate={endDate}
        setEndDate={setEndDate}
        setNewMeeting={setNewMeeting}
        newMeeting={newMeeting}
        startDate={startDate}
      />

      <Button
        type="button"
        color="success"
        onClick={() => {
          const {
            user_name,
            title,
            time_meeting,
            start_date,
            end_date,
          } = newMeeting;

          if (user_name !== "" && title !== "") {
            axiox
              .post("http://localhost:3001/meetings", {
                user_name: user_name,
                title: title,
                time_meeting: time_meeting,
                start_date: start_date,
                end_date: end_date,
              })
              .then((response) => {
                console.log(response);
                if (response.status === 201) {
                  history.push("/");
                }
              });
          } else {
            if (user_name === "") {
              setNameRequire(true);
            }
            if (title === "") {
              setTitleRequire(true);
            }
            if (time_meeting === "") {
              setTimeRequire(true);
            }
          }
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default NewMeetings;
