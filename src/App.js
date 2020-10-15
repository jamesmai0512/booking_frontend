import React from "react";
import Home from "./pages/Home";
import NewMeetings from "./pages/NewMeeting";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/create">
          <NewMeetings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
