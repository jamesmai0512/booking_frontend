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
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import addDays from "date-fns/addDays";
import setYear from "date-fns/setYear";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const MeetingConfirm = () => {
  const { meetingId } = useParams();
  const [meetingDetail, setMeetingDetail] = useState([]);
  const [nameRequire, setNameRequire] = useState(false);
  const [emailRequire, setEmailRequire] = useState(false);
  const [messageRequire, setMessagRequire] = useState(false);
  const [timeInput, setTimeInput] = useState({});

  const [dateMeeting, setDateMeeting] = useState(new Date());
  const [time, setTime] = useState(new Date());
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
        console.log(response);

        const { data } = response;
        const startYear = moment(data.start_date).format("YYYY");
        const endYear = moment(data.end_date).format("YYYY");

        const startMonth = moment(data.start_date).format("MM");
        const endMonth = moment(data.end_date).format("MM");

        const startDate = moment(data.start_date).format("DD");
        const endDate = moment(data.end_date).format("DD");

        const startHours = moment(data.start_time).format("HH");
        const endHours = moment(data.end_time).format("HH");
        const startMinutes = moment(data.start_time).format("mm");
        const endMinutes = moment(data.end_time).format("mm");

        const timeRange = {
          startYear,
          endYear,
          startMonth,
          endMonth,
          startDate,
          endDate,
          startHours,
          endHours,
          startMinutes,
          endMinutes,
        };
        setTimeInput(timeRange);

        setDateMeeting(
          setYear(
            setMonth(
              setDate(new Date(), timeRange.startDate),
              timeRange.startMonth - 1
            ),
            timeRange.startYear
          )
        );

        setTime(
          setHours(
            setMinutes(new Date(), timeRange.startMinutes),
            timeRange.startHours
          )
        );

        console.log(timeRange);
        setMeetingDetail(data);
      });
  }, []);

  let history = useHistory();
  const handleConfirmBooking = () => {
    const { dateMeeting, time, name, email, message } = meetingConfirm;

    console.log(meetingConfirm);

    if (name !== "" && email !== "" && message !== "") {
      const dataConfirm = {
        booking: {
          date: dateMeeting,
          time: time,
          name: name,
          email: email,
          message: message,
        },
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
    <>
      <Form>
        <FormGroup>
          <DatePicker
            selected={dateMeeting}
            onChange={(dateMeeting) => {
              setDateMeeting(dateMeeting);
              setMeetingConfirm({
                ...meetingConfirm,
                dateMeeting: dateMeeting,
              });
            }}
            minDate={setYear(
              setMonth(
                setDate(new Date(), timeInput.startDate),
                timeInput.startMonth - 1
              ),
              timeInput.startYear
            )}
            maxDate={setYear(
              setMonth(
                setDate(new Date(), timeInput.endDate),
                timeInput.endMonth - 1
              ),
              timeInput.endYear
            )}
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
            minTime={setHours(
              setMinutes(new Date(), timeInput.startMinutes),
              timeInput.startHours
            )}
            maxTime={setHours(
              setMinutes(new Date(), timeInput.endMinutes),
              timeInput.endHours
            )}
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
    </>
  );
};

export default MeetingConfirm;
