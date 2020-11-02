import React from "react";
import Home from "./pages/Home";
import NewMeeting from "./pages/NewMeeting";
import MeetingConfirm from "./pages/MeetingConfirm";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/meeting/:meetingId/confirmmeeting">
          <MeetingConfirm />
        </Route>
        <Route path="/meeting/create">
          <NewMeeting />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
