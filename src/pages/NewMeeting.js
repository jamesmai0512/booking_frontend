import React, { useState } from "react";
import StartDate from "../components/StartDate";
import EndDate from "../components/EndDate";
import StartTime from "../components/StartTime";
import EndTime from "../components/EndTime";
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
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [newMeeting, setNewMeeting] = useState({
    user_name: "",
    title: "",
    time_meeting: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });

  // const onChange = (time) => {
  //   setTime(time);
  // };

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
            placeholder="30"
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

      <FormGroup row>
        <Label sm="2">Days Available</Label>
        <Label sm="0.5">From</Label>

        <Col>
          <StartDate
            startDate={startDate}
            setStartDate={setStartDate}
            setNewMeeting={setNewMeeting}
            newMeeting={newMeeting}
            endDate={endDate}
          />
        </Col>
        <Label sm="0.5">To</Label>

        <Col>
          <EndDate
            endDate={endDate}
            setEndDate={setEndDate}
            setNewMeeting={setNewMeeting}
            newMeeting={newMeeting}
            startDate={startDate}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm="2">Time Available</Label>
        <StartTime
          Col={Col}
          Label={Label}
          startTime={startTime}
          setStartTime={setStartTime}
          setNewMeeting={setNewMeeting}
          newMeeting={newMeeting}
        />

        <EndTime
          Col={Col}
          Label={Label}
          endTime={endTime}
          setEndTime={setEndTime}
          setNewMeeting={setNewMeeting}
          newMeeting={newMeeting}
        />
      </FormGroup>

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
            start_time,
            end_time,
          } = newMeeting;

          if (user_name !== "" && title !== "") {
            const data = {
              user_name: user_name,
              title: title,
              time_meeting: time_meeting,
              start_date: start_date,
              end_date: end_date,
              start_time: start_time,
              end_time: end_time,
            };

            console.log(data);

            axiox
              .post("http://localhost:3001/meetings", data)
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
        Create
      </Button>
    </Form>
  );
};

export default NewMeetings;
