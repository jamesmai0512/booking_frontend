import React, { useState } from "react";
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

  const [newMeeting, setNewMeeting] = useState({
    user_name: "",
    title: "",
  });

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

      <Button
        type="button"
        color="success"
        onClick={() => {
          const { user_name, title } = newMeeting;

          if (user_name !== "" && title !== "") {
            axiox
              .post("http://localhost:3001/meetings", {
                user_name: user_name,
                title: title,
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
          }
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default NewMeetings;
