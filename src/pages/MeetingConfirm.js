import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Col,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MeetingConfirm = () => {
  const { meetingId } = useParams();
  const [meetingDetail, setMeetingDetail] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [nameRequire, setNameRequire] = useState(false);
  const [emailRequire, setEmailRequire] = useState(false);
  const [messageRequire, setMessagRequire] = useState(false);

  const [meetingConfirm, setMeetingConfirm] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/meetings/${meetingId}`)
      .then((response) => {
        const { data } = response;
        setMeetingDetail(data);
      });
  }, []);

  let history = useHistory();

  const handleConfirmBooking = () => {
    const { date, time, name, email, message } = meetingConfirm;

    console.log(meetingConfirm);

    if (name !== "" && email !== "" && message !== "") {
      const dataConfirm = {
        date: date,
        time: time,
        name: name,
        email: email,
        message: message,
      };

      axios
        .post(`http://localhost:3001/bookings`, dataConfirm)
        .then((response) => {
          if (response.status === 201) {
            history.push("/");
          }
        });
    } else {
      if (name === "") {
        setNameRequire(true);
      }
      if (email === "") {
        setEmailRequire(true);
      }
      if (message === "") {
        setMessagRequire(true);
      }
    }
  };

  return (
    <Form>
      <FormGroup>
        <h4>{meetingDetail.title}</h4>
        <p>{meetingDetail.time_meeting} min</p>
      </FormGroup>

      <FormGroup>
        <DatePicker
          selected={date}
          onChange={(date) => {
            setDate(date);
            setMeetingConfirm({
              ...meetingConfirm,
              date: date,
            });
          }}
          dateFormat="MMMM d, yyyy"
        />
        <DatePicker
          selected={time}
          onChange={(time) => {
            setTime(time);
            setMeetingConfirm({
              ...meetingConfirm,
              time: time,
            });
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={meetingDetail.time_meeting}
          dateFormat="h:mm aa"
        />
      </FormGroup>

      <FormGroup>
        <Col>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={(event) => {
              setMeetingConfirm({
                ...meetingConfirm,
                name: event.target.value,
              });
            }}
            invalid={nameRequire}
          />
          {nameRequire && (
            <FormFeedback>You need to type you name</FormFeedback>
          )}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col>
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={(event) => {
              setMeetingConfirm({
                ...meetingConfirm,
                email: event.target.value,
              });
            }}
            invalid={emailRequire}
          />
          {emailRequire && <FormFeedback>Email is require</FormFeedback>}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col>
          <Input
            type="textarea"
            name="message"
            placeholder="Message"
            onChange={(event) => {
              setMeetingConfirm({
                ...meetingConfirm,
                message: event.target.value,
              });
            }}
            invalid={messageRequire}
          />
          {messageRequire && <FormFeedback>Message is require</FormFeedback>}
        </Col>
      </FormGroup>

      <Button
        type="button"
        color="success"
        onClick={() => {
          handleConfirmBooking();
        }}
      >
        Confirm
      </Button>
    </Form>
  );
};

export default MeetingConfirm;
